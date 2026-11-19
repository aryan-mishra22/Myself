import { BackToTop, IntroOverlay, ScrollProgress, SiteNav } from "@/components/site-shell";
import { Hero } from "@/components/hero";
import { AmbientBackground } from "@/components/ambient-background";
import { ExploreTerminal } from "@/components/explore-terminal";
import { ButtonFeedback } from "@/components/button-feedback";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  SiteFooter,
  SkillsSection,
} from "@/components/sections";
import { ProjectsSection } from "@/components/projects-section";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <ButtonFeedback />
      <ThemeSwitcher />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <IntroOverlay />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <ExploreTerminal />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
