import { personalInfo } from "@/data/portfolio-data";

/**
 * HeaderSection Component
 * Split name layout with centered image
 */
export default function HeaderSection() {
  const currentYear = new Date().getFullYear();
  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  return (
    <section className="flex items-center justify-center px-8 md:px-16 lg:px-24 pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-tiny tracking-widest">{personalInfo.title}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-right">
            <h1 className="text-display lg:text-[9rem] leading-none font-light lg:font-normal">{firstName}</h1>
          </div>

          <div className="flex justify-center">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full max-w-[52rem] h-auto aspect-[52/60] object-cover rounded-t-[160px]"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-display lg:text-[9rem] leading-none font-light lg:font-normal">{lastName}</h1>
          </div>
        </div>
        
        <div className="text-center mt-16 md:mt-20">
          <p className="text-small">{currentYear}</p>
        </div>
      </div>
    </section>
  );
}
