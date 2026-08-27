import { Link } from "react-router-dom";
import { Linkedin, Mail, MapPin, PencilLine } from "lucide-react";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";
import { useActiveSection } from "@/hooks/useActiveSection";

const sectionLinks = [
  { id: "hero", labelKey: "labels.navOverview", fallback: "Overview" },
  { id: "work", fallback: "Experience" },
  { id: "ventures", fallback: "Side Ventures" },
  { id: "education", fallback: "Education & Skills" },
  { id: "interests", fallback: "Interests" },
  { id: "photos", fallback: "Gallery" },
  { id: "contact", fallback: "Contact" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PortfolioSidebar() {
  const { content, enterEditing, exitEditing, isEditing } = useContentEditor();
  const activeSection = useActiveSection(180);
  const info = content.personalInfo;
  const linkedInUrl = "https://www.linkedin.com/in/james-r-mcknight";
  const personalRegister = ["interests", "photos", "contact"].includes(activeSection);
  const activeClass = personalRegister ? "bg-[var(--pers-accent)] text-[var(--pers-accent-foreground)]" : "bg-slate-900 text-white";

  return (
    <>
      <header className={`portfolio-home fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md lg:hidden ${personalRegister ? "pers-theme border-[var(--pers-border-strong)] bg-[var(--pers-surface)]/90" : "prof-theme border-slate-200 bg-white/90"}`}>
        <div>
          <h1 className="text-lg font-semibold tracking-tight"><EditableText contentKey="personalInfo.name" fallback={info.name} label="Name" /></h1>
          <p className={`text-xs ${personalRegister ? "text-[var(--pers-muted)]" : "text-slate-600"}`}><EditableText contentKey="personalInfo.title" fallback={info.title} label="Professional title" /></p>
        </div>
        <button type="button" onClick={() => scrollToSection("contact")} className={`rounded-full px-3 py-1.5 text-xs font-semibold text-white ${personalRegister ? "bg-[var(--pers-accent-strong)]" : "bg-slate-900"}`}>
          <EditableText contentKey="labels.navContact" fallback="Contact" label="Contact navigation label" />
        </button>
      </header>
      <aside className={`portfolio-home fixed inset-y-0 left-0 z-40 hidden w-72 flex-col justify-between overflow-y-auto border-r px-8 py-16 transition-colors duration-500 lg:flex ${personalRegister ? "pers-theme border-[var(--pers-border-strong)] bg-[var(--pers-surface)]" : "prof-theme border-slate-200 bg-white"}`}>
        <div>
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight"><EditableText contentKey="personalInfo.name" fallback={info.name} label="Name" /></h1>
            <p className={`mt-2 text-sm font-medium ${personalRegister ? "text-[var(--pers-muted)]" : "text-slate-600"}`}><EditableText contentKey="personalInfo.title" fallback={info.title} label="Professional title" /></p>
            <p className={`mt-4 flex items-center gap-2 text-xs ${personalRegister ? "text-[var(--pers-muted-2)]" : "text-slate-500"}`}>
              <MapPin size={14} aria-hidden="true" />
              <EditableText contentKey="labels.headerLocation" fallback="New Orleans, Louisiana" label="Location" />
            </p>
          </div>
          <nav className="space-y-1" aria-label="Main navigation">
            {sectionLinks.slice(0, 3).map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className={`nav-link block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${activeSection === item.id ? `active ${activeClass}` : ""}`} aria-current={activeSection === item.id ? "page" : undefined}>
                {item.labelKey ? <EditableText contentKey={item.labelKey} fallback={item.fallback} label={`${item.fallback} navigation label`} /> : item.fallback}
              </button>
            ))}
            <Link to="/projects" className="nav-link block w-full rounded-lg px-3 py-2 text-left text-sm font-medium">
              <EditableText contentKey="labels.navProjects" fallback="Passion Projects" label="Projects navigation label" />
            </Link>
            {sectionLinks.slice(3).map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className={`nav-link block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${activeSection === item.id ? `active ${activeClass}` : ""}`} aria-current={activeSection === item.id ? "page" : undefined}>
                {item.labelKey ? <EditableText contentKey={item.labelKey} fallback={item.fallback} label={`${item.fallback} navigation label`} /> : item.fallback}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-12 space-y-4">
          {isEditing ? (
            <span className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white ${personalRegister ? "bg-[var(--pers-accent-strong)]" : "bg-slate-900"}`}><Mail size={16} /><EditableText contentKey="labels.sidebarCta" fallback="Get in touch" label="Sidebar CTA label" /></span>
          ) : (
            <a href={`mailto:${info.email}`} className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white ${personalRegister ? "bg-[var(--pers-accent-strong)]" : "bg-slate-900"}`}><Mail size={16} /><EditableText contentKey="labels.sidebarCta" fallback="Get in touch" label="Sidebar CTA label" /></a>
          )}
          <div className="flex items-center justify-between">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`rounded-full p-2 transition-colors ${personalRegister ? "text-[var(--pers-muted)] hover:bg-[var(--pers-border)] hover:text-[var(--pers-text)]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}><Linkedin size={20} /></a>
            <button type="button" onClick={isEditing ? exitEditing : enterEditing} className={`inline-flex items-center gap-2 rounded border px-2.5 py-1.5 text-xs font-semibold transition-colors ${personalRegister ? "border-[var(--pers-border-strong)] hover:bg-[var(--pers-border)]" : "border-slate-300 hover:bg-slate-100"}`} aria-pressed={isEditing}>
              <PencilLine size={14} />{isEditing ? "Editing" : "Edit portfolio"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}