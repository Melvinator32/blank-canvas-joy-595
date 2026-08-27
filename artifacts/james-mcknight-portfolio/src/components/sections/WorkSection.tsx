import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
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
                <div className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{isEditing ? <EditableText contentKey={`experience.${index}.description`} fallback={job.description} multiline label={`${job.role} overview`} /> : job.description}</div>
                <RoleDetails jobId={job.id} index={index} highlights={job.highlights} isEditing={isEditing} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RoleDetails({
  jobId,
  index,
  highlights,
  isEditing,
}: {
  jobId: string;
  index: number;
  highlights: string[];
  isEditing: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (highlights.length === 0) return null;

  if (isEditing) {
    return (
      <ul className="mt-3 space-y-2 border-l-2 border-slate-200 pl-4">
        {highlights.map((highlight, hIndex) => (
          <li key={`${jobId}-${hIndex}`} className="text-sm leading-relaxed text-slate-600 md:text-base">
            <EditableText
              contentKey={`experience.${index}.highlights.${hIndex}`}
              fallback={highlight}
              multiline
              label="Highlight bullet"
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
      >
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {open ? "Hide details" : "Show details"}
      </button>
      {open && (
        <ul className="mt-3 list-disc space-y-2 border-l-2 border-slate-200 pl-4 marker:text-slate-400">
          {highlights.map((highlight, hIndex) => (
            <li key={`${jobId}-${hIndex}`} className="pl-1 text-sm leading-relaxed text-slate-600 md:text-base">
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
