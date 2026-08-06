import { experience } from "@/data/portfolio-data";
import SplitSection from "@/components/ui/split-section";
import { format } from "date-fns";

/**
 * WorkSection Component
 * Split layout with all roles listed
 */
export default function WorkSection() {
  return (
    <SplitSection title="Experience" id="work">
      <div className="space-y-16 md:space-y-20">
        {experience.map((job, index) => {
          const startYear = format(new Date(job.startDate), "yyyy");
          const endYear = job.endDate ? format(new Date(job.endDate), "yyyy") : "Present";
          
          return (
            <div key={job.id}>
              {index > 0 && <hr className="border-t border-foreground/15 mb-16 md:mb-20" />}
              <div className="space-y-3">
                <h3 className="text-large leading-tight">
                  {job.role} at {job.company}
                </h3>
                <p className="text-small">
                  {startYear} - {endYear}
                </p>
                <p className="text-body leading-relaxed mt-6">
                  {job.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SplitSection>
  );
}
