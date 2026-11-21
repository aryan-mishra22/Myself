"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Info,
  Layers3,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  certifications,
  education,
  experiences,
  skillGroups,
} from "@/data/portfolio";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/site-shell";
import { getConnectedSkills } from "@/data/skill-connections";

function SectionHeading({
  eyebrow,
  title,
  titleId,
}: {
  eyebrow: string;
  title: string;
  titleId?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="section-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-heading__meta">
        <span className="section-kicker">{eyebrow}</span>
      </div>
      <h2 className="section-title" id={titleId}>{title}</h2>
    </motion.div>
  );
}

function AnimatedPortrait() {
  return (
    <div className="profile-photo-float">
      <div
        className="profile-photo-frame"
      >
        <Image
          className="profile-photo"
          src="/aryan-kumar-mishra.jpeg"
          alt="Portrait of Aryan Kumar Mishra"
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <span className="profile-photo-shine" />
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Curious by nature. Builder by choice." titleId="about-title" />
        <div className="about-grid">
          <Reveal className="about-story">
            <h3>I like making complex things feel simple.</h3>
            <p>
              I&apos;m a Computer Science and Engineering graduate focused on full-stack development and AI-powered applications. I connect user interfaces with Python and Django APIs, work with Django ORM and MySQL, and have hands-on experience with testing, data analysis, and machine learning projects.
            </p>
            <p>
              My projects include an AI quiz generator, an AWS data engineering pipeline, and a voice-controlled assistant using the Gemini API.
            </p>
            <p>
              I&apos;m seeking an entry-level full-stack developer role where I can build AI-powered web applications, while continuing to explore AI and cloud technologies.
            </p>
            <a className="text-link" href="#experience">
              A bit of my journey <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal className="about-aside" delay={0.1}>
            <div className="about-profile profile-cinema">
              <div className="about-profile__visual">
                <AnimatedPortrait />
                <div className="profile-cinema__top"><span>AKM<span>.</span></span><span>THE PORTFOLIO COLLECTION</span></div>
                <div className="profile-cinema__story">
                  <span className="profile-cinema__eyebrow"><b>A</b> THE DEVELOPER STORY</span>
                  <h3>ARYAN KUMAR<br />MISHRA<span>.</span></h3>
                  <div className="profile-cinema__metadata"><span>Full-stack developer</span><span>AI-powered</span></div>
                  <p className="profile-cinema__synopsis">Turning ideas into web experiences. Connecting thoughtful interfaces, Python backends, and AI.</p>
                  <div className="profile-cinema__actions">
                    <a href="#projects" className="profile-cinema__action"><ArrowRight size={17} aria-hidden="true" /> View projects</a>
                    <a href="#experience" className="profile-cinema__action profile-cinema__action--secondary"><Info size={17} aria-hidden="true" /> My journey</a>
                  </div>
                </div>
              </div>
              <div className="about-profile__caption">
                <span>BUILD · LEARN · REPEAT</span>
                <span>REACT · PYTHON · AI</span>
              </div>
            </div>
            <div className="about-focus">
              <span className="about-focus__label">CURRENTLY INTERESTED IN</span>
              <div className="interest-list">
                <span><BrainCircuit size={15} /> Applied AI</span>
                <span><Layers3 size={15} /> Full-stack applications</span>
                <span><Database size={15} /> Data engineering</span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="about-stats" aria-label="Profile highlights">
          <div className="about-stat"><span className="about-stat__number">B.E.</span><span className="about-stat__label">Computer Science</span></div>
          <div className="about-stat"><span className="about-stat__number">Python</span><span className="about-stat__label">Primary language</span></div>
          <div className="about-stat"><span className="about-stat__number">AI +</span><span className="about-stat__label">Software engineering</span></div>
          <div className="about-stat"><span className="about-stat__number">Build</span><span className="about-stat__label">With purpose</span></div>
        </div>
      </div>
    </section>
  );
}

const skillIcons = [Code2, Layers3, BrainCircuit, Sparkles, Database];
const skillListVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.06, staggerChildren: 0.035 } },
};
const skillChipVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const mainSkills = ["Python", "Django", "Machine Learning", "Data Pipelines", "SQL"];

export function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const [skillIndex, setSkillIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const inView = useInView(panel, { amount: 0.4 });
  const selectedSkill = mainSkills[skillIndex];
  const relatedSkills = getConnectedSkills(selectedSkill);

  useEffect(() => {
    if (!inView || reduceMotion !== false) return;
    const timer = setInterval(() => {
      if (!document.hidden) setSkillIndex((index) => (index + 1) % mainSkills.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [inView, reduceMotion]);

  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="THE TOOLKIT" title="Tools for turning ideas into reality." titleId="skills-title" />
        <p className="section-lead">
          My core skills and the tools that connect them, from Python and Django to AI and data engineering.
        </p>
        <div className="skill-connections" ref={panel} aria-label="Skill connections">
          <div className="skill-connections__heading">
            <p>
              {selectedSkill} connects with {relatedSkills.length} tools below.
            </p>
          </div>
          {selectedSkill && (
            <div className="skill-connections__map" key={selectedSkill}>
              <span className="skill-connections__origin">{selectedSkill}</span>
              <span className="skill-connections__line" aria-hidden="true" />
              <div className="skill-connections__targets" aria-label={`Tools connected to ${selectedSkill}`}>
                {relatedSkills.map((skill) => (
                  <span className="skill-connection-target" key={skill}>{skill}<ArrowRight size={12} aria-hidden="true" /></span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index];
            return (
              <Reveal key={group.title} className={`skill-group skill-group--${index + 1}`} delay={index * 0.045}>
                <div className="skill-group__header">
                  <span className="skill-group__icon"><Icon size={18} strokeWidth={1.7} aria-hidden="true" /></span>
                  <span className="skill-group__number">{group.number}</span>
                </div>
                <h3>{group.title}</h3>
                <motion.div
                  className="skill-list"
                  variants={skillListVariants}
                  initial={reduceMotion ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.7 }}
                >
                  {group.skills.map((skill) => (
                    <motion.span
                      className={`skill-chip${selectedSkill === skill ? " skill-chip--selected" : relatedSkills.includes(skill) ? " skill-chip--connected" : ""}`}
                      variants={skillChipVariants}
                      key={skill}
                      aria-label={`${skill}${relatedSkills.includes(skill) ? `, connected to ${selectedSkill}` : ""}`}
                    >
                      {skill}
                      {selectedSkill === skill && <span aria-hidden="true"> •</span>}
                      {relatedSkills.includes(skill) && <span aria-hidden="true"> ↔</span>}
                    </motion.span>
                  ))}
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-title">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="WHERE I'VE BEEN" title="Experience that keeps me curious." titleId="experience-title" />
        <p className="section-lead">Learning by building, analyzing and testing real products.</p>
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <Reveal key={experience.position} className="experience-item" delay={index * 0.08}>
              <div className="experience-item__timeline">
                <span className={`experience-item__node${experience.current ? " is-current" : ""}`}>
                  {experience.current && <span />}
                </span>
                <span className="experience-item__number">0{index + 1}</span>
              </div>
              <div className="experience-item__content">
                <div className="experience-item__top">
                  <div>
                    {experience.company && <p className="experience-item__company">{experience.company}</p>}
                    <h3>{experience.position}</h3>
                  </div>
                  <span className="experience-item__date">{experience.duration}</span>
                </div>
                <p className="experience-item__description">{experience.description}</p>
                {experience.current && (
                  <span className="experience-current"><BriefcaseBusiness size={12} /> CURRENT ROLE</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="section education-section" id="education" aria-labelledby="education-title">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="THE FOUNDATION" title="Built on a curious mind." titleId="education-title" />
        <div className="education-layout">
          <Reveal className="education-card">
            <div className="education-card__top">
              <span className="education-icon"><GraduationCap size={24} strokeWidth={1.5} aria-hidden="true" /></span>
              <span className="education-card__duration">{education.duration}</span>
            </div>
            <p className="education-card__label">DEGREE</p>
            <h3>{education.degree}</h3>
            <p className="education-card__institution">{education.institution}<span> · </span>{education.location}</p>
            <div className="education-card__bottom">
              <span>CGPA</span>
              <strong>{education.cgpa}</strong>
            </div>
          </Reveal>
          <Reveal className="certification-panel" delay={0.08}>
            <div className="certification-panel__heading">
              <div><p className="section-kicker">ALWAYS LEARNING</p><h3>Certifications</h3></div>
              <span className="certification-count">0{certifications.length}</span>
            </div>
            <div className="certification-list">
              {certifications.map((certification, index) => (
                <div className="certification-item" key={certification.name}>
                  <div className="certification-item__mark">
                    {certification.mark === "CC" ? <Cloud size={16} /> : index === 0 ? <BrainCircuit size={16} /> : <Sparkles size={16} />}
                  </div>
                  <div className="certification-item__content">
                    <h4>{certification.name}</h4>
                    <p>{certification.issuer}</p>
                    <p className="certification-item__description">{certification.description}</p>
                  </div>
                  {certification.url ? (
                    <a
                      className="certification-item__link"
                      href={certification.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${certification.name} certificate`}
                    >
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : <span aria-hidden="true" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type ContactField = "name" | "email" | "subject" | "message";
type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;

const emptyContact: ContactValues = { name: "", email: "", subject: "", message: "" };

export function ContactSection() {
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: ContactErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (values.message.trim().length < 10) {
      nextErrors.message = "Please write a message of at least 10 characters.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFeedback("Please check the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setFeedback("");
    const formData = new FormData();
    formData.set("name", values.name.trim());
    formData.set("email", values.email.trim());
    formData.set("_subject", values.subject.trim());
    formData.set("message", values.message.trim());

    try {
      const response = await fetch(siteConfig.contact.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}.`);
      }

      setFeedback("Thanks! Your message has been sent.");
      setValues(emptyContact);
    } catch {
      setFeedback(
        `Your message could not be sent. Please email ${siteConfig.contact.email} directly.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-horizon" aria-hidden="true">
        <div className="contact-horizon__glow" />
        <svg className="contact-horizon__lines" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="xMidYMax slice" focusable="false">
          {[0, 1, 2, 3, 4].map((line) => (
            <path key={line} d={`M-100 ${430 + line * 40} Q360 ${70 + line * 45} 760 ${380 + line * 26} T1540 ${220 + line * 48}`} pathLength={100} style={{ animationDelay: `${line * -2.4}s` }} />
          ))}
        </svg>
        <span className="contact-horizon__edge" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="LET'S TALK" title="Good things start with a conversation." />
        <div className="contact-layout">
          <Reveal className="contact-copy">
            <span className="contact-copy__icon"><AudioLines size={22} strokeWidth={1.5} /></span>
            <p className="section-kicker">HAVE AN INTERESTING PROJECT IN MIND?</p>
            <h3 id="contact-title">Let&apos;s build something <span>great together.</span></h3>
            <p className="contact-copy__text">
              Whether it&apos;s an ambitious idea, an interesting challenge or a chance to collaborate, I&apos;d love to hear what you&apos;re working on.
            </p>
            {siteConfig.contact.email ? (
              <a className="contact-email" href={`mailto:${siteConfig.contact.email}`}>
                <Mail size={16} /> {siteConfig.contact.email} <ArrowUpRight size={14} />
              </a>
            ) : (
              <p className="contact-unconfigured">Email address not configured yet.</p>
            )}
            {siteConfig.contact.phone && (
              <a className="contact-email contact-phone" href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`}>
                <Phone size={15} /> {siteConfig.contact.phone}
              </a>
            )}
            <SocialLinks className="contact-socials" />
          </Reveal>

          <Reveal className="contact-form-wrap" delay={0.1}>
            <span className="contact-paper-tape" aria-hidden="true" />
            <div className="contact-paper-heading"><span>A NOTE TO ARYAN</span><span>LET’S MAKE IT HAPPEN ↗</span></div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <div className="form-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" name="name" autoComplete="name" placeholder="Jane Smith" value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} required />
                  {errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} required />
                  {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" name="subject" placeholder="What's on your mind?" value={values.subject} onChange={(event) => updateField("subject", event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} required />
                {errors.subject && <span className="field-error" id="contact-subject-error">{errors.subject}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Your message</label>
                <textarea id="contact-message" name="message" rows={4} placeholder="Tell me a little about your project..." value={values.message} onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} required />
                {errors.message && <span className="field-error" id="contact-message-error">{errors.message}</span>}
              </div>
              <div className="contact-form__footer">
                <p className="form-feedback" aria-live="polite" role="status">{feedback}</p>
                <button className="button button--primary form-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send a message"} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
        <a className="brand-mark" href="#home" aria-label="Aryan — back to top">ARYAN<span className="brand-mark__dot">.</span></a>
        <p>Designed &amp; built with intention <span>·</span> © {new Date().getFullYear()} Aryan Kumar Mishra</p>
        <a className="footer-top-link" href="#home">Back to top <ArrowUpRight size={13} /></a>
      </div>
    </footer>
  );
}
