import { sideVentures } from "@/data/portfolio-data";
import SplitSection from "@/components/ui/split-section";
import CollapsibleText from "@/components/CollapsibleText";

/**
 * SideVenturesSection Component
 * Personal side businesses / hustles, listed in a sticky split layout
 */
export default function SideVenturesSection() {
  return (
    <SplitSection title="Side Ventures" id="side-ventures">
      <div className="space-y-10 md:space-y-12">
        {sideVentures.map((venture) => (
          <div key={venture.name} className="space-y-2">
            <h3 className="text-large leading-tight">{venture.name}</h3>
            <CollapsibleText description={venture.description} />
          </div>
        ))}
      </div>
    </SplitSection>
  );
}
