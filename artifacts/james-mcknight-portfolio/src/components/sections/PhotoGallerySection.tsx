import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * PhotoGallerySection Component
 * Masonry-style collage of personal photos, shown below the Interests section.
 * Uses CSS columns so mixed portrait/landscape photos tile without cropping.
 */
export default function PhotoGallerySection() {
  const { content } = useContentEditor();
  const photos = content.photos;

  return (
    <section id="photos" className="px-8 md:px-16 lg:px-24 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="md:sticky md:top-32 mb-10 md:mb-16">
          <h2 className="text-section">
            <EditableText contentKey="labels.photoTitle" fallback="In Focus" label="Photo gallery title" />
          </h2>
        </div>
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:balance]">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="group relative mb-3 md:mb-4 break-inside-avoid overflow-hidden border border-foreground/15"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                onError={(event) => {
                  event.currentTarget.classList.add("hidden");
                  event.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="hidden aspect-[4/3] w-full items-center justify-center bg-secondary p-6 text-center">
                <span className="text-small leading-tight">
                  <EditableText contentKey={`photos.${index}.caption`} fallback={photo.caption} label="Photo caption" />
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <span className="text-tiny text-white/90 leading-tight">
                  <EditableText contentKey={`photos.${index}.caption`} fallback={photo.caption} label="Photo caption" />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
