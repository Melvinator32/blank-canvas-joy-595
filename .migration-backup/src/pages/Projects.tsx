import { icons } from "lucide-react";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import { projects } from "@/data/portfolio-data";

/**
 * Projects Page
 * Large thumbnail grid linking out to live app demos
 */
export default function Projects() {
  return (
    <Layout>
      <Navigation />
      <section className="px-8 md:px-16 lg:px-24 pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-tiny tracking-widest mb-6">PASSION PROJECTS</p>
          <h1 className="text-section mb-16 md:mb-20">Selected work &amp; demos</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {projects.map((project) => {
              const Icon = project.icon
                ? (icons as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[
                    project.icon
                  ]
                : undefined;
              const inner = (
                <>
                  <div className="aspect-[4/3] w-full overflow-hidden border border-foreground/15 group-hover:border-foreground/40 transition-colors">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-secondary p-8">
                        {Icon && <Icon className="w-10 h-10" strokeWidth={1.25} />}
                        <span className="text-large text-center leading-tight">
                          {project.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <h2 className="text-large leading-tight flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />}
                      {project.name}
                    </h2>

                    <p className="text-body leading-relaxed">{project.description}</p>
                    <p className="text-tiny">{project.techStack.join(" · ")}</p>
                    <div className="flex items-center gap-5 pt-1">
                      {project.demoUrl && (
                        <span className="text-small underline">View demo</span>
                      )}
                      {project.walkthroughUrl && (
                        <a
                          href={project.walkthroughUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-small underline"
                        >
                          Walkthrough
                        </a>
                      )}
                    </div>
                  </div>
                </>
              );

              const card = project.demoUrl ? (
                <a
                  key={project.id}
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {inner}
                </a>
              ) : (
                <div key={project.id} className="group block">
                  {inner}
                </div>
              );

              return card;
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
