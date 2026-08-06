import { personalInfo } from "@/data/portfolio-data";

interface NavigationProps {
  scrolled?: boolean;
}

export default function Navigation(_props: NavigationProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border px-8 md:px-16 lg:px-24"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto py-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{personalInfo.name}</span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-muted-foreground">{personalInfo.title}</span>
          </div>

          <a
            href="#contact"
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold hover:text-muted-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
