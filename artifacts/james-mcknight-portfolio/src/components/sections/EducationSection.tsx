import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

export default function EducationSection() {
  const { content, isEditing } = useContentEditor();
  const education = content.education;
  const skills = content.personalInfo.skills.split(",").map((skill) => skill.trim()).filter(Boolean);

  return (
    <section id="education" className="scroll-mt-24 space-y-12">
      <div className="border-b border-slate-200 pb-4"><h2 className="text-3xl font-semibold"><EditableText contentKey="labels.sectionEducation" fallback="Education" label="Education section title" /> &amp; <EditableText contentKey="labels.sectionSkills" fallback="Skills" label="Skills section title" /></h2></div>
      <div className="space-y-10">
        {education.map((edu, index) => (
          <article key={edu.id} className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-900 p-8 text-white shadow-xl md:flex-row md:p-10">
            <div className="max-w-lg space-y-2">
              <h3 className="text-2xl font-semibold"><EditableText contentKey={`education.${index}.institution`} fallback={edu.institution} label="Institution" /></h3>
              <p className="text-lg font-medium text-slate-300"><EditableText contentKey={`education.${index}.degree`} fallback={edu.degree} label="Degree" /></p>
              <p className="text-sm leading-relaxed text-slate-400"><EditableText contentKey={`education.${index}.field`} fallback={edu.field} label="Field of study" /><br /><EditableText contentKey={`education.${index}.location`} fallback={edu.location} label="Education location" /></p>
            </div>
            <div className="flex flex-col justify-center border-t border-slate-700 pt-4 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {edu.details && <div className="text-3xl font-bold"><EditableText contentKey={`education.${index}.details`} fallback={edu.details} label="Education details" /></div>}
              <div className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-400">GPA</div>
              <div className="mt-1 text-sm text-slate-500"><EditableText contentKey={`education.${index}.startYear`} fallback={edu.startYear} label="Education start year" /> – <EditableText contentKey={`education.${index}.endYear`} fallback={edu.endYear} label="Education end year" /></div>
            </div>
          </article>
        ))}
      </div>
      <div>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Technical &amp; Professional Arsenal</h3>
        {isEditing ? <EditableText contentKey="personalInfo.skills" fallback={content.personalInfo.skills} multiline label="Skills, separated by commas" className="text-slate-700" /> : <div className="flex flex-wrap gap-2.5">{skills.map((skill, index) => {
          const Icon = (icons as Record<string, React.ComponentType<LucideProps>>)[["Calculator", "TrendingUp", "Landmark", "Handshake", "Search", "ChartSpline", "Presentation", "Workflow", "FileSpreadsheet", "SquareSigma", "Brain", "Tv", "Radar", "ChartBar", "Code", "MonitorPlay", "ListTodo"][index] ?? "CircleDot"] ?? icons.CircleDot;
          return <span key={skill} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"><Icon size={14} className="text-blue-600" />{skill}</span>;
        })}</div>}
      </div>
    </section>
  );
}