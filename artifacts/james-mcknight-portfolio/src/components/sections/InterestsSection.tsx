import { useState } from "react";
import type { Interest } from "@/types/portfolio";
import SplitSection from "@/components/ui/split-section";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * InterestsSection Component
 * Personal interests listed in a sticky split layout. Each interest is
 * collapsed by default; click the name to reveal its description / children.
 */
export default function InterestsSection() {
  const { content } = useContentEditor();
  const interests = content.interests;

  return (
    <SplitSection title="Interests" titleKey="labels.sectionInterests" id="interests">
      <div className="space-y-2 md:space-y-3">
        {interests.map((interest, index) => (
          <InterestNode key={`${interest.name}-${index}`} node={interest} depth={0} contentKey={`interests.${index}`} />
        ))}
      </div>
    </SplitSection>
  );
}

/**
 * A recursive node. It is collapsible when it has a description or children;
 * otherwise (leaf name only) it renders as a plain, non-collapsible line.
 */
function InterestNode({ node, depth, contentKey }: { node: Interest; depth: number; contentKey: string }) {
  const [open, setOpen] = useState(false);
  const { isEditing } = useContentEditor();

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

  if (isEditing) {
    return (
      <div className={`border-b border-dashed border-line/40 last:border-0 ${indent}`}>
        <h3 className={`py-2 ${nameClass}`}>
          <EditableText contentKey={`${contentKey}.name`} fallback={node.name} label="Interest name" />
        </h3>
        {hasDescription && (
          <div className="pb-3 text-body leading-relaxed">
            <EditableText
              contentKey={`${contentKey}.description`}
              fallback={node.description ?? ""}
              multiline
              label={`${node.name} description`}
            />
          </div>
        )}
        {hasChildren && (
          <div className="space-y-1 pb-3">
            {node.children!.map((child, index) => (
              <InterestNode
                key={`${child.name}-${index}`}
                node={child}
                depth={depth + 1}
                contentKey={`${contentKey}.children.${index}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

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
                <InterestNode key={child.name} node={child} depth={depth + 1} contentKey={`${contentKey}.children.${node.children!.indexOf(child)}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
