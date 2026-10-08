import { EditableImage, EditableText } from './SiteEditor';
const mediums = [{ id: 'murals', tone: 'murals' }, { id: 'paintings', tone: 'paintings' }, { id: 'wallpaper', tone: 'wallpaper' }];
export default function MediumsSection() {
  return <section className="mediums-section" id="mediums">
    <div className="mediums-heading"><h2><EditableText id="mediums.eyebrow" /></h2><p><EditableText id="mediums.intro" /></p></div>
    <div className="mediums-grid">{mediums.map(medium => <article className={`medium-card ${medium.tone}`} key={medium.id}><div className="medium-visual"><EditableImage id={`medium.${medium.id}`} /></div><h3><EditableText id={`medium.${medium.id}.name`} /></h3><p><EditableText id={`medium.${medium.id}.copy`} /></p></article>)}</div>
  </section>;
}
