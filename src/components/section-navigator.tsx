"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "explore", label: "Interactive terminal" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function SectionNavigator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1440px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      let current = 0;
      sections.forEach(({ id }, index) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= innerHeight * 0.3) current = index;
      });
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) current = sections.length - 1;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <nav className="section-navigator" aria-label="Page sections">
      <span className="section-navigator__track" aria-hidden="true" />
      <span className="section-navigator__marker" style={{ transform: `translateY(${active * 36}px)` }} aria-hidden="true" />
      {sections.map(({ id, label }, index) => (
        <a key={id} href={`#${id}`} aria-label={`Go to ${label}`} aria-current={active === index ? "location" : undefined}>
          <span className="section-navigator__dot" aria-hidden="true" />
          <span className="section-navigator__label" aria-hidden="true">{label}</span>
        </a>
      ))}
    </nav>
  );
}
