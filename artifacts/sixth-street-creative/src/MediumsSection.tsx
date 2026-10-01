const mediums = [
  {
    number: '01',
    name: 'Murals',
    description: 'Site-specific work that turns walls and architectural surfaces into memorable visual moments.',
    className: 'medium-card murals',
  },
  {
    number: '02',
    name: 'Paintings',
    description: 'Original works selected and placed to bring personality, tension, color, and story into a space.',
    className: 'medium-card paintings',
  },
  {
    number: '03',
    name: 'Wallpaper',
    description: 'Pattern, illustration, and custom wallcoverings that make the surface itself part of the art program.',
    className: 'medium-card wallpaper',
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
            <div className="medium-visual" aria-hidden="true">
              <div className="medium-shape" />
            </div>
            <div className="medium-meta">
              <span>{medium.number}</span>
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
