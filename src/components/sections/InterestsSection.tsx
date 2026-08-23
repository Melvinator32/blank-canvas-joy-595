import { interests } from "@/data/portfolio-data";
import SplitSection from "@/components/ui/split-section";

/**
 * InterestsSection Component
 * Personal interests listed in a sticky split layout
 */
export default function InterestsSection() {
  return (
    <SplitSection title="Interests" id="interests">
      <div className="space-y-10 md:space-y-12">
        {interests.map((interest) => (
          <div key={interest.name} className="space-y-3">
            <h3 className="text-large leading-tight">{interest.name}</h3>
            {interest.description
              .split("\n\n")
              .map((para, i) => (
                <p key={i} className="text-body leading-relaxed">
                  {para}
                </p>
              ))}
          </div>
        ))}
      </div>
    </SplitSection>
  );
}
