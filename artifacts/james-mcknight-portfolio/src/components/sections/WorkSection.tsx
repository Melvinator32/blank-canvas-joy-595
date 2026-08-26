import { format } from "date-fns";
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
    <section id="work" className="scroll-mt-24 space-y-12">
      <div className="border-b border-slate-200 pb-4"><h2 className="text-3xl font-semibold"><EditableText contentKey="labels.sectionWork" fallback="Professional Experience" label="Experience section title" /></h2></div>
      <div className="space-y-16">
        {experience.map((job, index) => {
          const startYear = displayYear(job.startDate);
          const endYear = displayYear(job.endDate);
          
          return (
            <div key={job.id} className="timeline-item group">
              <div className="timeline-line" /><div className="timeline-dot transition-transform group-hover:scale-125" />
              <div className="space-y-3">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
                  <h3 className="text-xl font-semibold text-slate-900"><EditableText contentKey={`experience.${index}.role`} fallback={job.role} label={`Role at ${job.company}`} /></h3>
                  <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-sm font-medium text-slate-500">{isEditing ? <><EditableText contentKey={`experience.${index}.startDate`} fallback={job.startDate} label="Start date" /> – <EditableText contentKey={`experience.${index}.endDate`} fallback={job.endDate ?? "Present"} label="End date" /></> : `${startYear} – ${endYear}`}</span>
                </div>
                <p className="text-lg font-medium text-slate-600"><EditableText contentKey={`experience.${index}.company`} fallback={job.company} label="Company" /></p>
                <div className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{isEditing ? <EditableText contentKey={`experience.${index}.description`} fallback={job.description} multiline label={`${job.role} description`} /> : job.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
