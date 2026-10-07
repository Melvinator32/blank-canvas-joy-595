import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, Check, Eye, ImagePlus, Pencil, Plus, Redo2, Save, Trash2, Undo2, Upload, X } from 'lucide-react';
import { BRANCH, REPOSITORY, cloneContent, defaultContent, deleteDraft, fingerprint, isDraft, isSiteContent, readDraft, validArtistGroups, writeDraft, safeImageSource, type SiteContent, type SiteImage } from './content';
import { publishContent, readRepositoryContent } from './publish';

type EditorContext = {
  content: SiteContent;
  editing: boolean;
  active: boolean;
  update: (change: (draft: SiteContent) => void) => void;
  text: (id: string) => string;
  image: (id: string) => SiteImage;
  editImage: (id: string) => void;
};
const Context = createContext<EditorContext | null>(null);
export function useSiteEditor() {
  const editor = useContext(Context);
  if (!editor) throw new Error('Site editor provider is missing');
  return editor;
}

export function EditableText({ id, label, className = '' }: { id: string; label?: string; className?: string }) {
  const { text, active, update } = useSiteEditor();
  const value = text(id);
  if (!active) return <span className={`site-text ${className}`}>{value}</span>;
  return <TextInput key={id} id={id} value={value} label={label || id.replaceAll('.', ' ')} className={className} onChange={next => update(draft => { draft.text[id] = next; })} />;
}
function TextInput({ id, value, label, className, onChange }: { id: string; value: string; label: string; className: string; onChange: (text: string) => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (ref.current && document.activeElement !== ref.current && ref.current.innerText !== value) ref.current.textContent = value;
  }, [value]);
  const changed = () => { if (ref.current) onChange(ref.current.innerText.replace(/\r/g, '').slice(0, 8000)); };
  return <span ref={ref} className={`site-text editable-text ${className}`} contentEditable="plaintext-only" suppressContentEditableWarning role="textbox" aria-label={`Edit ${label}`} aria-multiline="true" data-field={id} tabIndex={0} spellCheck onClick={event => { event.preventDefault(); event.stopPropagation(); }} onInput={changed} onBlur={changed} onKeyDown={event => { if (event.key === 'Escape') event.currentTarget.blur(); }} onPaste={event => {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (!ref.current?.contains(range.commonAncestorContainer)) return;
    const node = document.createTextNode(event.clipboardData.getData('text/plain').slice(0, 8000));
    range.deleteContents(); range.insertNode(node); range.setStartAfter(node); range.collapse(true); selection.removeAllRanges(); selection.addRange(range); changed();
  }} />;
}
export function EditableImage({ id, className = '', imageClassName = '', optional = false, eager = false }: { id: string; className?: string; imageClassName?: string; optional?: boolean; eager?: boolean }) {
  const { image, active, editImage } = useSiteEditor();
  const photo = image(id);
  if (!photo.src && !active && optional) return null;
  return <div className={`editable-image ${className}`} data-image={id}>
    {photo.src ? <img src={photo.src} alt={photo.alt} className={imageClassName} loading={eager ? 'eager' : 'lazy'} decoding="async" /> : active ? <div className="image-placeholder">Add a photo</div> : null}
    {active && <button className="image-edit-button" type="button" onClick={() => editImage(id)}><ImagePlus size={15} /> {photo.src ? 'Change photo' : 'Add photo'}</button>}
  </div>;
}
export function Gallery({ category }: { category: string }) {
  const { content, active, update, editImage } = useSiteEditor();
  const ids = content.galleries[category];
  const move = (index: number, amount: number) => update(draft => { const list = draft.galleries[category]; const target = index + amount; if (target < 0 || target >= list.length) return; [list[index], list[target]] = [list[target], list[index]]; });
  const add = () => {
    if (ids.length >= 40) return;
    const id = `gallery.${category}.${crypto.randomUUID()}`;
    update(draft => { draft.images[id] = { src: '', alt: `${content.text[`portfolio.${category}.name`]} project` }; draft.galleries[category].push(id); }); editImage(id);
  };
  return <div className={`portfolio-image-grid${active ? ' is-editing' : ''}`}>
    {ids.map((id, index) => <div className="gallery-photo" key={id}>
      <EditableImage id={id} />
      {active && <div className="gallery-actions">
        <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move photo ${index + 1} earlier`}><ArrowUp size={15} /></button>
        <button type="button" onClick={() => move(index, 1)} disabled={index === ids.length - 1} aria-label={`Move photo ${index + 1} later`}><ArrowDown size={15} /></button>
        <button type="button" onClick={() => update(draft => { draft.galleries[category] = draft.galleries[category].filter(key => key !== id); if (!Object.keys(defaultContent.images).includes(id)) delete draft.images[id]; })} aria-label={`Remove photo ${index + 1}`}><Trash2 size={15} /></button>
      </div>}
    </div>)}
    {active && <button className="gallery-add" type="button" onClick={add} disabled={ids.length >= 40}><Plus size={22} /> Add photo</button>}
  </div>;
}

function Modal({ title, children, onClose, busy = false }: { title: string; children: ReactNode; onClose: () => void; busy?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); const el = ref.current; return () => el?.close(); }, []);
  return <dialog ref={ref} className="editor-dialog" aria-labelledby="editor-dialog-title" onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}>
    <div className="editor-dialog-heading"><h2 id="editor-dialog-title">{title}</h2><button type="button" onClick={onClose} disabled={busy} aria-label="Close dialog"><X size={20} /></button></div>
    {children}
  </dialog>;
}
async function preparePhoto(file: File): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPG, PNG, or WebP image. Export HEIC photos as JPG first.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Choose an image smaller than 20 MB.');
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d'); if (!context) throw new Error('Image upload is unavailable in this browser.');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let source = canvas.toDataURL('image/webp', .9);
    if (source.length > 3_000_000) source = canvas.toDataURL('image/webp', .78);
    if (!safeImageSource(source)) throw new Error('This photo is too large. Try a smaller export.');
    return source;
  } finally { bitmap.close(); }
}
function ImageDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const { content, update } = useSiteEditor();
  const [photo, setPhoto] = useState(content.images[id]);
  const [error, setError] = useState(''); const [uploading, setUploading] = useState(false);
  return <Modal title="Edit photo" onClose={onClose} busy={uploading}>
    {photo.src && <img className="editor-photo-preview" src={photo.src} alt={photo.alt} />}
    <label className="upload-photo"><Upload size={18} /> Upload a photo<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={async event => {
      const file = event.target.files?.[0]; if (!file) return; setError(''); setUploading(true);
      try { const src = await preparePhoto(file); setPhoto(previous => ({ ...previous, src })); } catch (e) { setError(e instanceof Error ? e.message : 'This image could not be opened.'); } finally { setUploading(false); }
    }} /></label>
    <p className="editor-hint">JPG, PNG, or WebP. Photos are resized for the website without cropping.</p>
    <label>Or paste an image URL<input type="url" aria-label="Photo URL" placeholder="https://…" value={photo.src.startsWith('data:') ? '' : photo.src} onChange={event => setPhoto({ ...photo, src: event.target.value })} /></label>
    <label>Image description<input aria-label="Image description" value={photo.alt} maxLength={500} onChange={event => setPhoto({ ...photo, alt: event.target.value })} /></label>
    {error && <p className="editor-error" role="alert">{error}</p>}
    {uploading && <p role="status">Preparing your photo…</p>}
    <div className="editor-dialog-actions">
      <button type="button" onClick={() => { update(draft => { draft.images[id] = { ...photo, src: '' }; for (const category of Object.keys(draft.galleries)) draft.galleries[category] = draft.galleries[category].filter(key => key !== id); if (!Object.keys(defaultContent.images).includes(id)) delete draft.images[id]; }); onClose(); }} disabled={uploading}>Remove image</button>
      <button className="editor-primary" type="button" disabled={uploading} onClick={() => {
        if (!safeImageSource(photo.src)) { setError('Use an HTTPS image URL or upload a JPG, PNG, or WebP.'); return; }
        update(draft => { draft.images[id] = photo; }); onClose();
      }}><Check size={16} /> Apply photo</button>
    </div>
  </Modal>;
}
function exportContent(content: SiteContent) {
  const link = document.createElement('a'); const url = URL.createObjectURL(new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }));
  link.href = url; link.download = 'sixth-street-draft.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function SiteEditorProvider({ children }: { children: ReactNode }) {
  const [published, setPublished] = useState<SiteContent>(() => cloneContent(defaultContent));
  const [base, setBase] = useState<SiteContent>(() => cloneContent(defaultContent));
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(defaultContent));
  const [ready, setReady] = useState(false); const [editing, setEditing] = useState(false); const [preview, setPreview] = useState(false);
  const [history, setHistory] = useState<SiteContent[]>([]); const [future, setFuture] = useState<SiteContent[]>([]);
  const [imageId, setImageId] = useState<string | null>(null); const [dialog, setDialog] = useState<'publish' | 'discard' | 'reload' | null>(null);
  const [pageHash, setPageHash] = useState(window.location.hash.startsWith('#/') ? window.location.hash : '#/');
  useEffect(() => { const onHash = () => setPageHash(window.location.hash.startsWith('#/') ? window.location.hash : '#/'); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  const [notice, setNotice] = useState(''); const [storageStatus, setStorageStatus] = useState(''); const [storageError, setStorageError] = useState('');
  const [token, setToken] = useState(''); const [busy, setBusy] = useState(false); const [publishError, setPublishError] = useState(''); const [progress, setProgress] = useState('');
  const [previews, setPreviews] = useState<Map<string, string>>(new Map());
  const tokenRef = useRef(''); const draftRef = useRef(draft); draftRef.current = draft;
  const dirty = fingerprint(draft) !== fingerprint(base);
  const content = editing ? draft : published;
  const active = editing && !preview && !busy;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let current = cloneContent(defaultContent);
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/site-content.json`, { cache: 'no-store' });
        if (!response.ok) throw new Error();
        const value: unknown = await response.json();
        if (!isSiteContent(value)) throw new Error();
        current = value;
      } catch { if (!cancelled) setNotice('Using the content included with this site. Reload if a recent publication is missing.'); }
      if (cancelled) return;
      setPublished(current); setBase(current); setDraft(current);
      try {
        const saved = await readDraft();
        if (cancelled) return;
        if (isDraft(saved)) { setDraft(saved.content); setBase(saved.base); setStorageStatus('Draft restored'); }
        else if (saved) setStorageError('A saved draft could not be read. It was left in storage.');
      } catch (e) { if (!cancelled) setStorageError(e instanceof Error ? e.message : 'Draft storage is unavailable.'); }
      if (!cancelled) setReady(true);
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || !editing) return;
    setStorageStatus('Saving draft…');
    const timer = setTimeout(() => {
      writeDraft({ content: draft, base }).then(() => { setStorageStatus('Draft saved on this device'); setStorageError(''); }).catch(e => { setStorageError(e instanceof Error ? e.message : 'Could not save the draft.'); setStorageStatus('Draft not saved'); });
    }, 300);
    return () => clearTimeout(timer);
  }, [draft, base, ready, editing]);
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => { if (busy || (dirty && (storageError || storageStatus === 'Saving draft…'))) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', beforeUnload); return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [busy, dirty, storageStatus, storageError]);

  const update = (change: (next: SiteContent) => void) => {
    if (busy) return;
    const previous = draftRef.current; const next = cloneContent(previous); change(next);
    if (fingerprint(previous) === fingerprint(next)) return;
    if (!isSiteContent(next)) { setNotice('That change is too large or invalid. It has not been applied.'); return; }
    setHistory(items => [...items.slice(-39), previous]); setFuture([]); draftRef.current = next; setDraft(next); setNotice('');
  };
  const beginEditing = () => {
    setEditing(true); setPreview(false);
    try {
      const legacy = localStorage.getItem('sixth-street-creative-artist-groups');
      if (!dirty && legacy) {
        const groups: unknown = JSON.parse(legacy);
        if (validArtistGroups(groups) && fingerprint({ ...draft, artistGroups: groups }) !== fingerprint(draft)) {
          update(next => { next.artistGroups = groups; }); setNotice('Your previously saved artist list is included in this draft.');
        }
      }
    } catch { /* Older local artist lists are optional. */ }
  };
  const endEditing = async () => {
    try { await writeDraft({ content: draft, base }); } catch (e) { setStorageError(e instanceof Error ? e.message : 'Export your draft before closing.'); return; }
    tokenRef.current = ''; setToken(''); setEditing(false); setPreview(false); setImageId(null); setDialog(null);
  };
  const replaceDraft = (next: SiteContent, baseline = base) => { setHistory(items => [...items.slice(-39), draft]); setFuture([]); setDraft(next); draftRef.current = next; setBase(baseline); };
  const publish = async () => {
    setBusy(true); setPublishError('');
    const credential = token.trim() || tokenRef.current;
    try {
      const result = await publishContent(credential, draft, base, setProgress);
      tokenRef.current = credential;
      // Newly uploaded paths are available after deployment. Keep previews visible in this session.
      setPreviews(previous => new Map([...previous, ...[...result.uploaded].map(([data, path]) => [path, data] as [string, string])]));
      setPublished(result.content); setBase(result.content); setDraft(result.content); draftRef.current = result.content; setHistory([]); setFuture([]);
      try { await deleteDraft(); setStorageError(''); } catch { setStorageError('Published, but the old device draft could not be removed. Reload published before editing again on this device.'); }
      setNotice('Published to GitHub. The public site updates when its deployment finishes.'); setDialog(null); setToken('');
      try { localStorage.removeItem('sixth-street-creative-artist-groups'); } catch { /* No legacy storage is required. */ }
    } catch (e) { setPublishError(e instanceof Error ? e.message : 'Publishing failed. Your draft is safe.'); }
    finally { setBusy(false); setProgress(''); }
  };
  return <Context.Provider value={{ content, editing, active, update, text: id => content.text[id] ?? defaultContent.text[id] ?? '', image: id => { const image = content.images[id] || { src: '', alt: '' }; return { ...image, src: previews.get(image.src) || image.src }; }, editImage: setImageId }}>
    <div className={active ? 'site-is-editing' : ''}>{children}</div>
    {!editing ? <button className="site-editor-launch" type="button" onClick={beginEditing} disabled={!ready}><Pencil size={16} /> {ready ? 'Edit site' : 'Loading editor…'}</button> : <aside className="site-editor-toolbar" aria-label="Site editor">
      <div className="editor-toolbar-status"><strong>{preview ? 'Preview · changes are private' : 'Click outlined text to edit'}</strong><span role="status">{busy ? progress : storageStatus || 'Changes are private until published'}</span></div>
      <div className="editor-toolbar-buttons">
        <select className="editor-page-select" aria-label="Page to edit" value={pageHash} disabled={busy} onChange={event => { window.location.hash = event.target.value; }}><option value="#/">Studio</option><option value="#/about">About Me</option><option value="#/portfolio">Portfolio</option></select>
        <button type="button" disabled={!history.length || busy} onClick={() => { const previous = history.at(-1)!; setFuture(items => [...items, draft]); setHistory(items => items.slice(0, -1)); setDraft(previous); draftRef.current = previous; }} aria-label="Undo"><Undo2 size={17} /></button>
        <button type="button" disabled={!future.length || busy} onClick={() => { const next = future.at(-1)!; setHistory(items => [...items, draft]); setFuture(items => items.slice(0, -1)); setDraft(next); draftRef.current = next; }} aria-label="Redo"><Redo2 size={17} /></button>
        <button type="button" onClick={() => setPreview(value => !value)} disabled={busy}><Eye size={16} /> {preview ? 'Resume editing' : 'Preview'}</button>
        <details className="editor-more"><summary>More</summary><div>
          <button type="button" disabled={busy} onClick={() => exportContent(draft)}>Export draft</button>
          <label>Import draft<input type="file" accept="application/json,.json" disabled={busy} onChange={async event => { const file = event.target.files?.[0]; if (!file) return; try { if (file.size > 40_000_000) throw new Error('This draft is too large.'); const data: unknown = JSON.parse(await file.text()); if (!isSiteContent(data)) throw new Error('This file is not a valid Sixth Street Creative draft.'); replaceDraft(data); setNotice('Draft imported. Preview it before publishing.'); } catch (e) { setNotice(e instanceof Error ? e.message : 'Could not import this draft.'); } event.target.value = ''; }} /></label>
          <button type="button" disabled={busy} onClick={() => { setPublishError(''); setDialog('discard'); }}>Discard draft</button>
          <button type="button" disabled={busy} onClick={() => { setPublishError(''); setDialog('reload'); }}>Reload published</button>
        </div></details>
        <button className="editor-primary" type="button" disabled={!dirty || busy} onClick={() => { setPublishError(''); setToken(''); setDialog('publish'); }}><Save size={16} /> Publish</button>
        <button type="button" disabled={busy} onClick={() => void endEditing()} aria-label="Close editor"><X size={19} /></button>
      </div>
      {(notice || storageError) && <p className={storageError ? 'editor-error' : 'editor-notice'} role={storageError ? 'alert' : 'status'}>{storageError || notice}</p>}
    </aside>}
    {imageId && <ImageDialog key={imageId} id={imageId} onClose={() => setImageId(null)} />}
    {dialog === 'publish' && <Modal title="Publish your changes" busy={busy} onClose={() => { setToken(''); setDialog(null); }}>
      <p>Text, photos, galleries, and artist lists are saved together. Visitors see your changes after the website finishes deploying.</p>
      {!tokenRef.current && <>
        <label>GitHub publishing token<input type="password" value={token} autoComplete="off" autoCapitalize="none" spellCheck={false} onChange={event => setToken(event.target.value)} placeholder="github_pat_…" /></label>
        <p className="editor-hint">Use a fine-grained token for <strong>{REPOSITORY}</strong> with <strong>Contents: Read and write</strong>. The token stays in this tab’s memory and is cleared when you close the editor.</p>
        <a className="editor-help-link" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">Create a publishing token ↗</a>
      </>}
      <p className="editor-hint">Publishing branch: {BRANCH}</p>
      {publishError && <p className="editor-error" role="alert">{publishError}</p>}
      {busy && <p role="status">{progress}</p>}
      <div className="editor-dialog-actions"><button type="button" disabled={busy} onClick={() => { setDialog(null); setToken(''); }}>Keep editing</button><button className="editor-primary" type="button" disabled={busy || (!token.trim() && !tokenRef.current)} onClick={() => void publish()}>{busy ? 'Publishing…' : 'Publish changes'}</button></div>
    </Modal>}
    {(dialog === 'discard' || dialog === 'reload') && <Modal title={dialog === 'discard' ? 'Discard this draft?' : 'Reload the published version?'} busy={busy} onClose={() => setDialog(null)}>
      <p>{dialog === 'discard' ? 'Replace this device’s draft with the version currently shown to visitors.' : 'Replace this draft with the latest version saved to GitHub. Export your draft first if you want to keep a copy.'}</p>
      {publishError && <p className="editor-error" role="alert">{publishError}</p>}
      <div className="editor-dialog-actions"><button type="button" disabled={busy} onClick={() => setDialog(null)}>Keep draft</button><button className="editor-primary" type="button" disabled={busy} onClick={async () => {
        setBusy(true); setPublishError('');
        try { const latest = dialog === 'reload' ? await readRepositoryContent(tokenRef.current) : published; replaceDraft(cloneContent(latest), cloneContent(latest)); setPublished(latest); setNotice(dialog === 'reload' ? 'Latest published version loaded.' : 'Draft discarded.'); setDialog(null); }
        catch (e) { setPublishError(e instanceof Error ? e.message : 'Could not reload the site.'); }
        finally { setBusy(false); }
      }}>{dialog === 'discard' ? 'Discard draft' : 'Reload published'}</button></div>
    </Modal>}
  </Context.Provider>;
}
