import SplitSection from "@/components/ui/split-section";
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
    <SplitSection title="Side Ventures" titleKey="labels.sectionVentures" id="side-ventures">
      <div className="space-y-10 md:space-y-12">
        {sideVentures.map((venture, index) => (
          <div key={venture.name} className="space-y-2">
            <h3 className="text-large leading-tight">
              <EditableText contentKey={`sideVentures.${index}.name`} fallback={venture.name} label="Side venture name" />
            </h3>
            {isEditing ? (
              <div className="text-body leading-relaxed">
                <EditableText contentKey={`sideVentures.${index}.description`} fallback={venture.description} multiline label={`${venture.name} description`} />
              </div>
            ) : (
              <CollapsibleText description={venture.description} />
            )}
          </div>
        ))}
      </div>
    </SplitSection>
  );
}
