
const mediums = [
  {
    name: 'Murals',
    description: 'Site-specific work that turns walls and architectural surfaces into memorable visual moments.',
    className: 'medium-card murals',
    image: '/images/portfolio/commercial-01.jpg',
    alt: 'Colorful Sixth Street Creative mural beside a pool',
  },
  {
    name: 'Paintings',
    description: 'Original works selected and placed to bring personality, tension, color, and story into a space.',
    className: 'medium-card paintings',
    image: '/images/portfolio/residential-01.jpg',
    alt: 'Curated paintings arranged in a collected interior',
  },
  {
    name: 'Wallpaper',
    description: 'Pattern, illustration, and custom wallcoverings that make the surface itself part of the art program.',
    className: 'medium-card wallpaper',
    image: '/images/portfolio/hospitality-01.jpg',
    alt: 'Expressive wall treatment in a Sixth Street Creative interior',
  },
];

export default function MediumsSection() {
  return (
    <section className="mediums-section" id="mediums">
      <div className="mediums-heading">
        <div>
          <div className="mediums-eyebrow">Mediums Sixth Street Specializes in</div>
        </div>
        <p>
          From original paintings to large-scale murals and expressive wallcoverings, I embrace bold expression to bring your space—and your vision—to life.
        </p>
      </div>

      <div className="mediums-grid">
        {mediums.map((medium) => (
          <article className={medium.className} key={medium.name}>
            <div className="medium-visual">
              <img src={medium.image} alt={medium.alt} loading="lazy" decoding="async" />
            </div>
            <h3>{medium.name}</h3>
            <p>{medium.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
