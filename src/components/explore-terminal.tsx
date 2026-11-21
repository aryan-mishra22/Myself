"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { projects, skillGroups } from "@/data/portfolio";

const responses: Record<string, string> = {
  help: "Try about, skills, projects, contact, or clear. Choose a command below or type your own.",
  about: "Hi, I'm Aryan. I build AI-powered full-stack applications, connecting user interfaces with Python and Django APIs, relational databases, and AI integrations.",
  skills: skillGroups.map((group) => `${group.title}: ${group.skills.join(", ")}`).join("\n"),
  projects: projects.map((project) => `${project.name}\n  ${project.description}`).join("\n\n"),
  contact: "Have something in mind? Open the contact section below and let's connect.",
};

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export function ExploreTerminal() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState({ command: "help", text: responses.help });
  const [visibleCount, setVisibleCount] = useState(responses.help.length);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  // The mobile layout is tall, so waiting for 30% visibility can prevent the
  // demo from starting while its command buttons are already on screen.
  const inView = useInView(section, { amount: 0.05 });
  const [autoPlay, setAutoPlay] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const shouldAnimate = isHydrated && !reduceMotion;
  const autoRunning = autoPlay && shouldAnimate;
  const typing = shouldAnimate && visibleCount < result.text.length;

  function stopTyping() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const run = useCallback((value: string) => {
    const command = value.trim().toLowerCase();
    if (!command) return;
    stopTyping();
    const text = command === "clear" ? "Terminal cleared. Type help to start again." : responses[command] ?? `Unknown command: ${command}. Type help to see available commands.`;
    setResult({ command, text });
    setVisibleCount(!shouldAnimate || command === "clear" ? text.length : 0);
    if (shouldAnimate && command !== "clear") {
      let count = 0;
      const step = Math.max(1, Math.ceil(text.length / 120));
      timer.current = setInterval(() => {
        count = Math.min(count + step, text.length);
        setVisibleCount(count);
        if (count === text.length) stopTyping();
      }, 25);
    }
    setInput("");
  }, [shouldAnimate]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!autoRunning || !inView || !pageVisible || typing) return;
    const commands = Object.keys(responses);
    const next = commands[(commands.indexOf(result.command) + 1) % commands.length];
    const timeout = setTimeout(() => run(next), 2000);
    return () => clearTimeout(timeout);
  }, [autoRunning, inView, pageVisible, typing, result, run]);

  return (
    <section
      ref={section}
      className="explore-terminal-section section"
      id="explore"
      aria-labelledby="terminal-title"
      onPointerDownCapture={(event) => {
        if (!(event.target instanceof Element && event.target.closest("[data-autoplay-toggle]"))) setAutoPlay(false);
      }}
      onFocusCapture={(event) => {
        if (!event.target.closest("[data-autoplay-toggle]")) setAutoPlay(false);
      }}
    >
      <div className="mx-auto max-w-7xl px-6 explore-terminal-layout">
        <div>
          <p className="section-kicker">A LITTLE INTERACTION</p>
          <h2 id="terminal-title" className="section-title">Get to know me.<br /><span>One command away.</span></h2>
          <p className="terminal-intro">Explore my skills and projects through this interactive portfolio terminal.</p>
          <div className="terminal-shortcuts" aria-label="Terminal commands">
            {Object.keys(responses).map((command) => <button key={command} type="button" onClick={() => run(command)} aria-pressed={result.command === command}>{command}</button>)}
          </div>
        </div>
        <div className="explore-terminal">
          <div className="explore-terminal__bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>aryan / explore</span><span>INTERACTIVE</span></div>
          <div className="sr-only" role="status" aria-live={autoRunning ? "off" : "polite"} aria-atomic="true">{result.command}: {result.text}</div>
          <div className="explore-terminal__playback">
            {shouldAnimate && <button type="button" data-autoplay-toggle aria-pressed={autoRunning} onClick={() => setAutoPlay(!autoRunning)}>{autoRunning ? "Pause demo" : "Resume demo"}</button>}
            <span>{typing ? "Writing response…" : "Response ready"}</span>
            <button type="button" disabled={!typing} onClick={() => { stopTyping(); setVisibleCount(result.text.length); }}>Show instantly</button>
          </div>
          <div className="explore-terminal__output">
            <p className="explore-terminal__command">~ $ {result.command}</p>
            <p aria-hidden="true">{shouldAnimate ? result.text.slice(0, visibleCount) : result.text}{typing && <span className="terminal-typing-caret" />}</p>
            {result.command === "projects" && <a href="#projects">Explore project cards ↗</a>}
            {result.command === "contact" && <a href="#contact">Go to contact ↗</a>}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); run(input); }} className="explore-terminal__input">
            <label htmlFor="terminal-command">~ $ <span className="sr-only">Enter a portfolio command</span></label>
            <input id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a command…" autoComplete="off" spellCheck={false} maxLength={120} />
            <button type="submit">Run ↵</button>
          </form>
        </div>
      </div>
    </section>
  );
}
