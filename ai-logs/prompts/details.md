# Feature: Park details (`feature/details`)

You are Codex, working on a timed take-home interview exercise. This session is **only** the park details feature. Two sibling sessions are implementing the map and list in other worktrees/branches. Do not touch their files.

This chat and all logs will be submitted to Granicus. Stay professional and on-task. This is a small app; do not over-engineer it. No new dependencies. Search, filters, and geolocation are out of scope.

## Paths

- Your working directory is this git worktree: `C:\Users\brian\granicus-takehome\wt-details` (branch `feature/details`).
- Brief text (OUTSIDE the repo; read it; never copy it into the repo): `C:\Users\brian\granicus-takehome\brief\brief.txt`
- Also read, before coding: `README.md`, `src/types.ts`, `src/data/normalizePark.ts`, `src/App.tsx`, `src/App.test.tsx`, `src/components/ParkDetails/ParkDetails.tsx`, `src/styles.css`.

## Normalized data you must consume

`normalizePark` already cleaned the records. Do not re-normalize in this component. Treat the incoming `Park` as:

- blank or null strings became `undefined` (they will not be the literal strings `"null"` or `"undefined"`, and they will not be empty strings)
- `amenities` and `images` are always arrays (possibly empty)
- coordinates may be absent; details does not need them
- `description`, `hours`, `location.address`, `acreage`, and `rating` may be missing (`undefined`)
- a numeric `0` for `rating` or `acreage` is a real value, not missing — render it; do not treat `0` as absent with a truthiness check

The `Park` TypeScript type is still loosely nullable for historical reasons. Prefer the normalized runtime shape above.

## Implement `src/components/ParkDetails` only

Allowed new/changed files:

- `src/components/ParkDetails/ParkDetails.tsx` (replace the stub)
- `src/components/ParkDetails/ParkDetails.css` (component CSS; import it from the component)
- a small `formatAmenity` helper (e.g. `src/components/ParkDetails/formatAmenity.ts`) and its tests
- `src/components/ParkDetails/ParkDetails.test.tsx` (and a unit test file for `formatAmenity` if separate)
- `src/App.test.tsx` only if the empty-state copy requires a small assertion update (see below)

**Do not edit** `src/App.tsx` or `src/styles.css` except the absolute minimum needed to wire props — and if you must, say so clearly in your final message. App already renders:

```tsx
<ParkDetails park={selectedPark} onClose={() => setSelectedParkId(null)} />
```

with `selectedPark` possibly `undefined`. The stub already accepts `{ park, onClose }`. You should not need to change App. Do not edit `ParkMap`, `ParkList`, `normalizePark`, sample JSON, or other feature folders.

Windows machine. Use PowerShell-friendly commands. Do not `git commit` or `git push`. Leave version control to the operator. Do not copy the brief or ai-logs into the repo.

## UX and accessibility requirements

When **no park is selected** (`park` is undefined):

- Show a short prompt like: "Select a park from the list or map to see details."
- Keep a stable accessible region name. The existing App test looks for `getByRole('region', { name: 'Park details' })` and text matching `/no park selected/i`. Keep an empty-state `<h2>` of "Park details" so the region name stays "Park details". Either include a phrase that still matches `/no park selected/i`, or update **only** the copy assertion in `src/App.test.tsx` to match your prompt. Do not steal focus in the empty state or on initial mount when nothing is selected.

When **a park is selected**:

- Semantic structure: a `<section>` with `aria-labelledby` pointing at the heading, and a `<dl>` for facts.
- An `<h2>` with the park **name**, `id` used by `aria-labelledby`, and `tabIndex={-1}`.
- **Focus the heading when the selected park changes**, via an effect keyed on the park id. Do **not** focus on initial load when no park is selected. Do not focus when `park` is undefined. If the same park is re-rendered without an id change, do not re-focus.
- **Address** and **hours** are always shown. If missing, the value is "Not provided" (never invent an address or hours).
- **Description**, **acreage**, **rating**, and **amenities** are shown only when present. Omit the section otherwise. Never invent values. Never render the literals `null`, `undefined`, or `"undefined"`.
- Acreage format: "526 acres"; singular "1 acre". `0` is "0 acres".
- Rating format: e.g. "4.7 out of 5", with accessible text (the visible text can itself be sufficient). **No fake star characters or graphics.** Rating `0` is "0 out of 5", not missing.
- Amenities: a list of humanized slugs via `formatAmenity`. `"dog-run"` -> `"Dog run"`. `"wifi"` -> `"WiFi"` is a nice-to-have; do not over-engineer a huge special-case map. A small helper that splits on `-`/`_`, title-cases words, and special-cases `wifi`/`WiFi` is enough. Omit the amenities block when the array is empty.
- Images:
  - Render each with meaningful alt text like "Photo 1 of Prospect Park", `loading="lazy"`.
  - `onError` must replace the broken image with a **neutral placeholder block** labeled "Image unavailable" (a `<div>` or similar, not another `<img>`). The sample URLs are placeholders at `images.example.com` and **will all fail**. Do not swap `src` to another URL that could also fail — that causes fallback loops.
  - If `images` is empty, show nothing or a single "No photos available" note. Cedar Hill has an empty images array and must not crash.
- A Close/Back button: `type="button"`, clear accessible label **"Back to list"**, calls `onClose`. App/list will return focus to the previously selected list item; that wiring is not yours. Just call `onClose` and mention the integration note in your final message.

Keep the UI small and readable. Component CSS only; do not restyle the whole app. Visible focus already exists globally via `:focus-visible` in `src/styles.css` — do not remove outlines.

## Tests (required)

Use Vitest + React Testing Library. No new dependencies (`@testing-library/jest-dom` is not installed; do not add it). Include `// @vitest-environment jsdom` in component test files (see `src/App.test.tsx`; Vite is not configured with a default environment).

Must cover:

1. Full park (Prospect Park): name heading, address, hours, description, "526 acres", "4.7 out of 5", humanized amenities including "Dog run", images with alt like "Photo 1 of Prospect Park".
2. Old Mill Botanical Garden (null description in the sample): renders without the strings "null" or "undefined"; description section omitted.
3. Highland Dog Park (no address): address value is "Not provided". Hours still shown.
4. Cedar Hill Nature Preserve (empty images, null rating): omits rating; photos are omitted or a single "No photos available" note; does not crash.
5. Image `onError` swaps the broken `<img>` for the "Image unavailable" fallback. Fire the error event; do not rely on the network.
6. The heading receives focus when the selected park changes (e.g. rerender from no park to a park, or from park A to park B). Assert it does **not** receive focus on initial empty-state mount.
7. `formatAmenity` unit tests: `dog-run` -> `Dog run`, and at least one other slug (`trails` -> `Trails`, and `wifi` if you special-case it).

You may import the sample JSON and run it through `normalizePark` in tests so you use the real normalized shape.

## Verification (required before you finish)

Run, and make all of them pass:

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

If a check fails, fix it. Do not leave the worktree broken.

## Final message

Include:

1. Files you created or changed, and whether you edited `App.tsx` or `styles.css` (you should not have needed to).
2. Exact commands and results (typecheck / lint / test / build).
3. How focus, missing fields, and image fallback work.
4. Integration note: `onClose` is called; App/list should restore focus to the list item.
5. Anything risky a reviewer should check (invented data, "undefined" leaks, focus on first empty load, rating/acreage `0`, image fallback loops).

Do not commit or push.
