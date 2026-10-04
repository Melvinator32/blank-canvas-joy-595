# Sixth Street Creative editor

The website has an **Edit site** button on every page. It enables a private draft:

- Click outlined text to edit it directly.
- Use the page selector to move between Studio, About Me, and Portfolio without losing edits.
- Use **Change photo** to upload a JPG, PNG, or WebP, supply a photo URL, or edit its accessible description. Uploaded images retain their proportions and are optimized up to 2400 pixels wide or tall.
- Add, remove, or reorder portfolio photos. Artist groups and names can also be added, edited, removed, and reordered.
- Preview removes editing controls. Undo/redo restores draft changes. More includes export/import, discard, and reload published.

Drafts are saved in IndexedDB on the current device. They are not visible to other visitors. Closing the editor shows the published content. The next editing session restores the device draft.

## Publishing

Choose **Publish** and provide a fine-grained GitHub personal access token scoped to **Melvinator32/blank-canvas-joy-595**, with **Contents: Read and write**. The token is kept only in the current tab's memory; it is not saved with content, drafts, browser storage, or exports. Close the editor to clear it.

Publishing creates a single Git commit on `sixth-street-creative` containing `artifacts/sixth-street-creative/public/data/site-content.json` and any newly uploaded image files. Existing code and assets are preserved. A newer content revision or a branch-update race stops publication instead of overwriting somebody else's work. Errors preserve the draft.

The Cloudflare project must deploy the `sixth-street-creative` branch from `artifacts/sixth-street-creative`. After a successful commit, the public website changes once that deployment finishes. The UI reports a successful commit separately from a completed deployment. No database or Cloudflare secret is required.

Use a token for this repository only. An expired token, missing Contents write access, or branch protection produces an actionable error. A read-only token cannot publish.

## Content schema

`src/content.ts` defines and validates the content shape. `public/data/site-content.json` supplies the starting content and is imported as a build-time fallback. Keep the schema, seed file, and editor fields in sync when extending the editor. User text is rendered as plain text, not HTML. Image URLs are restricted to HTTPS, local image paths, and raster image upload data during drafting.

Removed images are removed from the page; previously committed assets remain in Git history. Newly uploaded photos become regular files in `public/images/uploads` at publication. A session-only preview keeps those photos visible to the editor while deployment is pending.

## Validation

From `artifacts/sixth-street-creative`:

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test:editor
```

The browser check starts a production preview server and tests inline editing, undo/redo, preview, draft recovery, images, artist lists, mobile/tablet/desktop states, plain-text safety, invalid/insufficient credentials, stale content, and atomic publication with mocked GitHub responses. It never writes to GitHub. `CHROMIUM_EXECUTABLE_PATH` can point to an existing Chromium binary.
