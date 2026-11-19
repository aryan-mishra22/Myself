export type SkillGroup = {
  title: string;
  number: string;
  skills: string[];
};

export type Experience = {
  company?: string;
  position: string;
  duration: string;
  description: string;
  current?: boolean;
};

export type ProjectCategory = "AI & Software" | "Data Engineering";

export type Project = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
};

export const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "Programming",
    skills: ["Python", "SQL"],
  },
  {
    number: "02",
    title: "Backend development",
    skills: ["Django", "Django REST Framework", "REST APIs", "MySQL"],
  },
  {
    number: "03",
    title: "AI & machine learning",
    skills: ["Machine Learning", "NLP", "Hugging Face Transformers", "spaCy", "Sentence Transformers"],
  },
  {
    number: "04",
    title: "Data & cloud",
    skills: ["Pandas", "NumPy", "ETL", "Data Pipelines", "AWS S3", "Lambda", "Glue", "Athena"],
  },
  {
    number: "05",
    title: "Developer tools",
    skills: ["Git", "GitHub", "Linux", "Docker"],
  },
];

export const experiences: Experience[] = [
  {
    company: "BOL7",
    position: "Python Developer",
    duration: "2026 — Present",
    description:
      "Building a scalable Python and Django backend for AI Studio, bringing voice, music, image and video generation models together in one platform. Developing model integrations and backend workflows for the video composer and AI-powered creative tools.",
    current: true,
  },
  {
    position: "Manual Testing Project",
    duration: "July 2026 — Present",
    description:
      "Set up and ran the application locally using VS Code and Docker. Tested end-to-end website workflows, validated responses, reported issues, and retested fixes.",
  },
  {
    company: "Credflow",
    position: "Data Analyst Intern",
    duration: "May 2026 — June 2026",
    description:
      "Analyzed cash-flow and invoice data using Excel pivot tables, VLOOKUP, and conditional formatting. Built Power BI dashboards to track collections performance and reporting KPIs.",
  },
  {
    position: "Course Tutor — Fundamentals of Computing",
    duration: "July 2023 — May 2024",
    description:
      "Mentored first-year students in programming fundamentals and computational concepts, led tutorials, and answered technical questions.",
  },
];

export const projects: Project[] = [
  {
    id: "ai-quiz-generator",
    number: "01",
    name: "AI Quiz Generator",
    subtitle: "AI-powered learning",
    description:
      "A Django REST API that generates questions from learning material, using Hugging Face Transformers, spaCy, and Sentence Transformers for question generation and semantic-similarity-based answer selection. Django ORM models and MySQL store quiz data.",
    category: "AI & Software",
    technologies: ["Python", "Django", "Django REST Framework", "Hugging Face", "spaCy", "Sentence Transformers", "MySQL"],
    githubUrl: "https://github.com/aryan-mishra22/ai-quiz-generator",
  },
  {
    id: "youtube-pipeline",
    number: "02",
    name: "YouTube Data Engineering Pipeline",
    subtitle: "AWS · ETL pipeline",
    description:
      "An AWS data pipeline that ingests and validates CSV and JSON data, transforms it into optimized Parquet, and queries the resulting data lake with Athena.",
    category: "Data Engineering",
    technologies: ["AWS S3", "Lambda", "Glue", "Athena", "ETL", "Parquet"],
    githubUrl: "https://github.com/aryan-mishra22/youtube-data-analysis",
  },
  {
    id: "voice-assistant",
    number: "03",
    name: "AI Voice Assistant",
    subtitle: "Jarvis · self-project",
    description:
      "A Python voice assistant that uses the Gemini API for natural-language conversations, with speech recognition and text-to-speech for end-to-end voice interaction.",
    category: "AI & Software",
    technologies: ["Python", "Gemini API", "Google GenAI SDK", "SpeechRecognition", "pyttsx3"],
  },
];

export const education = {
  degree: "B.E. Computer Science Engineering",
  institution: "Chandigarh University",
  location: "Gharuan",
  duration: "2022 — 2026",
  cgpa: "7.09 / 10",
};

export const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI · Andrew Ng",
    mark: "ML",
    description: "Three courses covering supervised and unsupervised learning, advanced algorithms, recommender systems, and reinforcement learning.",
    url: "https://drive.google.com/file/d/1flsn1QeCCyZBn7-X9vlm0wRfE1T68-4Q/view?usp=drivesdk",
  },
  {
    name: "Cloud Computing Certification",
    issuer: "NPTEL",
    mark: "CC",
    description: "Coursework covering foundational cloud computing concepts and services.",
    url: "https://drive.google.com/file/d/1fmFmvwTz9kE5U8aaJKpGg_a15NsaHFx3/view?usp=drivesdk",
  },
  {
    name: "Business Essentials Program",
    issuer: "HighRadius",
    mark: "BE",
    description: "Industry training in business analysis, data cleaning, reporting, and solving business problems with real-world datasets.",
  },
];
