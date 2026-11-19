"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const background = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!preference.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        background.current?.style.setProperty("--pointer-x", `${event.clientX}px`);
        background.current?.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ambient-background" ref={background} aria-hidden="true">
      <div className="ambient-background__spotlight" />
      <div className="ambient-background__rings"><i /><i /><i /></div>
      <div className="ambient-background__aurora ambient-background__aurora--blue" />
      <div className="ambient-background__aurora ambient-background__aurora--violet" />
      <div className="ambient-background__aurora ambient-background__aurora--teal" />
      <div className="ambient-background__particles">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37 + 7) % 100}%`,
              top: `${(index * 23 + 11) % 100}%`,
              animationDelay: `${index * -2.3}s`,
              animationDuration: `${24 + (index % 5) * 6}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
