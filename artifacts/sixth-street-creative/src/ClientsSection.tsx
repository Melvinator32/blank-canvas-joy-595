import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { EditableImage, useSiteEditor } from './SiteEditor';
import type { Client } from './content';
import './relationships.css';

export default function ClientsSection() {
  const editor = useSiteEditor();
  const clients = editor.content.clients || [];
  const update = (id: string, patch: Partial<Client>) => editor.update(draft => {
    const client = draft.clients?.find(c => c.id === id);
    if (client) Object.assign(client, patch);
  });
  const add = () => editor.update(draft => {
    const id = crypto.randomUUID();
    const imageId = `client.${id}`;
    draft.images[imageId] = { src: '', alt: 'Client logo' };
    draft.clients = [...(draft.clients || []), { id, name: '', description: '', imageId }];
  });
  const move = (index: number, amount: number) => editor.update(draft => {
    const list = draft.clients || [], target = index + amount;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
  });
  return <section className="clients-section shell-section" id="clients">
    <div className="section-heading-row"><h2>Past Clients</h2></div>
    <div className="client-grid">{clients.map((client, index) => (editor.active || client.name.trim()) && <article className="client-card" key={client.id}>
      <EditableImage id={client.imageId} className="client-logo" optional />
      {editor.active ? <>
        <label>Client name<input aria-label={`Client ${index + 1} name`} value={client.name} maxLength={300} placeholder="Client name" onChange={e => update(client.id, { name: e.target.value })} /></label>
        <label>Description<textarea aria-label={`Client ${index + 1} description`} value={client.description} maxLength={8000} rows={4} placeholder="Describe the project or collaboration" onChange={e => update(client.id, { description: e.target.value })} /></label>
        <div className="client-actions">
          <button type="button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Move client ${index + 1} earlier`}><ArrowUp size={16} /></button>
          <button type="button" disabled={index === clients.length - 1} onClick={() => move(index, 1)} aria-label={`Move client ${index + 1} later`}><ArrowDown size={16} /></button>
          <button type="button" onClick={() => editor.update(draft => { draft.clients = draft.clients?.filter(c => c.id !== client.id); delete draft.images[client.imageId]; })} aria-label={`Remove client ${index + 1}`}><Trash2 size={16} /></button>
        </div>
      </> : <><h3>{client.name}</h3><p>{client.description}</p></>}
    </article>)}</div>
    {!clients.some(c => c.name.trim()) && !editor.active && <p className="clients-empty">Client collaborations will appear here.</p>}
    {editor.active && <button className="add-group-button" type="button" disabled={clients.length >= 100} onClick={add}><Plus size={17} /> Add client</button>}
  </section>;
}
