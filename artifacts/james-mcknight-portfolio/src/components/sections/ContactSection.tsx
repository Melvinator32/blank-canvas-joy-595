import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * ContactSection Component
 * Split layout with vertical divider
 */
export default function ContactSection() {
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;

  return (
    <section id="contact" className="flex items-center px-8 md:px-16 lg:px-24 py-20 md:py-24">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-32 items-center">
        <div className="flex items-center justify-center lg:justify-end lg:pr-16 lg:border-r border-foreground/15">
          <h2 className="text-section">
            <EditableText contentKey="labels.sectionContact" fallback="Contact" label="Contact section title" />
          </h2>
        </div>
        
        <div className="flex items-center lg:pl-16">
          <div className="space-y-6">
            <div className="mb-10">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.name}
                className="w-48 h-64 object-cover"
              />
            </div>

            <p className="text-large">
              <EditableText contentKey="personalInfo.name" fallback={personalInfo.name} label="Name" />
            </p>
            
            {isEditing ? (
              <p className="text-body">
                <EditableText contentKey="personalInfo.email" fallback={personalInfo.email} label="Email address" />
              </p>
            ) : (
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-body underline block"
              >
                {personalInfo.email}
              </a>
            )}

            {personalInfo.website && (
              isEditing ? (
                <p className="text-body">
                  <EditableText contentKey="personalInfo.website" fallback={personalInfo.website} label="Website address" />
                </p>
              ) : (
                <a
                  href={`https://${personalInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body underline block"
                >
                  {personalInfo.website}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
