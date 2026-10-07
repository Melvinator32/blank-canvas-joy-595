import { ArrowDown, ArrowRight, ArrowUp, Mail, MapPin, Menu, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MediumsSection from './MediumsSection';
import { EditableImage, EditableText, Gallery, useSiteEditor } from './SiteEditor';
import type { ArtistGroup } from './content';

type Page = 'home' | 'about' | 'portfolio';
const categories = [{ id: 'residential', tone: 'jade' }, { id: 'hospitality', tone: 'clay' }, { id: 'commercial', tone: 'kelp' }];
const journey = ['rowanne', 'collective', 'studio'];

function useHashPage() {
  const getPage = (): Page => window.location.hash === '#/portfolio' ? 'portfolio' : window.location.hash === '#/about' ? 'about' : 'home';
  const [page, setPage] = useState<Page>(getPage);
  useEffect(() => { const change = () => setPage(getPage()); window.addEventListener('hashchange', change); return () => window.removeEventListener('hashchange', change); }, []);
  return page;
}
function Navigation({ page }: { page: Page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setMenuOpen(false); }, [page]);
  return <header className="site-header">
    <a className="brand" href="#/" aria-label="Sixth Street Creative home"><StudioLogo /></a>
    <button className="nav-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
    <nav id="primary-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation" onClick={() => setMenuOpen(false)}>
      <a className={page === 'home' ? 'active' : ''} href="#/"><EditableText id="nav.home" /></a>
      <a className={page === 'about' ? 'active' : ''} href="#/about"><EditableText id="nav.about" /></a>
      <a className={page === 'portfolio' ? 'active' : ''} href="#/portfolio"><EditableText id="nav.portfolio" /></a>
      <a href="#mediums"><EditableText id="nav.mediums" /></a>
      <a href="#artists"><EditableText id="nav.artists" /></a>
      <a href="#contact"><EditableText id="nav.contact" /></a>
    </nav>
  </header>;
}
function Footer() {
  const { text } = useSiteEditor();
  const email = `mailto:${text('footer.email').trim()}`;
  return <footer id="contact" className="footer">
    <div className="footer-kicker"><EditableText id="footer.eyebrow" /></div>
    <div className="footer-grid">
      <div><h2><EditableText id="footer.title" /></h2></div>
      <div className="footer-copy"><p><EditableText id="footer.copy" /></p><a className="text-link" href={email}><EditableText id="footer.email" label="contact email" /><ArrowRight size={17} /></a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} <EditableText id="footer.copyright" /></span><div className="footer-meta"><span><MapPin size={14} /><EditableText id="footer.location" /></span><a href={email}><Mail size={14} /><EditableText id="footer.emailLabel" /></a></div></div>
  </footer>;
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
          <div className="eyebrow"><EditableText id="artists.eyebrow" /></div>
          <h2><EditableText id="artists.title" /></h2>
        </div>
        <p className="section-intro"><EditableText id="artists.intro" /></p>
      </div>

      <a className="text-link artist-collective-link" href="https://nashville.artistcollectives.org/pages/about-nashville-artist-collective" target="_blank" rel="noopener noreferrer">Nashville Artist Collective<ArrowRight size={17} /></a>

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

function StudioLogo({ className = '' }: { className?: string }) {
  return <div className={`studio-logo ${className}`}><img src="/images/sixth-street-logo.jpeg" alt="Sixth Street Creative logo with a green and cream geometric pattern" width={1152} height={1536} decoding="async" /></div>;
}

function HomePage() {
  const editor = useSiteEditor();
  return <main>
    <section className="hero shell-section">
      <div className="eyebrow"><EditableText id="home.eyebrow" /></div>
      <div className="hero-grid"><h1><EditableText id="home.title" /><br /><em><EditableText id="home.titleEm" /></em></h1><div className="hero-aside"><p><EditableText id="home.intro" /></p><a className="button-link" href="#/portfolio"><EditableText id="home.cta" /><ArrowRight size={18} /></a></div></div>
      <div className="hero-photo-wrap"><EditableImage id="home.hero" className="hero-photo-frame" imageClassName="hero-photo" eager /><div className="canvas-note"><span><EditableText id="home.stampTop" /></span><strong><EditableText id="home.stamp" /></strong><span><EditableText id="home.stampBottom" /></span></div></div>
    </section>
    <section className="statement slate-section"><p className="statement-copy"><EditableText id="approach.title" /> <em><EditableText id="approach.titleEm" /></em></p><div className="statement-detail"><span /><p><EditableText id="approach.copy" /></p></div></section>
    <MediumsSection />
    <ArtistSection groups={editor.content.artistGroups} isEditing={editor.active} onChange={groups => editor.update(draft => { draft.artistGroups = groups; })} />
    <section className="portfolio-tease driftwood-section">
      <div className="tease-grid"><h2><EditableText id="work.title" /></h2><div><p><EditableText id="work.intro" /></p><a className="text-link dark" href="#/portfolio"><EditableText id="work.cta" /><ArrowRight size={17} /></a></div></div>
      <div className="category-strip">{categories.map(category => <div className="category-card-shell" key={category.id}>
        <a className={`category-card category-card-photo ${category.tone}`} href="#/portfolio" style={{ backgroundImage: `linear-gradient(180deg, rgba(41,45,40,.05), rgba(41,45,40,.72)), url(${JSON.stringify(editor.image(`cover.${category.id}`).src)})` }}><strong><EditableText id={`portfolio.${category.id}.name`} /></strong><ArrowRight size={20} /></a>
        {editor.active && <button className="image-edit-button" type="button" onClick={() => editor.editImage(`cover.${category.id}`)}>Change cover photo</button>}
      </div>)}</div>
    </section>
  </main>;
}
function AboutPage() {
  return <main>
    <section className="portfolio-hero shell-section about-hero"><div className="eyebrow"><EditableText id="about.eyebrow" /></div><div className="portfolio-title-row"><h1><EditableText id="about.title" /><br /><em><EditableText id="about.titleEm" /></em></h1><p><EditableText id="about.intro" /></p><EditableImage id="about.headshot" className="about-headshot" eager /></div></section>
    <section className="journey shell-section" id="journey"><div className="section-heading-row"><div><h2><EditableText id="journey.title" /></h2></div><p className="section-intro"><EditableText id="journey.intro" /></p></div>
      <div className="journey-list">{journey.map(id => <article className={`journey-item${id !== 'rowanne' ? ' has-logo' : ''}`} key={id}>{id === 'collective' && <EditableImage id="journey.collective.logo" className="journey-icon" optional />}{id === 'studio' && <StudioLogo className="journey-icon" />}<div><h3><EditableText id={`journey.${id}.name`} /></h3></div><p><EditableText id={`journey.${id}.copy`} /></p></article>)}</div>
    </section>
  </main>;
}
function PortfolioPage() {
  return <main>
    <section className="portfolio-hero shell-section"><div className="eyebrow"><EditableText id="portfolio.eyebrow" /></div><div className="portfolio-title-row"><h1><EditableText id="portfolio.title" /><br /><em><EditableText id="portfolio.titleEm" /></em></h1><p><EditableText id="portfolio.intro" /></p></div></section>
    <section className="portfolio-categories">{categories.map(category => <article className={`portfolio-row ${category.tone}`} key={category.id}><div className="portfolio-row-copy"><h2><EditableText id={`portfolio.${category.id}.name`} /></h2><p><EditableText id={`portfolio.${category.id}.copy`} /></p></div><Gallery category={category.id} /></article>)}</section>
    <section className="portfolio-note shell-section"><span className="eyebrow"><EditableText id="portfolio.noteEyebrow" /></span><h2><EditableText id="portfolio.noteTitle" /></h2><p><EditableText id="portfolio.noteCopy" /></p></section>
  </main>;
}
export default function App() {
  const page = useHashPage();
  useEffect(() => {
    const section = ['#mediums', '#artists', '#contact'].includes(window.location.hash) ? document.getElementById(window.location.hash.slice(1)) : null;
    if (section) section.scrollIntoView(); else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);
  return <div className="site-shell"><Navigation page={page} />{page === 'portfolio' ? <PortfolioPage /> : page === 'about' ? <AboutPage /> : <HomePage />}<Footer /></div>;
}
