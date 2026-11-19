"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

type Architecture = { purpose: string; output: string; steps: { name: string; technology: string; detail: string }[] };

const architectures: Record<string, Architecture> = {
  "ai-quiz-generator": {
    purpose: "Turn learning material into quiz questions through a backend API.",
    output: "Generated questions and selected answers, with quiz data stored in MySQL.",
    steps: [
      { name: "Learning material", technology: "Input", detail: "Learning material provides the source content for question generation." },
      { name: "API layer", technology: "Django REST Framework", detail: "The Django REST API provides access to the quiz-generation workflow." },
      { name: "Language processing", technology: "Transformers · spaCy", detail: "Hugging Face Transformers and spaCy support processing source material and generating questions." },
      { name: "Answer selection", technology: "Sentence Transformers", detail: "Semantic similarity supports selecting answers for the generated questions." },
      { name: "Quiz storage", technology: "Django ORM · MySQL", detail: "Django ORM models and MySQL persist quiz data." },
    ],
  },
  "youtube-pipeline": {
    purpose: "Make CSV and JSON source data available for analytical queries in an AWS data lake.",
    output: "An optimized Parquet data lake that can be queried with Athena.",
    steps: [
      { name: "Source data", technology: "CSV · JSON", detail: "CSV and JSON files are the inputs to the data pipeline." },
      { name: "Ingest & validate", technology: "AWS S3 · Lambda", detail: "The pipeline ingests and validates source data using its AWS storage and processing tools." },
      { name: "Transform", technology: "Glue · ETL", detail: "The transformation stage prepares the ingested data for analytics." },
      { name: "Data lake", technology: "S3 · Parquet", detail: "Transformed data is stored in optimized Parquet format." },
      { name: "Query", technology: "Athena", detail: "Athena queries the resulting data lake for analysis." },
    ],
  },
  "voice-assistant": {
    purpose: "Support natural-language conversations through spoken input and output.",
    output: "A spoken response produced by a Python assistant using Gemini and text-to-speech.",
    steps: [
      { name: "Voice input", technology: "Microphone", detail: "A spoken prompt begins the interaction." },
      { name: "Speech to text", technology: "SpeechRecognition", detail: "Speech recognition turns the spoken input into text for the assistant." },
      { name: "Conversation", technology: "Python · Gemini API", detail: "The Python application uses the Gemini API through the Google GenAI SDK for natural-language conversation." },
      { name: "Text to speech", technology: "pyttsx3", detail: "The generated response is converted into speech." },
      { name: "Spoken response", technology: "Audio output", detail: "The assistant delivers its response as audio, completing the interaction." },
    ],
  },
};

export function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const architecture = architectures[project.id];

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = setInterval(() => setStep((current) => (current + 1) % architecture.steps.length), 2400);
    return () => clearInterval(timer);
  }, [playing, reduceMotion, architecture.steps.length]);

  return (
    <dialog ref={dialog} className="project-details" aria-labelledby="project-details-title" onCancel={onClose}>
      <header className="project-details__header">
        <span className="section-kicker">PROJECT / {project.number}</span>
        <button type="button" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
      </header>
      <div className="project-details__body">
        <p className="project-details__category">{project.category}</p>
        <h2 id="project-details-title">{project.name}</h2>
        <p className="project-details__summary">{project.description}</p>
        <div className="project-details__overview">
          <div><h3>Purpose</h3><p>{architecture.purpose}</p></div>
          <div><h3>What it produces</h3><p>{architecture.output}</p></div>
        </div>
        <div className="project-details__diagram-heading">
          <div><h3>How it works</h3><p>Simplified architecture. Select a stage to explore it.</p></div>
          {!reduceMotion && <button type="button" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? "Pause flow" : "Play flow"}</button>}
        </div>
        <ol className={`architecture-flow${playing && !reduceMotion ? " architecture-flow--playing" : ""}`} aria-label="Architecture stages">
          {architecture.steps.map((item, index) => (
            <li key={item.name} className={step === index ? "is-active" : ""}>
              <button type="button" aria-pressed={step === index} aria-controls="architecture-stage-detail" onClick={() => { setPlaying(false); setStep(index); }}>
                <span className="architecture-flow__number">0{index + 1}</span>
                <strong>{item.name}</strong><small>{item.technology}</small>
              </button>
              {index < architecture.steps.length - 1 && <span className="architecture-flow__connector" aria-hidden="true"><i /></span>}
            </li>
          ))}
        </ol>
        <div className="architecture-detail" id="architecture-stage-detail" aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <span>STAGE 0{step + 1} / 0{architecture.steps.length}</span>
          <h4>{architecture.steps[step].name}</h4><p>{architecture.steps[step].detail}</p>
        </div>
        <h3 className="project-details__stack-title">Built with</h3>
        <div className="project-tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
        {project.githubUrl && <a className="button button--secondary project-details__source" href={project.githubUrl} target="_blank" rel="noreferrer">Explore source code <ArrowUpRight size={15} /></a>}
      </div>
    </dialog>
  );
}
