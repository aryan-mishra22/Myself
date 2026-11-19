"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  Braces,
  Database,
  Layers3,
  Mic,
  Radio,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useState, type PointerEvent } from "react";
import type { Project, ProjectCategory } from "@/data/portfolio";
import { ProjectDetails } from "@/components/project-details";
import { projects } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

const filters: Array<"All work" | ProjectCategory> = ["All work", "AI & Software", "Data Engineering"];

function tiltProjectCard(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
  const card = event.currentTarget;
  // Offset dimensions stay stable while the card rotates.
  const rect = card.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (card.offsetWidth / 2)));
  const y = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (card.offsetHeight / 2)));
  const distance = Math.hypot(x, y);
  card.style.setProperty("--tilt-axis-x", String(distance ? -y / distance : 1));
  card.style.setProperty("--tilt-axis-y", String(distance ? x / distance : 0));
  card.style.setProperty("--tilt-angle", `${Math.min(distance, 1) * 5}deg`);
  card.style.setProperty("--shine-x", `${(x + 1) * 50}%`);
  card.style.setProperty("--shine-y", `${(y + 1) * 50}%`);
}

function resetProjectCard(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-angle", "0deg");
}

function ProjectArtwork({ id }: { id: string }) {
  if (id === "ai-quiz-generator") {
    return (
      <div className="project-art project-art--quiz" role="img" aria-label="Illustrated quiz generation interface">
        <div className="quiz-paper">
          <div className="quiz-paper__head"><span className="quiz-brand"><BrainLogo /> learn better</span><span className="quiz-tag">AI GENERATED</span></div>
          <div className="quiz-progress"><span /></div>
          <p className="quiz-question-label">QUESTION 02 <span>OF 10</span></p>
          <h3>Which concept best describes how a transformer processes language?</h3>
          <div className="quiz-option quiz-option--selected"><span>A</span> Self-attention across tokens <i><span /></i></div>
          <div className="quiz-option"><span>B</span> Sequential lookup tables</div>
          <div className="quiz-option"><span>C</span> Fixed-width convolution</div>
          <div className="quiz-foot"><span>Generated from your material</span><span>02 / 10</span></div>
        </div>
        <div className="art-float art-float--spark"><Sparkles size={15} /></div>
        <div className="art-float art-float--model"><Braces size={13} /> NLP model</div>
      </div>
    );
  }

  if (id === "voice-assistant") {
    return (
      <div className="project-art project-art--voice" role="img" aria-label="Illustrated AI voice assistant interface">
        <div className="voice-console">
          <div className="voice-console__top">
            <span><Sparkles size={13} /> JARVIS</span>
            <span>VOICE ASSISTANT · GEMINI</span>
          </div>
          <div className="voice-console__center">
            <div className="voice-orbit voice-orbit--one" />
            <div className="voice-orbit voice-orbit--two" />
            <div className="voice-orb"><AudioLines size={25} strokeWidth={1.5} /></div>
            <span className="voice-console__status"><span /> READY TO LISTEN</span>
          </div>
          <div className="voice-transcript"><span>ASSISTANT</span><p>&quot;How can I help you today?&quot;</p></div>
          <div className="voice-waveform" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <div className="voice-console__footer">
            <span><Mic size={11} /> Speech recognition</span>
            <span>PYTTSX3 · TTS</span>
          </div>
        </div>
        <div className="art-float art-float--voice"><BrainCircuit size={13} /> Gemini API</div>
      </div>
    );
  }

  return (
    <div className="project-art project-art--pipeline" role="img" aria-label="Illustrated cloud data pipeline">
      <div className="pipeline-panel">
        <div className="pipeline-heading"><span>DATA FLOW / 001</span><span className="pipeline-live"><span /> LIVE</span></div>
        <div className="pipeline-flow">
          <div className="pipeline-node"><div><Database size={16} /></div><span>COLLECT</span><small>S3 · SOURCE</small></div>
          <span className="pipeline-connector"><i /></span>
          <div className="pipeline-node"><div><Workflow size={16} /></div><span>TRANSFORM</span><small>GLUE · ETL</small></div>
          <span className="pipeline-connector"><i /></span>
          <div className="pipeline-node"><div><Layers3 size={16} /></div><span>ANALYZE</span><small>ATHENA · SQL</small></div>
        </div>
        <div className="pipeline-chart" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div className="pipeline-footer"><span><Radio size={11} /> serverless pipeline</span><span>US-EAST-1</span></div>
      </div>
      <div className="art-float art-float--cloud"><Database size={13} /> AWS</div>
    </div>
  );
}

function BrainLogo() {
  return <Sparkles size={13} aria-hidden="true" />;
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const reduceMotion = useReducedMotion();
  const visibleProjects = filter === "All work"
    ? projects
    : projects.filter((project) => project.category === filter);

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="projects-heading-row">
          <div className="projects-heading">
            <span className="section-kicker">SELECTED WORK</span>
            <h2 className="section-title" id="projects-title">Ideas, meet implementation.</h2>
          </div>
        </div>
        <div className="project-filter" role="group" aria-label="Filter projects by category">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={`project-filter__button${filter === item ? " is-active" : ""}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              {filter === item && <motion.span className="project-filter__indicator" layoutId="filter-indicator" transition={{ duration: reduceMotion ? 0 : 0.25 }} />}
            </button>
          ))}
        </div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                onPointerMove={tiltProjectCard}
                onPointerLeave={resetProjectCard}
                onPointerCancel={resetProjectCard}
                className={`project-card${project.id === "ai-quiz-generator" ? " project-card--featured" : ""}`}
                key={project.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : index * 0.045 }}
              >
                <div className="project-card__art"><ProjectArtwork id={project.id} /></div>
                <div className="project-card__content">
                  <div className="project-card__meta">
                    <span>{project.category}</span>
                    <span>{project.number} <span className="project-card__slash">/</span> 03</span>
                  </div>
                  <h3>{project.name}<span>{project.subtitle}</span></h3>
                  <p>{project.description}</p>
                  <div className="project-tech-list">
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                  <div className="project-links">
                    <button type="button" className="project-details-trigger" aria-haspopup="dialog" aria-label={`Explore ${project.name} details`} onClick={() => setSelectedProject(project)}>Explore project <ArrowUpRight size={14} /></button>
                    {project.demoUrl ? (
                      <a href={project.demoUrl} className="text-link" target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a>
                    ) : (
                      <span className="project-link-unavailable"><ArrowUpRight size={14} /> Demo link not provided</span>
                    )}
                    {project.githubUrl ? (
                      <a href={project.githubUrl} className="project-link-github" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
                    ) : (
                      <span className="project-link-unavailable"><Braces size={13} /> Repository not provided</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        <Reveal className="projects-note">
          <span><Sparkles size={13} /> Project previews are original interface illustrations.</span>
          <span>Visit linked repositories for available source code.</span>
        </Reveal>
      </div>
      {selectedProject && <ProjectDetails key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
