import { useState } from "react";
import type { Interest } from "@/types/portfolio";
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
    <section id="interests" className="scroll-mt-24 rounded-3xl border border-stone-800 bg-stone-900 p-8 md:p-12">
      <h2 className="mb-8 text-3xl font-semibold text-stone-100"><EditableText contentKey="labels.sectionInterests" fallback="Interests" label="Interests section title" /> &amp; Pursuits</h2>
      <div className="grid gap-x-12 md:grid-cols-2">
        {[interests.slice(0, Math.ceil(interests.length / 2)), interests.slice(Math.ceil(interests.length / 2))].map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-0">
            {column.map((interest, index) => {
              const actualIndex = columnIndex === 0 ? index : index + Math.ceil(interests.length / 2);
              return <InterestNode key={`${interest.name}-${actualIndex}`} node={interest} depth={0} contentKey={`interests.${actualIndex}`} />;
            })}
          </div>
        ))}
      </div>
    </section>
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

  const indent = depth === 1 ? "pl-4" : depth > 1 ? "pl-8" : "";
  const nameClass =
    depth === 0
      ? "text-lg font-medium text-stone-200"
      : depth === 1
      ? "text-base font-medium text-stone-300"
      : "text-sm text-stone-400";

  if (isEditing) {
    return (
      <div className={`border-b border-dashed border-stone-800 last:border-0 ${indent}`}>
        <h3 className={`py-2 ${nameClass}`}>
          <EditableText contentKey={`${contentKey}.name`} fallback={node.name} label="Interest name" />
        </h3>
        {hasDescription && (
          <div className="pb-3 text-sm leading-relaxed text-stone-400">
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
      <div className={`border-b border-dashed border-stone-800 last:border-0 ${indent}`}>
        <p className={`py-2 ${nameClass}`}>{node.name}</p>
      </div>
    );
  }

  return (
    <div className={`border-b border-dashed border-stone-800 last:border-0 ${indent}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-3 py-3 text-left transition-colors hover:text-amber-500"
      >
        <h3 className={nameClass}>{node.name}</h3>
        <span className="shrink-0 text-sm text-stone-500">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="space-y-1 pb-3">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-stone-400">
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
