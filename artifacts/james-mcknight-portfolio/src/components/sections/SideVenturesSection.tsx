import CollapsibleText from "@/components/CollapsibleText";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * SideVenturesSection Component
 * Personal side businesses / hustles, listed in a sticky split layout
 */
export default function SideVenturesSection() {
  const { content, isEditing } = useContentEditor();
  const sideVentures = content.sideVentures;

  return (
    <section id="ventures" className="scroll-mt-24 space-y-12">
      <div className="border-b border-slate-200 pb-4"><h2 className="text-3xl font-semibold"><EditableText contentKey="labels.sectionVentures" fallback="Side Ventures" label="Side ventures section title" /></h2></div>
      <div className="grid gap-8 md:grid-cols-2">
        {sideVentures.map((venture, index) => (
          <article key={venture.name} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              <EditableText contentKey={`sideVentures.${index}.name`} fallback={venture.name} label="Side venture name" />
            </h3>
            {isEditing ? (
              <div className="text-sm leading-relaxed text-slate-600">
                <EditableText contentKey={`sideVentures.${index}.description`} fallback={venture.description} multiline label={`${venture.name} description`} />
              </div>
            ) : (
              <div className="text-sm leading-relaxed text-slate-600"><CollapsibleText description={venture.description} /></div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
