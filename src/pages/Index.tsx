import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import HeaderSection from "@/components/sections/HeaderSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsSection from "@/components/sections/SkillsSection";
import InterestsSection from "@/components/sections/InterestsSection";
import PhotoGallerySection from "@/components/sections/PhotoGallerySection";

import ContactSection from "@/components/sections/ContactSection";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Index() {
  useActiveSection(100);
  return (
    <Layout>
      <Navigation />
      <HeaderSection />
      <AboutSection />
      <WorkSection />
      <EducationSection />
      <SkillsSection />
      <InterestsSection />
      <PhotoGallerySection />

      <ContactSection />
    </Layout>
  );
}