let running = false;

/** Reveal the new theme through an expanding circle without scaling the page. */
export async function transitionTheme(origin: HTMLElement | null, update: () => void) {
  if (running) return;
  if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    update();
    return;
  }

  running = true;
  const root = document.documentElement;
  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : innerHeight / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 1;
  const properties = {
    "--theme-x": `${x}px`, "--theme-y": `${y}px`,
    "--theme-radius": `${radius}px`,
    "--theme-width": `${innerWidth}px`, "--theme-height": `${innerHeight}px`,
  };
  let applied = false;
  const apply = () => {
    if (applied) return;
    applied = true;
    update();
    root.classList.add("theme-ripple-after");
  };
  let transition: ViewTransition | undefined;
  const animations: Animation[] = [];
  const skip = () => transition?.skipTransition();
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

  try {
    Object.entries(properties).forEach(([key, value]) => root.style.setProperty(key, value));
    root.classList.add("theme-ripple-active");
    transition = document.startViewTransition(apply);
    // A hidden tab, resizing, or a changed motion preference can skip the effect.
    void transition.finished.catch(() => {});
    void transition.updateCallbackDone.catch(() => {});
    window.addEventListener("resize", skip);
    preference.addEventListener("change", skip);
    await transition.ready;

    const maskFrames: Keyframe[] = [];
    const imageFrames: Keyframe[] = [];
    for (let i = 0; i <= 180; i++) {
      const offset = i / 180;
      const scale = 0.008 + 0.992 * offset;
      maskFrames.push({ offset, transform: `scale(${scale})` });
      imageFrames.push({ offset, transform: `scale(${1 / scale})` });
    }
    const timing = { duration: 480, easing: "linear", fill: "both" as const };
    const mask = root.animate(maskFrames, { ...timing, pseudoElement: "::view-transition-group(theme-after)" });
    const image = root.animate(imageFrames, { ...timing, pseudoElement: "::view-transition-new(theme-after)" });
    animations.push(mask, image);
    mask.startTime = image.startTime = document.timeline.currentTime;
    await Promise.all(animations.map((animation) => animation.finished));
    animations.forEach((animation) => animation.cancel());
    await transition.finished;
  } catch {
    transition?.skipTransition();
    if (transition) await transition.updateCallbackDone.catch(() => {});
    apply();
  } finally {
    animations.forEach((animation) => animation.cancel());
    if (transition) await transition.finished.catch(() => {});
    root.classList.remove("theme-ripple-active", "theme-ripple-after");
    Object.keys(properties).forEach((key) => root.style.removeProperty(key));
    window.removeEventListener("resize", skip);
    preference.removeEventListener("change", skip);
    running = false;
  }
}
