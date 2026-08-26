import SplitSection from "@/components/ui/split-section";
import { format } from "date-fns";
import LinkedText from "@/components/LinkedText";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * WorkSection Component
 * Split layout with all roles listed
 */
export default function WorkSection() {
  const { content, isEditing } = useContentEditor();
  const experience = content.experience;

  const displayYear = (date: string | null) => {
    if (!date) return "Present";
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? date : format(parsed, "yyyy");
  };

  return (
    <SplitSection title="Professional Experience" titleKey="labels.sectionWork" id="work">
      <div className="space-y-16 md:space-y-20">
        {experience.map((job, index) => {
          const startYear = displayYear(job.startDate);
          const endYear = displayYear(job.endDate);
          
          return (
            <div key={job.id}>
              {index > 0 && <hr className="border-t border-foreground/15 mb-16 md:mb-20" />}
              <div className="space-y-3">
                <h3 className="text-large leading-tight">
                  {isEditing ? (
                    <>
                      <EditableText contentKey={`experience.${index}.role`} fallback={job.role} label={`Role at ${job.company}`} />
                      {" "}
                      <EditableText contentKey={`experience.${index}.company`} fallback={job.company} label="Company" />
                    </>
                  ) : (
                    <LinkedText>{`${job.role} ${job.connector ?? "at"} ${job.company}`}</LinkedText>
                  )}
                </h3>
                <p className="text-small">
                  {isEditing ? (
                    <>
                      <EditableText contentKey={`experience.${index}.startDate`} fallback={job.startDate} label="Start date" />
                      {" - "}
                      <EditableText contentKey={`experience.${index}.endDate`} fallback={job.endDate ?? "Present"} label="End date" />
                    </>
                  ) : (
                    `${startYear} - ${endYear}`
                  )}
                </p>
                <div className="text-body leading-relaxed mt-6">
                  {isEditing ? (
                    <EditableText contentKey={`experience.${index}.description`} fallback={job.description} multiline label={`${job.role} description`} />
                  ) : (
                    <LinkedText>{job.description}</LinkedText>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SplitSection>
  );
}
