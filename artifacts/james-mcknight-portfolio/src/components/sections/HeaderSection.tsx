import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

export default function HeaderSection() {
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;
  const stats = content.stats;

  return (
    <section id="hero" className="space-y-12 scroll-mt-24">
      <div className="space-y-6">
        <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
          <EditableText contentKey="personalInfo.positioningTag" fallback={personalInfo.positioningTag} label="Positioning tag" />
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.1] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
          <EditableText contentKey="personalInfo.heroHeadline" fallback={personalInfo.heroHeadline} label="Hero headline" />
        </h1>
        <div className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
          <EditableText contentKey="personalInfo.heroSummary" fallback={personalInfo.heroSummary} multiline label="Hero summary" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 md:grid-cols-3 md:gap-6">
        {stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`} className="stat-card flex min-h-40 flex-col justify-center rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-3xl font-bold text-slate-900 md:text-4xl"><EditableText contentKey={`stats.${index}.value`} fallback={stat.value} label="Statistic value" /></p>
            <p className="mt-1 text-sm font-semibold text-slate-700"><EditableText contentKey={`stats.${index}.label`} fallback={stat.label} label="Statistic label" /></p>
            <p className="mt-1 text-xs text-slate-500"><EditableText contentKey={`stats.${index}.detail`} fallback={stat.detail} label="Statistic detail" /></p>
          </div>
        ))}
      </div>
      <div className="max-w-3xl border-l-2 border-slate-200 pl-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-slate-500"><EditableText contentKey="labels.aboutEyebrow" fallback="ABOUT ME" label="About section label" /></p>
        <div className="whitespace-pre-line text-sm leading-relaxed text-slate-600 md:text-base">
          {isEditing ? <EditableText contentKey="personalInfo.bio" fallback={personalInfo.bio} multiline label="Biography" /> : personalInfo.bio}
        </div>
      </div>
    </section>
  );
}
