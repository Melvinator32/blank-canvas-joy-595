import { ArrowRight, Instagram, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

type Page = 'home' | 'portfolio';

const journey = [
  {
    number: '01',
    name: 'Rowanne Designs',
    label: 'The foundation',
    description:
      'An early design practice rooted in the belief that art should feel personal, lived-in, and inseparable from the spaces around it.',
  },
  {
    number: '02',
    name: 'Nashville Artist Collective',
    label: 'The community',
    description:
      'A chapter shaped by artists, relationships, and curation — connecting original work with people and places in a thoughtful way.',
  },
  {
    number: '03',
    name: 'Sixth Street Creative',
    label: 'The studio today',
    description:
      'Art consulting and creative collaboration brought together under one studio, with an instinct for the unexpected and a point of view that stays personal.',
  },
];

const portfolioCategories = [
  {
    name: 'Residential',
    number: '01',
    summary: 'Original art and considered placement for homes that feel collected rather than decorated.',
    tone: 'jade',
  },
  {
    name: 'Hospitality',
    number: '02',
    summary: 'Art programs and creative direction that give hotels, restaurants, and gathering spaces a memorable sense of place.',
    tone: 'clay',
  },
  {
    name: 'Commercial',
    number: '03',
    summary: 'Art consulting for workplaces and public-facing environments where brand, culture, and human experience meet.',
    tone: 'kelp',
  },
];

function useHashPage() {
  const getPage = (): Page => (window.location.hash === '#/portfolio' ? 'portfolio' : 'home');
  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return page;
}

function BrandMark() {
  return (
    <a className="brand" href="#/" aria-label="Sixth Street Creative home">
      <span className="brand-sixth">SIXTH STREET</span>
      <span className="brand-creative">CREATIVE</span>
    </a>
  );
}

function Navigation({ page }: { page: Page }) {
  return (
    <header className="site-header">
      <BrandMark />
      <nav className="nav-links" aria-label="Primary navigation">
        <a className={page === 'home' ? 'active' : ''} href="#/">
          Studio
        </a>
        <a className={page === 'portfolio' ? 'active' : ''} href="#/portfolio">
          Portfolio
        </a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-kicker">Start a conversation</div>
      <div className="footer-grid">
        <div>
          <h2>Have a space,<br />an idea, or both?</h2>
        </div>
        <div className="footer-copy">
          <p>
            Sixth Street Creative works with clients, designers, architects, artists, and brands to create spaces with a point of view.
          </p>
          <a className="text-link" href="mailto:rowanne@sixthstreetcreative.com">
            rowanne@sixthstreetcreative.com <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sixth Street Creative</span>
        <div className="footer-meta">
          <span><MapPin size={14} /> Nashville, Tennessee</span>
          <a href="mailto:rowanne@sixthstreetcreative.com"><Mail size={14} /> Email</a>
          <a href="#" aria-label="Instagram"><Instagram size={14} /> Instagram</a>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero shell-section">
          <div className="eyebrow">Art consulting · Creative collaborations</div>
          <div className="hero-grid">
            <h1>
              Art with a<br />
              <em>sense of place.</em>
            </h1>
            <div className="hero-aside">
              <p>
                Sixth Street Creative brings art, interiors, and people together — building collections and creative moments that feel personal, layered, and entirely at home.
              </p>
              <a className="button-link" href="#/portfolio">
                View the portfolio <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="hero-canvas" aria-label="Decorative studio color composition">
            <div className="canvas-block block-oxblood" />
            <div className="canvas-block block-jade" />
            <div className="canvas-block block-driftwood" />
            <div className="canvas-note">
              <span>EST.</span>
              <strong>SSC</strong>
              <span>NASHVILLE</span>
            </div>
          </div>
        </section>

        <section className="statement slate-section">
          <div className="section-number">01 / Approach</div>
          <p className="statement-copy">
            We believe the best spaces don’t look <em>finished.</em> They look <em>collected.</em>
          </p>
          <div className="statement-detail">
            <span />
            <p>
              Art should create a little tension, a little curiosity, and a reason to look twice. We pair a curator’s eye with a collaborator’s flexibility to help each project find its own visual language.
            </p>
          </div>
        </section>

        <section className="journey shell-section" id="journey">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Creative Journey</div>
              <h2>Three chapters.<br />One point of view.</h2>
            </div>
            <p className="section-intro">
              Sixth Street Creative is the latest expression of a creative practice shaped over time by design, artists, and the relationships between them.
            </p>
          </div>

          <div className="journey-list">
            {journey.map((item) => (
              <article className="journey-item" key={item.name}>
                <div className="journey-number">{item.number}</div>
                <div>
                  <div className="journey-label">{item.label}</div>
                  <h3>{item.name}</h3>
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-tease driftwood-section">
          <div className="section-number">02 / Selected work</div>
          <div className="tease-grid">
            <h2>Spaces are the canvas.</h2>
            <div>
              <p>
                Explore residential, hospitality, and commercial projects through a dedicated portfolio built to let the work lead.
              </p>
              <a className="text-link dark" href="#/portfolio">
                Enter the portfolio <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="category-strip">
            {portfolioCategories.map((category) => (
              <a className={`category-card ${category.tone}`} href="#/portfolio" key={category.name}>
                <span>{category.number}</span>
                <strong>{category.name}</strong>
                <ArrowRight size={20} />
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PortfolioPage() {
  return (
    <>
      <main>
        <section className="portfolio-hero shell-section">
          <div className="eyebrow">Portfolio</div>
          <div className="portfolio-title-row">
            <h1>Work with<br /><em>something to say.</em></h1>
            <p>
              Art consulting and creative collaborations across residential, hospitality, and commercial environments.
            </p>
          </div>
        </section>

        <section className="portfolio-categories">
          {portfolioCategories.map((category, index) => (
            <article className={`portfolio-row ${category.tone}`} key={category.name}>
              <div className="portfolio-row-meta">
                <span>{category.number}</span>
                <span>Portfolio category</span>
              </div>
              <div className="portfolio-row-copy">
                <h2>{category.name}</h2>
                <p>{category.summary}</p>
              </div>
              <div className="portfolio-art" aria-hidden="true">
                <div className={`art-shape art-shape-${index + 1}`} />
                <span>Project imagery</span>
              </div>
            </article>
          ))}
        </section>

        <section className="portfolio-note shell-section">
          <span className="eyebrow">The next layer</span>
          <h2>Built to grow with the work.</h2>
          <p>
            Each category is structured to become a full project gallery with individual case studies, project photography, artist details, and notes on the creative process.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const page = useHashPage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  return (
    <div className="site-shell">
      <Navigation page={page} />
      {page === 'portfolio' ? <PortfolioPage /> : <HomePage />}
    </div>
  );
}
