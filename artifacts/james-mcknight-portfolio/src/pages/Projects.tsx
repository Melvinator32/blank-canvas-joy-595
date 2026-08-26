import { icons } from "lucide-react";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

function withBasePath(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
}

/**
 * Projects Page
 * Large thumbnail grid linking out to live app demos
 */
export default function Projects() {
  const { content, isEditing } = useContentEditor();
  const projects = content.projects;

  return (
    <Layout>
      <Navigation />
      <section className="px-8 md:px-16 lg:px-24 pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-tiny tracking-widest mb-6">
            <EditableText contentKey="labels.projectsEyebrow" fallback="PASSION PROJECTS" label="Projects section label" />
          </p>
          <h1 className="text-section mb-16 md:mb-20">
            <EditableText contentKey="labels.projectsTitle" fallback="Selected work & demos" label="Projects page title" />
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {projects.map((project, index) => {
              const Icon = project.icon
                ? (icons as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[
                    project.icon
                  ]
                : undefined;
              const media = (
                <div className="aspect-[4/3] w-full overflow-hidden border border-foreground/15 group-hover:border-foreground/40 transition-colors">
                  {project.thumbnail ? (
                    <>
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.classList.add("hidden");
                          event.currentTarget.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                      <div className="hidden w-full h-full flex-col items-center justify-center gap-6 bg-secondary p-8 text-center">
                        {Icon && <Icon className="w-10 h-10" strokeWidth={1.25} />}
                        <span className="text-large leading-tight">
                          <EditableText contentKey={`projects.${index}.name`} fallback={project.name} label="Project name" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-secondary p-8 text-center">
                      {Icon && <Icon className="w-10 h-10" strokeWidth={1.25} />}
                      <span className="text-large leading-tight">
                        <EditableText contentKey={`projects.${index}.name`} fallback={project.name} label="Project name" />
                      </span>
                    </div>
                  )}
                </div>
              );

              const details = (
                <div className="mt-6 space-y-3">
                  <h2 className="text-large leading-tight flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />}
                    <EditableText contentKey={`projects.${index}.name`} fallback={project.name} label="Project name" />
                  </h2>

                  <div className="text-body leading-relaxed">
                    <EditableText contentKey={`projects.${index}.description`} fallback={project.description} multiline label={`${project.name} description`} />
                  </div>
                  <div className="text-tiny">
                    <EditableText contentKey={`projects.${index}.techStack`} fallback={project.techStack.join(", ")} label={`${project.name} skills, separated by commas`} />
                  </div>
                  <div className="flex items-center gap-5 pt-1">
                    {project.demoUrl && (
                      isEditing ? (
                        <span className="text-small">
                          <EditableText contentKey="labels.projectDemo" fallback="View demo" label="Project demo link label" />
                        </span>
                      ) : (
                        <a
                          href={withBasePath(project.demoUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-small underline"
                        >
                          <EditableText contentKey="labels.projectDemo" fallback="View demo" label="Project demo link label" />
                        </a>
                      )
                    )}
                    {project.walkthroughUrl && (
                      isEditing ? (
                        <span className="text-small">
                          <EditableText contentKey="labels.projectWalkthrough" fallback="Walkthrough" label="Project walkthrough link label" />
                        </span>
                      ) : (
                        <a
                          href={withBasePath(project.walkthroughUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-small underline"
                        >
                          <EditableText contentKey="labels.projectWalkthrough" fallback="Walkthrough" label="Project walkthrough link label" />
                        </a>
                      )
                    )}
                  </div>
                </div>
              );

              return (
                <div key={project.id} className="group block">
                  {project.demoUrl && !isEditing ? (
                    <a
                      href={withBasePath(project.demoUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Open ${project.name} demo`}
                    >
                      {media}
                    </a>
                  ) : (
                    media
                  )}
                  {details}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
