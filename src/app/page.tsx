import { BackToTop, IntroOverlay, ScrollProgress, SiteNav } from "@/components/site-shell";
import { Hero } from "@/components/hero";
import { AmbientBackground } from "@/components/ambient-background";
import { ExploreTerminal } from "@/components/explore-terminal";
import { ButtonFeedback } from "@/components/button-feedback";
import { SectionNavigator } from "@/components/section-navigator";
import { PointerInteractions } from "@/components/pointer-interactions";
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
      <PointerInteractions />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <IntroOverlay />
      <SiteNav />
      <SectionNavigator />
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
