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

const currentSiteHero = 'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vwJPk626fabhMN_P20wmdUQvAUzmOgj0O7_0ANY2dCv8fVzIs5rQDsEIqzRnE2csJNmD0Ni7BnhOTtY5lFGLdA1d7M0os8qK1AeIAIumZLsyUNEsd59Av7b-sV9mwLgWpcvNfghVlxjgk5rT_kK0gKh6MtxFjt067eO7ueGm50cq9iJHWlAcDr6VTziZqME6oUWv-wkDU0AAduqyA7z2xZgpS2GvSXCp8G31sV=w1280';

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
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72tUIjdmhHwQeeI5ElVKxUKeWqQ0Ujz9dINdEu0bJsiOwkAvehH0NNH6-AHIOtUkcHdQkftAxmBnvaAjeR4XWMkUsmfmeF6xrh24Nz2YzbrdsJqs2h24fETdB3YS0hzZYIXF90zEOii2_HgozOhOYkn3NxjSu5NOeRdsXK4K7RIBodfaboOw7XI4fhSPGUhzcFKXFoeDIin0HTHWrT-f5Ay9re7gfGZrPYSot0kU_rQ=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72uBk3CGDuuLvXXQzjQMuEQZna9SrOcAESIfejWetM9SxZZG2Def2Ru0zCeNVS3FZYVACPRcu1d5tDzOCzBqvLXzdIVOfSsEvApxPFpmySWjLCEryKcf2C98d8rCD2WFLiDiQYqBSjk4aJFVUk_sGMBYEdiLAM05Yig5ZBvjlO5JkOhuFXFQw2ohyXyxS1VLhnQPbg_bts2p06sM4qfc9Kcx6TQL8cU0xrIMS1JQ=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72sBgVWqJkltrSmNooO_PsBndr0J4eojj49B6-RUf11EJdi2kCGvtNbEROoYAH0IsPaCAihIGq3CHDf1Cvp2c-fACMkdwcXGfCiqfvJ_0wsWziaH_KlkpY0_At2yCT34fQiDVJL0H2rl_btB96Ujo8BbpOYbHiF-ho0gNzbc-K42BudAc_RevjxxUMGa1DogZnP9UjW3poZ4NVyh2CRACLig0zcHyBeYRR1B6mUT=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vDR07RI8LuqWERe5lJoVS2NBKuuJ620ru0g20YPClDUrOzfeZRpXAaKTLbS3I7BuDJpsW-Tl3kU9GsuX5tYCg0hDmTjtXXVt1SoPUbrww0B3-z89T9YAWUUdk49_XLEw4Tq_fUn-thbRZv7j-cBeHOeBw8SnyEPbUPR-6dhJprGsZs5_YQUTDAeKaIIFFWCXGdLS0OkVo1Jxj9G4CdAEmGUSqj5Aos4ST6YBLl=w1280',
    ],
  },
  {
    name: 'Hospitality',
    number: '02',
    summary: 'Art programs and creative direction that give hotels, restaurants, and gathering spaces a memorable sense of place.',
    tone: 'clay',
    images: [
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72u6pU7Ba5WF7IoKvhWwHAoB6LV2bw5cIRf2tYU1ah6qLRYL0AodYRoFWKBA0r4YJa6gvtC18QrWxaSc0oqX4u1sWHKKSk3hS_eZxHTzI9vUlsTOIT4xGAHrgS1VEjCxObIojImhjv6dovZPyKIiDOaxcySznDrNvAU1fZsoK_HcUlfkTv_HchpNKoSDK47pplAla4WDhNPYp_23n2Vzt4_o--FhR0l7Nl3DMQ=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72tIcaoGXk86GvH_EMPZ47gIwK3YCSj9d6SqyAOLpxycKii2nvkc3tSmYw_G75CXXGWJktCENpigNd53Z8f3KjUlDGAkk3qUcUUh16IKt83Peh_3MUz27nuX2QgFVLWS7Dmx-uHhMIfpS0AmiR8xdr5NlS8kR1M8Z5cw_HRK8wh4a0lBXeeVVShAxzdiDz7scr_AqJDx4b3_R_8DMS2PZiU9XBvQMgOggw1qrpLhAEk=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72tQT9161fyg_bTY98g99gX-mdxw4WBqdbJ48WM7tE9sj0XtuGrtt3QTVSTJFf1gphq_iLl59XPAbxFVQVR95o1tjxTzZfzUgiTbLV-I6TeWguZ-myAhZWk2f_iq1AqG621NUgJ3CeuH12Hx23JkopILA57kGGK1fxMVzlhK2Izipi7KTDR3zHTCUStNp2HGpgNTsoO5pa43XJlW-JWJHb3k3Sr5PYbHqCQ3YV10=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72tvwuKH7fHiuOXJLA7yyuzh5bOnh8t211NKpwBVSdbsC3gbZxAVYHNRF81zfkqtaDK2y-vxqyXxLBg-xOA6omzgZJFDPpWWJtaJxCT_4Yh0-X-5bTFUDKfDd9tjwK43YlUg7E_ezkIvPQzse1hCHNcJPDPC-Cv9VlVBqTAeMrspJGRW6uRPOygVJsIjTJdNEbYw6R3zB88TOUgrBoJEw3IkZm78VFMClkD0DTzQmRA=w1280',
    ],
  },
  {
    name: 'Commercial',
    number: '03',
    summary: 'Art consulting for workplaces and public-facing environments where brand, culture, and human experience meet.',
    tone: 'kelp',
    images: [
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vkObtuOf25nneXOw0bARIRRXSf2eglMOzvYUP30kywBI0DIkpaUqulKujUfH9fpPZrmDKIuzpxKXS-eN6WLA9rvGLOTt-McLmloJ7NH5Em92CKh3kGWGZFY_ZJ_33xjM9zZF-FVjTu08VZjKbcbGzQZCAjJKMUfsEJUBWALWw2Krz8Y3hooEhrQCS6WCQBzvxcmDrcbZ5SBSCbPY-qfwcBRllDVdgi4tURdEc9AbQ=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vn-KycmOQ8LqmOeN_txCpvfEIV72z020c0Szpfd40sl5INtzAnUKlt0vExGgoOgci9a3GPH4LXK7WnpvAvC6XJnHNWOuU7Z2PcNhgi9uV4D6NjETorkmXwBdHYNNdFoVt87mXyHd01gMIfXSouuL8iao3gooIe4BLuZbKTH-cEvYH6Bup07W18ZJq-o9OaedRThZioVCF3U_xmOd4wPXivuzTtVHp43gViMKhd8fs=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72uPSYNeDUKSzVCH3siUYZYb8JKOdQHS3cFIej9AF7HgnFOGyAe-9TGZe6q2Qyxzh8XNHZCfGAETgooJNlAr9FzLJNyqee4aYjH4ZnPfcYw2PbDg8yQmeaeE7qfqreGHTsDoljG_oPYwmUydnYio6UvOz7nJaI3_41WXuRkIlOh23G6Tyanalxfi_1nLCnUv9dpDcAaiMvGRRHQH-MY5ivnkZOvaVzUml_iw78kbWu8=w1280',
      'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vDLUjVz1Ccyhdt9ViiajBYW2hDYS7uvXcY01uunQkBRBFAgJArUnPpjWmsWIJ2K5UfvHBbPeLUVq_8Qd06QhYJSiF52Kow6Vs82gRxn_Y4CBRMEHu_d2S-iHa4vIDnLzUFqAOYaOiboxk4s58CkOSrCGOu_ssdkLtZHd17XNKi4avD1c1LlIl1iC9HasK0H5c6gGABgIeMeRfMWjX6nlGmbgj-F46sYSqr9SOP9vU=w1280',
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
