import { BRANCH, CONTENT_PATH, REPOSITORY, cloneContent, fingerprint, isSiteContent, type SiteContent } from './content';
const API = `https://api.github.com/repos/${REPOSITORY}`;

export class PublishError extends Error { constructor(message: string, public status = 0) { super(message); } }
async function github<T>(token: string, path: string, method = 'GET', body?: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API}${path}`, {
      method, cache: 'no-store', redirect: 'error',
      headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', ...(body ? { 'Content-Type': 'application/json' } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch { throw new PublishError('Could not reach GitHub. Your draft is safe; check your connection and try again.'); }
  if (!response.ok) {
    if (response.status === 401) throw new PublishError('This token is invalid or expired. Use a new GitHub token.', 401);
    if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') throw new PublishError('GitHub’s request limit was reached. Wait a few minutes and try again.', 403);
    if (response.status === 403) throw new PublishError('Publishing is blocked. Give the token access to blank-canvas-joy-595 with Contents: Read and write.', 403);
    if (response.status === 404) throw new PublishError('The publishing branch or content file could not be read. Make sure the token has access to blank-canvas-joy-595.', 404);
    if (response.status === 409 || response.status === 422) throw new PublishError('The site changed while you were publishing, or this branch blocks direct writes. Your draft is safe. Reload the published version before trying again.', response.status);
    throw new PublishError('GitHub did not accept the changes. Your draft is safe; try again later.', response.status);
  }
  return response.json() as Promise<T>;
}
function decodeBase64(value: string) {
  return new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g, '')), c => c.charCodeAt(0)));
}
export async function publishContent(token: string, draft: SiteContent, base: SiteContent, progress: (message: string) => void) {
  if (!token.trim()) throw new PublishError('Enter your GitHub publishing token.');
  if (!isSiteContent(draft) || !isSiteContent(base)) throw new PublishError('The content is invalid. Export your draft and reload the site.');
  progress('Checking the published version…');
  const ref = await github<{ object: { sha: string } }>(token, `/git/ref/heads/${BRANCH}`);
  const head = await github<{ tree: { sha: string } }>(token, `/git/commits/${ref.object.sha}`);
  const file = await github<{ content: string; encoding: string }>(token, `/contents/${CONTENT_PATH}?ref=${ref.object.sha}`);
  let remote: unknown;
  try { remote = JSON.parse(decodeBase64(file.content)); } catch { throw new PublishError('The published content could not be read. Your draft has not been published.'); }
  if (!isSiteContent(remote)) throw new PublishError('The published content has a different format. Reload the site before publishing.');
  if (fingerprint(remote) !== fingerprint(base)) throw new PublishError('Someone has published a newer version since this draft began. Export your draft, then use “Reload published” to start from the latest version. Nothing was overwritten.', 409);

  const content = cloneContent(draft);
  const entries: { path: string; mode: string; type: string; sha?: string; content?: string }[] = [];
  const uploaded = new Map<string, string>();
  let count = 0;
  // Reuse a single uploaded file when the same photo is used in several places.
  for (const image of Object.values(content.images)) {
    if (!image.src.startsWith('data:')) continue;
    if (uploaded.has(image.src)) { image.src = uploaded.get(image.src)!; continue; }
    progress(`Uploading photo ${++count}…`);
    const match = image.src.match(/^data:image\/(webp|png|jpeg);base64,(.+)$/);
    if (!match) throw new PublishError('One photo has an unsupported format. Replace it with a JPG, PNG, or WebP.');
    const name = `editor-${crypto.randomUUID()}.${match[1] === 'jpeg' ? 'jpg' : match[1]}`;
    const blob = await github<{ sha: string }>(token, '/git/blobs', 'POST', { content: match[2], encoding: 'base64' });
    entries.push({ path: `artifacts/sixth-street-creative/public/images/uploads/${name}`, mode: '100644', type: 'blob', sha: blob.sha });
    const source = `/images/uploads/${name}`;
    uploaded.set(image.src, source); image.src = source;
  }
  const serialized = `${JSON.stringify(content, null, 2)}\n`;
  if (new TextEncoder().encode(serialized).length > 900_000) throw new PublishError('There is too much text or too many long image URLs to publish. Shorten the content and try again; your draft is safe.');
  entries.push({ path: CONTENT_PATH, mode: '100644', type: 'blob', content: serialized });
  progress('Saving the site…');
  const tree = await github<{ sha: string }>(token, '/git/trees', 'POST', { base_tree: head.tree.sha, tree: entries });
  const commit = await github<{ sha: string }>(token, '/git/commits', 'POST', { message: 'Update Sixth Street Creative content from the site editor', tree: tree.sha, parents: [ref.object.sha] });
  await github(token, `/git/refs/heads/${BRANCH}`, 'PATCH', { sha: commit.sha, force: false });
  return { content, commit: commit.sha, uploaded };
}

export async function readRepositoryContent(token = ''): Promise<SiteContent> {
  const response = await fetch(`${API}/contents/${CONTENT_PATH}?ref=${BRANCH}`, {
    cache: 'no-store', redirect: 'error',
    headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!response.ok) throw new PublishError('Could not load the latest published content from GitHub. Your draft is unchanged.');
  const file = await response.json() as { content: string };
  const content: unknown = JSON.parse(decodeBase64(file.content));
  if (!isSiteContent(content)) throw new PublishError('The latest content could not be read. Your draft is unchanged.');
  return content;
}
