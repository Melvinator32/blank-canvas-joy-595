import seed from '../public/data/site-content.json';

export type ArtistGroup = { id: string; title: string; artists: string[] };
export type SiteImage = { src: string; alt: string };
export type SiteContent = {
  version: 1;
  text: Record<string, string>;
  images: Record<string, SiteImage>;
  galleries: Record<string, string[]>;
  artistGroups: ArtistGroup[];
};
export const defaultContent = seed as SiteContent;
export const CONTENT_PATH = 'artifacts/sixth-street-creative/public/data/site-content.json';
export const REPOSITORY = 'Melvinator32/blank-canvas-joy-595';
export const BRANCH = 'sixth-street-creative';
export const cloneContent = (content: SiteContent): SiteContent => structuredClone(content);
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const smallString = (v: unknown, max = 8000): v is string => typeof v === 'string' && v.length <= max;
export function safeImageSource(v: unknown): v is string {
  if (!smallString(v, 4_000_000)) return false;
  return v === '' || (v.length <= 4096 && /^\/images\/[a-zA-Z0-9_./%-]+$/.test(v)) || (v.length <= 4096 && /^https:\/\/[^\s"<>]+$/.test(v)) || /^data:image\/(?:webp|png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(v);
}
export function validArtistGroups(value: unknown): value is ArtistGroup[] {
  return Array.isArray(value) && value.length <= 50 && value.every(g => record(g) && smallString(g.id, 100) && smallString(g.title, 300) && Array.isArray(g.artists) && g.artists.length <= 200 && g.artists.every(a => smallString(a, 300))) && new Set(value.map(g => g.id)).size === value.length;
}
export function isSiteContent(value: unknown): value is SiteContent {
  if (!record(value) || value.version !== 1 || !record(value.text) || !record(value.images) || !record(value.galleries) || !validArtistGroups(value.artistGroups)) return false;
  const { text, images, galleries } = value;
  if (Object.keys(text).length > 500 || Object.keys(images).length > 200) return false;
  if (!Object.keys(defaultContent.text).every(k => smallString(text[k])) || !Object.values(text).every(v => smallString(v))) return false;
  if (!Object.keys(defaultContent.images).every(k => record(images[k]))) return false;
  if (!Object.values(images).every(img => record(img) && safeImageSource(img.src) && smallString(img.alt, 500))) return false;
  if (!Object.keys(defaultContent.galleries).every(k => Array.isArray(galleries[k]))) return false;
  return Object.values(galleries).every(ids => Array.isArray(ids) && ids.length <= 40 && new Set(ids).size === ids.length && ids.every(id => typeof id === 'string' && record(images[id])));
}
export function fingerprint(content: SiteContent): string {
  const sort = (v: unknown): unknown => Array.isArray(v) ? v.map(sort) : record(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sort(v[k])])) : v;
  return JSON.stringify(sort(content));
}
export type Draft = { content: SiteContent; base: SiteContent };
async function withDraftStore<T>(mode: IDBTransactionMode, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open('sixth-street-editor', 1);
    open.onupgradeneeded = () => open.result.createObjectStore('drafts');
    open.onerror = () => reject(new Error('Draft storage is unavailable. Keep this tab open or export your draft.'));
    open.onsuccess = () => {
      const db = open.result;
      const transaction = db.transaction('drafts', mode);
      const request = operation(transaction.objectStore('drafts'));
      transaction.oncomplete = () => { resolve(request.result); db.close(); };
      transaction.onerror = transaction.onabort = () => { reject(new Error('Could not save this draft. Export it before closing the tab.')); db.close(); };
    };
  });
}
export const readDraft = () => withDraftStore<unknown>('readonly', store => store.get('site'));
export const writeDraft = (draft: Draft) => withDraftStore<IDBValidKey>('readwrite', store => store.put(draft, 'site'));
export const deleteDraft = () => withDraftStore<undefined>('readwrite', store => store.delete('site'));
export function isDraft(value: unknown): value is Draft {
  return record(value) && isSiteContent(value.content) && isSiteContent(value.base);
}
