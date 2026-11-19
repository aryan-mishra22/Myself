"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const socialLinks = [
  { label: "GitHub", href: siteConfig.contact.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.contact.linkedin, icon: Linkedin },
  {
    label: "Email",
    href: siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : "",
    icon: Mail,
  },
].filter((link) => link.href);

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div
        className="scroll-progress__bar"
        animate={{ width: `${progress}%` }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.12, ease: "linear" }}
      />
    </div>
  );
}

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-overlay"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.45 } }}
        >
          <motion.span
            className="intro-overlay__mark"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
          >
            A<span>.</span>
          </motion.span>
          <span className="intro-overlay__line" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = ["home", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="site-nav mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Main navigation">
        <Link className="brand-mark" href="#home" onClick={closeMenu} aria-label="Aryan — home">
          ARYAN<span className="brand-mark__dot">.</span>
        </Link>

        <div className="site-nav__links" id="primary-navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              className={`site-nav__link${activeSection === item.id ? " is-active" : ""}`}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="site-nav__actions">
          <a className="nav-resume" href={siteConfig.resumePath} download>
            Resume <ArrowUpRight size={14} strokeWidth={1.7} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-menu__link${activeSection === item.id ? " is-active" : ""}`}
                onClick={closeMenu}
                initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.035, duration: reduceMotion ? 0 : 0.2 }}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </motion.a>
            ))}
            <a className="button button--primary mobile-menu__resume" href={siteConfig.resumePath} download>
              Download résumé <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 560);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          className="back-to-top"
          href="#home"
          aria-label="Back to top"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <ArrowUp size={17} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  if (!socialLinks.length) {
    return <p className={`social-unconfigured ${className}`.trim()}>Social links can be added in the site configuration.</p>;
  }

  return (
    <div className={`social-links ${className}`.trim()} aria-label="Social profiles">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          className="social-link"
          href={href}
          aria-label={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
