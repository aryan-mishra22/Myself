"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Palette, X } from "lucide-react";
import { flushSync } from "react-dom";
import { transitionTheme } from "@/components/theme-transition";

const themes = ["midnight", "aurora", "ember"] as const;

function subscribe(callback: () => void) {
  window.addEventListener("portfolio-theme-change", callback);
  return () => window.removeEventListener("portfolio-theme-change", callback);
}

function getTheme() {
  return document.documentElement.dataset.theme || "midnight";
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "midnight");
  const [open, setOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      setHeroVisible(visible);
      if (!visible) setOpen(false);
    }, { threshold: [0, 0.25], rootMargin: "-72px 0px 0px 0px" });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  if (!heroVisible) return null;

  return (
    <div className="theme-fan" ref={root}
      onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button ref={trigger} type="button" className="theme-fan__trigger" aria-label={`Color theme: ${theme}. ${open ? "Close" : "Open"} theme options`} aria-expanded={open} aria-controls="theme-fan-options" onClick={() => setOpen(!open)}>
        {open ? <X size={21} aria-hidden="true" /> : <Palette size={21} aria-hidden="true" />}
        <span>Themes</span>
      </button>
      <div id="theme-fan-options" role="group" aria-label="Portfolio color theme">
        <AnimatePresence>
          {open && <motion.svg className="theme-fan__arc" viewBox="0 0 144 144" fill="none" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><path d="M 0 0 A 144 144 0 0 1 144 144" /></motion.svg>}
          {open && themes.map((name, index) => {
            const positions = [{ x: 0, y: -144 }, { x: 102, y: -102 }, { x: 144, y: 0 }];
            const position = positions[index];
            return <motion.button key={name} type="button" className={`theme-fan__option theme-fan__option--${name}`} aria-label={`${name} theme`} aria-pressed={theme === name}
              initial={reduceMotion ? false : { x: 0, y: 0, scale: 0.3, opacity: 0 }}
              animate={{ x: position.x, y: position.y, scale: 1, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { x: 0, y: 0, scale: 0.3, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : index * 0.045, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                if (name === theme) {
                  setOpen(false);
                  trigger.current?.focus();
                  return;
                }
                void transitionTheme(trigger.current, () => {
                  flushSync(() => {
                    document.documentElement.dataset.theme = name;
                    try { localStorage.setItem("portfolio-theme", name); } catch { /* Themes also work without storage. */ }
                    window.dispatchEvent(new Event("portfolio-theme-change"));
                    setOpen(false);
                  });
                  trigger.current?.focus();
                });
              }}>
              <span className="theme-fan__swatch">{theme === name && <Check size={20} aria-hidden="true" />}</span>
              <span className="theme-fan__label">{name[0].toUpperCase() + name.slice(1)}</span>
            </motion.button>;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
