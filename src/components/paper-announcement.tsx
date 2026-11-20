"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BrainCircuit, ChartNoAxesCombined, PanelsTopLeft } from "lucide-react";

export function PaperAnnouncement() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const poster = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  useEffect(() => {
    const sheet = poster.current;
    const frame = viewport.current;
    if (!sheet || !frame) return;
    let pendingFrame = 0;
    const measure = () => {
      cancelAnimationFrame(pendingFrame);
      pendingFrame = requestAnimationFrame(() => {
        const availableHeight = frame.clientHeight;
        // Reserve room for the paper's tape, shadow, and slight rotation.
        setFitScale(Math.min(1, availableHeight / (sheet.offsetHeight + 24)));
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(sheet);
    observer.observe(frame);
    window.visualViewport?.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(pendingFrame);
      observer.disconnect();
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const dismiss = () => setVisible(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("pointerdown", dismiss, { passive: true });
    window.addEventListener("click", dismiss);
    window.addEventListener("scroll", dismiss, { passive: true, capture: true });
    window.addEventListener("keydown", onKeyDown);
    const hero = document.getElementById("home");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setVisible(false);
    });
    if (hero) observer.observe(hero);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("click", dismiss);
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="paper-announcement-viewport" ref={viewport}>
    <AnimatePresence>
      {visible && (
        <motion.aside ref={poster} className="paper-announcement" role="status" aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: -12, rotate: -1, scale: fitScale }}
          animate={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : -0.6, scale: fitScale }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, rotate: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}>
          <div className="paper-announcement__sheet">
            <div className="paper-announcement__copy">
              <span className="paper-announcement__eyebrow">AVAILABLE FOR WEBSITE PROJECTS</span>
              <h2>YOUR NEXT<br /><span>BIG MOVE.</span></h2>
              <p>I build <strong>AI-powered websites</strong><br />to take your business to the next level.</p>
            </div>
            <div className="paper-announcement__journey" aria-hidden="true">
              <div className="paper-announcement__tile"><PanelsTopLeft /><span>Your website</span></div>
              <ArrowRight className="paper-announcement__arrow" />
              <div className="paper-announcement__tile paper-announcement__tile--ai"><BrainCircuit /><span>Powered by AI</span></div>
              <ArrowRight className="paper-announcement__arrow" />
              <div className="paper-announcement__tile"><ChartNoAxesCombined /><span>Business growth</span></div>
            </div>
            <div className="paper-announcement__footer"><span>LET’S BUILD SOMETHING GREAT</span><strong>ARYAN / FULL-STACK + AI</strong><span>Click, scroll, or press Esc to explore</span></div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
    </div>
  );
}
