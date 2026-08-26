import LinkedText from "@/components/LinkedText";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * HeaderSection Component
 * Split name layout with centered image
 */
export default function HeaderSection() {
  const currentYear = new Date().getFullYear();
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;
  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  return (
    <section className="flex items-center justify-center px-8 md:px-16 lg:px-24 pt-24 pb-12 md:pt-28 md:pb-14">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-tiny tracking-widest">
            {isEditing ? (
              <EditableText contentKey="personalInfo.title" fallback={personalInfo.title} label="Professional title" />
            ) : (
              <LinkedText>{personalInfo.title}</LinkedText>
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {isEditing ? (
            <div className="col-span-1 lg:col-span-3 text-center">
              <h1 className="text-display lg:text-[7rem] leading-none font-light lg:font-normal">
                <EditableText contentKey="personalInfo.name" fallback={personalInfo.name} label="Name" />
              </h1>
            </div>
          ) : (
            <div className="text-center lg:text-right">
              <h1 className="text-display lg:text-[9rem] leading-none font-light lg:font-normal">{firstName}</h1>
            </div>
          )}

          <div className={`flex flex-col items-center ${isEditing ? "lg:col-span-3" : ""}`}>
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full max-w-[52rem] h-auto aspect-[52/60] object-cover rounded-t-[160px]"
            />
          </div>

          {!isEditing && (
            <div className="text-center lg:text-left">
              <h1 className="text-display lg:text-[9rem] leading-none font-light lg:font-normal">{lastName}</h1>
            </div>
          )}
        </div>
        
        <div className="text-center mt-10 md:mt-14">
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-none font-light tracking-tight">
            <EditableText contentKey="labels.headerLocation" fallback="New Orleans, Louisiana" label="Location" />
          </h2>
        </div>

        <div className="text-center mt-8 md:mt-10">
          <p className="text-small">{currentYear}</p>
        </div>
      </div>
    </section>
  );
}
