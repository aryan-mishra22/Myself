"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = { id: number; left: number; top: number; width: number; height: number; x: number; y: number; size: number; radius: string };

export function ButtonFeedback() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const onClick = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("button, a.button, a.text-link, a.nav-resume, .skill-group") : null;
      if (!target || target.matches(":disabled, [aria-disabled='true']")) return;
      if (target.matches(".skill-group") && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const rect = target.getBoundingClientRect();
      const id = nextId.current++;
      const ripple = { id, left: rect.left, top: rect.top, width: rect.width, height: rect.height,
        x: event.detail === 0 ? rect.width / 2 : event.clientX - rect.left,
        y: event.detail === 0 ? rect.height / 2 : event.clientY - rect.top,
        size: Math.hypot(rect.width, rect.height) * 2,
        radius: getComputedStyle(target).borderRadius };
      setRipples((current) => [...current.slice(-5), ripple]);
      const timer = setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== id));
        timers.delete(timer);
      }, 550);
      timers.add(timer);
    };
    const clear = () => setRipples([]);
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", clear, true);
    window.addEventListener("resize", clear);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("resize", clear);
      timers.forEach(clearTimeout);
    };
  }, []);

  return <div aria-hidden="true">{ripples.map((ripple) => (
    <span className="button-ripple-frame" key={ripple.id} style={{ left: ripple.left, top: ripple.top, width: ripple.width, height: ripple.height, borderRadius: ripple.radius }}>
      <span className="button-ripple" style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }} />
    </span>
  ))}</div>;
}
