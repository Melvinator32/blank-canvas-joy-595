import { personalInfo } from "@/data/portfolio-data";
import LinkedText from "@/components/LinkedText";

/**
 * AboutSection Component
 * Centered about section with large text
 */
export default function AboutSection() {
  // Take only the first paragraph for minimal design
  const firstParagraph = personalInfo.bio.split('\n\n')[0];
  
  return (
    <section id="about" className="flex items-center justify-center px-8 md:px-16 lg:px-24 pt-10 md:pt-12 pb-16 md:pb-20">
      <div className="w-full max-w-4xl text-center space-y-10 md:space-y-12">
        <h2 className="text-tiny tracking-widest">ABOUT ME</h2>
        <p className="text-body leading-relaxed max-w-3xl mx-auto">
          <LinkedText>{firstParagraph}</LinkedText>
        </p>
      </div>
    </section>
  );
}
