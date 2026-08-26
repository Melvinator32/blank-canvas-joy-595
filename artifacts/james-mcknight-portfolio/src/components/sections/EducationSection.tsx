import SplitSection from "@/components/ui/split-section";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

export default function EducationSection() {
  const { content } = useContentEditor();
  const education = content.education;

  return (
    <SplitSection title="Education" titleKey="labels.sectionEducation" id="education">
      <div className="space-y-16 md:space-y-20">
        {education.map((edu, index) => (
          <div key={edu.id}>
            {index > 0 && <hr className="border-t border-foreground/15 mb-16 md:mb-20" />}
            <div className="space-y-3">
              <p className="text-large leading-tight">
                <EditableText contentKey={`education.${index}.degree`} fallback={edu.degree} label="Degree" />
                {" "}
                <EditableText contentKey={`education.${index}.field`} fallback={edu.field} label="Field of study" />
                {", "}
                <EditableText contentKey={`education.${index}.institution`} fallback={edu.institution} label="Institution" />
              </p>
              <p className="text-small">
                <EditableText contentKey={`education.${index}.startYear`} fallback={edu.startYear} label="Education start year" />
                {" - "}
                <EditableText contentKey={`education.${index}.endYear`} fallback={edu.endYear} label="Education end year" />
              </p>
              {edu.details && (
                <div className="text-body mt-4">
                  <EditableText contentKey={`education.${index}.details`} fallback={edu.details} multiline label="Education details" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SplitSection>
  );
}