import { ArrowDown, ArrowRight, ArrowUp, Mail, MapPin, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import MediumsSection from './MediumsSection';
import './photo.css';

type Page = 'home' | 'portfolio';
type ArtistGroup = { id: string; title: string; artists: string[] };

type PortfolioCategory = {
  name: string;
  number: string;
  summary: string;
  tone: string;
  images: string[];
};

const currentSiteHero = '/images/hero.jpg';

const journey = [
  {
    number: '01',
    name: 'Rowanne Designs',
    label: 'The foundation',
    description: 'An early design practice rooted in the belief that art should feel personal, lived-in, and inseparable from the spaces around it.',
  },
  {
    number: '02',
    name: 'Nashville Artist Collective',
    label: 'The community',
    description: 'A chapter shaped by artists, relationships, and curation — connecting original work with people and places in a thoughtful way.',
  },
  {
    number: '03',
    name: 'Sixth Street Creative',
    label: 'The studio today',
    description: 'Art consulting and creative collaboration brought together under one studio, with an instinct for the unexpected and a point of view that stays personal.',
  },
];

const portfolioCategories: PortfolioCategory[] = [
  {
    name: 'Residential',
    number: '01',
    summary: 'Original art and considered placement for homes that feel collected rather than decorated.',
    tone: 'jade',
    images: [
      '/images/portfolio/residential-01.jpg',
      '/images/portfolio/residential-02.jpg',
      '/images/portfolio/residential-03.jpg',
      '/images/portfolio/residential-04.jpg',
    ],
  },
  {
    name: 'Hospitality',
    number: '02',
    summary: 'Art programs and creative direction that give hotels, restaurants, and gathering spaces a memorable sense of place.',
    tone: 'clay',
    images: [
      '/images/portfolio/hospitality-01.jpg',
      '/images/portfolio/hospitality-02.jpg',
      '/images/portfolio/hospitality-03.jpg',
      '/images/portfolio/hospitality-04.jpg',
    ],
  },
  {
    name: 'Commercial',
    number: '03',
    summary: 'Art consulting for workplaces and public-facing environments where brand, culture, and human experience meet.',
    tone: 'kelp',
    images: [
      '/images/portfolio/commercial-01.jpg',
      '/images/portfolio/commercial-02.jpg',
      '/images/portfolio/commercial-03.jpg',
      '/images/portfolio/commercial-04.jpg',
    ],
  },
];

const defaultArtistGroups: ArtistGroup[] = [
  { id: 'featured-artists', title: 'Featured Artists', artists: [] },
];

const ARTIST_STORAGE_KEY = 'sixth-street-creative-artist-groups';

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
        <a className={page === 'home' ? 'active' : ''} href="#/">Studio</a>
        <a className={page === 'portfolio' ? 'active' : ''} href="#/portfolio">Portfolio</a>
        <a href="#mediums">Mediums</a>
        <a href="#artists">Artists</a>
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
        <div><h2>Have a space,<br />an idea, or both?</h2></div>
        <div className="footer-copy">
          <p>Sixth Street Creative works with clients, designers, architects, artists, and brands to create spaces with a point of view.</p>
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
        </div>
      </div>
    </footer>
  );
}

function ArtistSection({ groups, isEditing, onChange }: { groups: ArtistGroup[]; isEditing: boolean; onChange: (groups: ArtistGroup[]) => void }) {
  const updateGroup = (id: string, patch: Partial<ArtistGroup>) => {
    onChange(groups.map((group) => (group.id === id ? { ...group, ...patch } : group)));
  };

  const addGroup = () => onChange([...groups, { id: `artist-group-${Date.now()}`, title: 'New Artist Section', artists: [] }]);
  const removeGroup = (id: string) => onChange(groups.filter((group) => group.id !== id));

  const moveGroup = (index: number, direction: -1 | 1) => {
    const next = [...groups];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addArtist = (group: ArtistGroup) => updateGroup(group.id, { artists: [...group.artists, 'New Artist'] });

  const updateArtist = (group: ArtistGroup, artistIndex: number, value: string) => {
    const artists = [...group.artists];
    artists[artistIndex] = value;
    updateGroup(group.id, { artists });
  };

  const removeArtist = (group: ArtistGroup, artistIndex: number) => {
    updateGroup(group.id, { artists: group.artists.filter((_, index) => index !== artistIndex) });
  };

  return (
    <section className="artists-section shell-section" id="artists">
      <div className="section-heading-row artists-heading">
        <div>
          <div className="eyebrow">Artists We’ve Worked With</div>
          <h2>Built through<br />creative relationships.</h2>
        </div>
        <p className="section-intro">A growing register of artists Sixth Street Creative has collaborated with, sourced from, represented, or placed in projects.</p>
      </div>

      <div className="artist-groups">
        {groups.map((group, groupIndex) => (
          <article className="artist-group" key={group.id}>
            <div className="artist-group-header">
              {isEditing ? (
                <input className="artist-title-input" value={group.title} onChange={(event) => updateGroup(group.id, { title: event.target.value })} aria-label="Artist section title" />
              ) : (
                <h3>{group.title}</h3>
              )}

              {isEditing && (
                <div className="artist-group-actions">
                  <button type="button" onClick={() => moveGroup(groupIndex, -1)} disabled={groupIndex === 0} aria-label="Move section up"><ArrowUp size={16} /></button>
                  <button type="button" onClick={() => moveGroup(groupIndex, 1)} disabled={groupIndex === groups.length - 1} aria-label="Move section down"><ArrowDown size={16} /></button>
                  <button type="button" onClick={() => removeGroup(group.id)} aria-label="Remove section"><Trash2 size={16} /></button>
                </div>
              )}
            </div>

            <div className="artist-name-grid">
              {group.artists.map((artist, artistIndex) => (
                <div className="artist-name" key={`${group.id}-${artistIndex}`}>
                  {isEditing ? (
                    <>
                      <input value={artist} onChange={(event) => updateArtist(group, artistIndex, event.target.value)} aria-label={`Artist ${artistIndex + 1}`} />
                      <button type="button" onClick={() => removeArtist(group, artistIndex)} aria-label={`Remove ${artist}`}><X size={14} /></button>
                    </>
                  ) : (
                    <span>{artist}</span>
                  )}
                </div>
              ))}

              {!isEditing && group.artists.length === 0 && <p className="artist-empty">Artist names will appear here.</p>}
              {isEditing && <button className="add-artist-button" type="button" onClick={() => addArtist(group)}><Plus size={15} /> Add artist</button>}
            </div>
          </article>
        ))}
      </div>

      {isEditing && <button className="add-group-button" type="button" onClick={addGroup}><Plus size={17} /> Add artist section</button>}
    </section>
  );
}

function HomePage({ artistGroups, isEditing, onArtistGroupsChange }: { artistGroups: ArtistGroup[]; isEditing: boolean; onArtistGroupsChange: (groups: ArtistGroup[]) => void }) {
  return (
    <>
      <main>
        <section className="hero shell-section">
          <div className="eyebrow">Art consulting · Creative collaborations</div>
          <div className="hero-grid">
            <h1>Art with a<br /><em>sense of place.</em></h1>
            <div className="hero-aside">
              <p>Sixth Street Creative brings art, interiors, and people together — building collections and creative moments that feel personal, layered, and entirely at home.</p>
              <a className="button-link" href="#/portfolio">View the portfolio <ArrowRight size={18} /></a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <img className="hero-photo" src={currentSiteHero} alt="Sixth Street Creative project from the current website" />
            <div className="canvas-note"><span>EST.</span><strong>SSC</strong><span>NASHVILLE</span></div>
          </div>
        </section>

        <section className="statement slate-section">
          <div className="section-number">01 / Approach</div>
          <p className="statement-copy">We believe the best spaces don’t look <em>finished.</em> They look <em>collected.</em></p>
          <div className="statement-detail">
            <span />
            <p>Art should create a little tension, a little curiosity, and a reason to look twice. We pair a curator’s eye with a collaborator’s flexibility to help each project find its own visual language.</p>
          </div>
        </section>

        <section className="journey shell-section" id="journey">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Creative Journey</div>
              <h2>Three chapters.<br />One point of view.</h2>
            </div>
            <p className="section-intro">Sixth Street Creative is the latest expression of a creative practice shaped over time by design, artists, and the relationships between them.</p>
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

        <MediumsSection />
        <ArtistSection groups={artistGroups} isEditing={isEditing} onChange={onArtistGroupsChange} />

        <section className="portfolio-tease driftwood-section">
          <div className="section-number">02 / Selected work</div>
          <div className="tease-grid">
            <h2>Spaces are the canvas.</h2>
            <div>
              <p>Explore residential, hospitality, and commercial projects through a dedicated portfolio built to let the work lead.</p>
              <a className="text-link dark" href="#/portfolio">Enter the portfolio <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="category-strip">
            {portfolioCategories.map((category) => (
              <a className={`category-card category-card-photo ${category.tone}`} href="#/portfolio" key={category.name} style={{ backgroundImage: `linear-gradient(180deg, rgba(41,45,40,.05), rgba(41,45,40,.72)), url(${category.images[0]})` }}>
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
            <p>Art consulting and creative collaborations across residential, hospitality, and commercial environments.</p>
          </div>
        </section>

        <section className="portfolio-categories">
          {portfolioCategories.map((category) => (
            <article className={`portfolio-row ${category.tone}`} key={category.name}>
              <div className="portfolio-row-meta"><span>{category.number}</span><span>Portfolio category</span></div>
              <div className="portfolio-row-copy"><h2>{category.name}</h2><p>{category.summary}</p></div>
              <div className="portfolio-image-grid">
                {category.images.map((image, index) => (
                  <img key={image} src={image} loading="lazy" alt={`${category.name} project ${index + 1} from the current Sixth Street Creative website`} />
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="portfolio-note shell-section">
          <span className="eyebrow">The next layer</span>
          <h2>Built to grow with the work.</h2>
          <p>Each category is structured to become a full project gallery with individual case studies, project photography, artist details, and notes on the creative process.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function EditToolbar({ isEditing, hasChanges, onToggle, onSave }: { isEditing: boolean; hasChanges: boolean; onToggle: () => void; onSave: () => void }) {
  return (
    <div className="edit-toolbar">
      {isEditing && <button className="edit-save" type="button" onClick={onSave} disabled={!hasChanges}><Save size={15} /> Save artists</button>}
      <button className="edit-toggle" type="button" onClick={onToggle}>
        {isEditing ? <X size={15} /> : <Pencil size={15} />}
        {isEditing ? 'Exit edit mode' : 'Edit artists'}
      </button>
    </div>
  );
}

export default function App() {
  const page = useHashPage();
  const [isEditing, setIsEditing] = useState(false);
  const [savedArtistGroups, setSavedArtistGroups] = useState<ArtistGroup[]>(defaultArtistGroups);
  const [draftArtistGroups, setDraftArtistGroups] = useState<ArtistGroup[]>(defaultArtistGroups);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(ARTIST_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as ArtistGroup[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setSavedArtistGroups(parsed);
        setDraftArtistGroups(parsed);
      }
    } catch {
      // Use defaults if browser storage is unavailable or invalid.
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsEditing(false);
    setDraftArtistGroups(savedArtistGroups);
  }, [page, savedArtistGroups]);

  const hasArtistChanges = useMemo(
    () => JSON.stringify(savedArtistGroups) !== JSON.stringify(draftArtistGroups),
    [savedArtistGroups, draftArtistGroups],
  );

  const saveArtists = () => {
    setSavedArtistGroups(draftArtistGroups);
    window.localStorage.setItem(ARTIST_STORAGE_KEY, JSON.stringify(draftArtistGroups));
  };

  const toggleEditMode = () => {
    if (isEditing) setDraftArtistGroups(savedArtistGroups);
    setIsEditing((value) => !value);
  };

  return (
    <div className="site-shell">
      <Navigation page={page} />
      {page === 'portfolio' ? (
        <PortfolioPage />
      ) : (
        <HomePage
          artistGroups={isEditing ? draftArtistGroups : savedArtistGroups}
          isEditing={isEditing}
          onArtistGroupsChange={setDraftArtistGroups}
        />
      )}
      {page === 'home' && (
        <EditToolbar
          isEditing={isEditing}
          hasChanges={hasArtistChanges}
          onToggle={toggleEditMode}
          onSave={saveArtists}
        />
      )}
    </div>
  );
}
