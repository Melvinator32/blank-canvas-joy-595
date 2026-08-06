import { personalInfo } from "@/data/portfolio-data";
import SplitSection from "@/components/ui/split-section";

/**
 * SkillsSection Component
 * Grid display of skills using sticky split layout
 */
export default function SkillsSection() {
  const skillsList = personalInfo.skills.split(',').map(skill => skill.trim());
  
  return (
    <SplitSection title="Skills" id="skills">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {skillsList.map((skill, index) => (
          <div 
            key={index}
            className="text-small py-4 px-6 border border-foreground/15 hover:border-foreground/30 transition-colors"
          >
            {skill}
          </div>
        ))}
      </div>
    </SplitSection>
  );
}
