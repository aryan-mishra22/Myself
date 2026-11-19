"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Circle,
  Code2,
  Command,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/site-shell";

const codeLines = [
  { number: "01", content: <><span className="code-purple">class</span> <span className="code-blue">Builder</span>:</> },
  { number: "02", content: <>&nbsp;&nbsp;<span className="code-purple">def</span> <span className="code-yellow">__init__</span>(self):</> },
  { number: "03", content: <>&nbsp;&nbsp;&nbsp;&nbsp;self.focus = [</> },
  { number: "04", content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">&quot;thoughtful software&quot;</span>,</> },
  { number: "05", content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">&quot;applied AI&quot;</span>,</> },
  { number: "06", content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">&quot;real-world impact&quot;</span></> },
  { number: "07", content: <>&nbsp;&nbsp;&nbsp;&nbsp;]</> },
  { number: "08", content: <>&nbsp;</> },
  { number: "09", content: <>&nbsp;&nbsp;<span className="code-purple">def</span> <span className="code-yellow">build</span>(self, idea):</> },
  { number: "10", content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-purple">return</span> idea.<span className="code-yellow">make_useful</span>()</> },
];

const dataFlowPaths = [
  "M 20 110 H 180 Q 200 110 200 130 V 190 Q 200 210 220 210 H 650",
  "M 100 30 V 70 Q 100 90 120 90 H 380 Q 400 90 400 110 V 150 H 710",
  "M 0 390 H 150 Q 170 390 170 370 V 330 Q 170 310 190 310 H 560 Q 580 310 580 290 V 230 H 720",
  "M 80 510 H 330 Q 350 510 350 490 V 450 Q 350 430 370 430 H 700",
  "M 500 0 V 40 Q 500 60 520 60 H 620 Q 640 60 640 80 V 490",
];

function DataFlowBackground() {
  return (
    <svg className="hero-data-flow" viewBox="0 0 720 540" fill="none" aria-hidden="true" focusable="false">
      {dataFlowPaths.map((path, index) => (
        <g key={path} className={`hero-data-flow__route hero-data-flow__route--${index + 1}`}>
          <path className="hero-data-flow__track" d={path} />
          <path
            className="hero-data-flow__packet"
            d={path}
            pathLength={100}
            style={{ animationDelay: `${index * -3.7}s`, animationDuration: `${22 + index * 3}s` }}
          />
        </g>
      ))}
      <g className="hero-data-flow__nodes">
        <circle cx="200" cy="160" r="3" />
        <circle cx="400" cy="110" r="3" />
        <circle cx="580" cy="270" r="3" />
        <circle cx="350" cy="470" r="3" />
        <circle cx="640" cy="170" r="3" />
      </g>
    </svg>
  );
}

function CodeWindow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="code-window">
      <div className="code-window__topbar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <div className="code-window__filename"><Braces size={13} /> builder.py</div>
        <span className="code-window__language">PY</span>
      </div>
      <div className="code-window__body" aria-label="Python code example">
        {codeLines.map((line) => (
          <motion.div
            className="code-line"
            key={line.number}
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              delay: reduceMotion ? 0 : Number(line.number) * 0.055,
            }}
          >
            <span className="code-line__number" aria-hidden="true">{line.number}</span>
            <code>{line.content}</code>
          </motion.div>
        ))}
        <span className="code-caret" aria-hidden="true" />
      </div>
      <div className="code-window__footer">
        <span><span className="status-dot" /> Ready to build</span>
        <span>Python</span>
      </div>
    </div>
  );
}

function FloatingTerminal() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="floating-terminal"
      animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="floating-terminal__top"><span /><span /><span /><b>terminal</b></div>
      <div><span className="terminal-prompt">›</span> python manage.py runserver</div>
      <div className="terminal-output"><span className="status-dot" /> Server ready on <span>localhost</span></div>
    </motion.div>
  );
}

function FloatingPill({ className, children }: { className: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`floating-pill ${className}`}
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />
      <DataFlowBackground />

      <div className="hero-layout mx-auto grid max-w-7xl items-center px-6">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-eyebrow">
            <span className={`availability-dot${siteConfig.availability ? "" : " availability-dot--unknown"}`}>
              {siteConfig.availability && <span />}
            </span>
            <span>{siteConfig.availability || "AVAILABILITY NOT SPECIFIED"}</span>
          </div>
          <p className="hero-intro">Hello, I&apos;m</p>
          <h1 className="hero-title" id="hero-title">
            <span className="hero-title__line">
              <span className="hero-title__paper hero-title__paper--one">Aryan</span>{" "}
              <span className="hero-title__paper hero-title__paper--two">Kumar</span>
            </span>
            <span className="hero-title__line">
              <span className="hero-title__paper hero-title__paper--three">
                Mishra<span className="hero-title__period">.</span>
              </span>
            </span>
          </h1>
          <div className="hero-role">
            <span className="hero-role__line" aria-hidden="true" />
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.22 }}
            >
              Python Developer
            </motion.span>
            <span aria-hidden="true">·</span>
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.34 }}
            >
              Django Backend Developer
            </motion.span>
            <span aria-hidden="true">·</span>
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.46 }}
            >
              AI Enthusiast
            </motion.span>
          </div>
          <p className="hero-description">
            I build Python and Django backend applications, design REST APIs, and work with relational databases. I also explore machine learning, NLP, and cloud-based data pipelines.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" href="#projects">
              Explore my work <ArrowDownRight size={16} aria-hidden="true" />
            </Link>
            <a className="button button--secondary" href={siteConfig.resumePath} download>
              Download résumé <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-socials">
            <SocialLinks />
            {(siteConfig.contact.github || siteConfig.contact.linkedin || siteConfig.contact.email) && (
              <span className="hero-socials__caption">Find me elsewhere</span>
            )}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          role="img"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 16 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Animated Python code editor illustration"
        >
          <div className="visual-orbit visual-orbit--one" aria-hidden="true" />
          <div className="visual-orbit visual-orbit--two" aria-hidden="true" />
          <div className="visual-center-mark" aria-hidden="true"><Command size={24} strokeWidth={1.4} /></div>
          <FloatingPill className="floating-pill--ai"><Sparkles size={13} /> applied AI</FloatingPill>
          <FloatingPill className="floating-pill--backend"><Code2 size={13} /> backend</FloatingPill>
          <FloatingPill className="floating-pill--python"><Circle size={10} fill="currentColor" /> Python</FloatingPill>
          <CodeWindow />
          <FloatingTerminal />
          <div className="visual-vertical-label" aria-hidden="true">IDEAS INTO INTERFACES <span>2026</span></div>
        </motion.div>
      </div>

      <Link className="hero-scroll" href="#about" aria-label="Scroll to about section">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={14} aria-hidden="true" />
      </Link>
    </section>
  );
}
