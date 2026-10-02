import './mediums.css';

const mediums = [
  {
    name: 'Murals',
    description: 'Site-specific work that turns walls and architectural surfaces into memorable visual moments.',
    className: 'medium-card murals',
    image: '/images/mediums/murals.webp',
    alt: 'Colorful Sixth Street Creative mural beside a pool',
  },
  {
    name: 'Paintings',
    description: 'Original works selected and placed to bring personality, tension, color, and story into a space.',
    className: 'medium-card paintings',
    image: '/images/mediums/paintings.webp',
    alt: 'Curated paintings arranged on a green wall',
  },
  {
    name: 'Wallpaper',
    description: 'Pattern, illustration, and custom wallcoverings that make the surface itself part of the art program.',
    className: 'medium-card wallpaper',
    image: '/images/mediums/wallpaper.webp',
    alt: 'Patterned wallpaper in a collected residential interior',
  },
];

export default function MediumsSection() {
  return (
    <section className="mediums-section" id="mediums">
      <div className="mediums-heading">
        <div>
          <div className="mediums-eyebrow">Mediums</div>
          <h2>Different surfaces.<br />One creative point of view.</h2>
        </div>
        <p>
          From original paintings to large-scale murals and expressive wallcoverings, the medium changes with the space and the story it needs to tell.
        </p>
      </div>

      <div className="mediums-grid">
        {mediums.map((medium) => (
          <article className={medium.className} key={medium.name}>
            <div className="medium-visual">
              <img src={medium.image} alt={medium.alt} loading="lazy" />
            </div>
            <div className="medium-meta">
              <span>Medium</span>
            </div>
            <h3>{medium.name}</h3>
            <p>{medium.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
