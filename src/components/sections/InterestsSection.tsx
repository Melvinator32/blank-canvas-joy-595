import { useState } from "react";
import type { Interest } from "@/types/portfolio";
import { interests } from "@/data/portfolio-data";
import SplitSection from "@/components/ui/split-section";

/**
 * InterestsSection Component
 * Personal interests listed in a sticky split layout. Each interest is
 * collapsed by default; click the name to reveal its description / children.
 */
export default function InterestsSection() {
  return (
    <SplitSection title="Interests" id="interests">
      <div className="space-y-2 md:space-y-3">
        {interests.map((interest) => (
          <InterestNode key={interest.name} node={interest} depth={0} />
        ))}
      </div>
    </SplitSection>
  );
}

/**
 * A recursive node. It is collapsible when it has a description or children;
 * otherwise (leaf name only) it renders as a plain, non-collapsible line.
 */
function InterestNode({ node, depth }: { node: Interest; depth: number }) {
  const [open, setOpen] = useState(false);

  const hasChildren = !!node.children && node.children.length > 0;
  const hasDescription = !!node.description;
  const collapsible = hasChildren || hasDescription;

  const paragraphs = (node.description ?? "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const indent = depth > 0 ? `pl-${Math.min(depth * 4, 8)}` : "";
  const nameClass =
    depth === 0
      ? "text-large leading-tight"
      : depth === 1
      ? "text-body leading-tight"
      : "text-small leading-tight";

  if (!collapsible) {
    return (
      <div className={`border-b border-dashed border-line/40 last:border-0 ${indent}`}>
        <p className={`py-2 ${nameClass}`}>{node.name}</p>
      </div>
    );
  }

  return (
    <div className={`border-b border-dashed border-line/40 last:border-0 ${indent}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-2 text-left transition-opacity hover:opacity-70"
      >
        <h3 className={nameClass}>{node.name}</h3>
        <span className="text-small shrink-0 opacity-60">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="space-y-1 pb-3">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-body leading-relaxed">
              {para}
            </p>
          ))}
          {hasChildren && (
            <div className="space-y-1">
              {node.children!.map((child) => (
                <InterestNode key={child.name} node={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
