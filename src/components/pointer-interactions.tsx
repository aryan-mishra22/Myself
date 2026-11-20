"use client";

import { useEffect } from "react";

export function PointerInteractions() {
  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let button: HTMLElement | null = null;
    let card: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let frame = 0;

    const resetButton = () => {
      button?.style.removeProperty("--magnet-x");
      button?.style.removeProperty("--magnet-y");
      button = null;
      bounds = null;
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      resetButton();
      card?.removeAttribute("data-pointer-active");
      card = null;
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") { reset(); return; }
      const target = event.target instanceof Element ? event.target : null;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextButton = target?.closest<HTMLElement>(".hero-actions .button, .nav-resume, .contact-form .form-submit:not(:disabled)") ?? null;
        if (nextButton !== button) {
          resetButton();
          button = nextButton;
          bounds = button?.getBoundingClientRect() ?? null;
        }
        if (button && bounds) {
          const x = Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * 0.08));
          const y = Math.max(-3, Math.min(3, (event.clientY - bounds.top - bounds.height / 2) * 0.12));
          button.style.setProperty("--magnet-x", `${x}px`);
          button.style.setProperty("--magnet-y", `${y}px`);
        }
        const nextCard = target?.closest<HTMLElement>(".skill-group") ?? null;
        if (card !== nextCard) card?.removeAttribute("data-pointer-active");
        card = nextCard;
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--card-pointer-x", `${event.clientX - rect.left}px`);
          card.style.setProperty("--card-pointer-y", `${event.clientY - rect.top}px`);
          card.dataset.pointerActive = "true";
        }
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, true);
    window.addEventListener("resize", reset);
    enabled.addEventListener("change", reset);
    return () => {
      reset();
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset, true);
      window.removeEventListener("resize", reset);
      enabled.removeEventListener("change", reset);
    };
  }, []);

  return null;
}
