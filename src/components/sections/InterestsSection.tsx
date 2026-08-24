import { useState } from "react";
import { interests } from "@/data/portfolio-data";
import SplitSection from "@/components/ui/split-section";

/**
 * InterestsSection Component
 * Personal interests listed in a sticky split layout. Each interest is
 * collapsed by default; click the name to reveal its description.
 */
export default function InterestsSection() {
  return (
    <SplitSection title="Interests" id="interests">
      <div className="space-y-2 md:space-y-3">
        {interests.map((interest) => (
          <InterestItem
            key={interest.name}
            name={interest.name}
            description={interest.description}
          />
        ))}
      </div>
    </SplitSection>
  );
}

function InterestItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  const paragraphs = description
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="border-b border-dashed border-line/40 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-3 text-left transition-opacity hover:opacity-70"
      >
        <h3 className="text-large leading-tight">{name}</h3>
        <span className="text-body shrink-0 opacity-60">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="space-y-3 pb-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-body leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
