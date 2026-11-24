# Feature polish: Park details (`feature/details-polish`)

You are Codex, working on a timed take-home interview exercise. This session revises the already-merged park details panel using Brian's product decisions. Two sibling sessions may be working on map and list in other worktrees. Do not touch their files.

This chat and all logs will be submitted to Granicus. Stay professional and on-task. This is a small app; do not over-engineer it. No new npm dependencies.

## Paths

- Working directory (git worktree, branch `feature/details-polish`, based on latest `develop`): `C:\Users\brian\granicus-takehome\wt-details2`
- Brief text (OUTSIDE the repo; read if useful; never copy it into the repo): `C:\Users\brian\granicus-takehome\brief\brief.txt`
- Read before coding: `src/components/ParkDetails/ParkDetails.tsx`, `ParkDetails.css`, `ParkDetails.test.tsx`, `formatAmenity.ts`, `formatAmenity.test.ts`, `src/types.ts`, `src/data/normalizePark.ts`, `src/App.test.tsx`.

## Allowed files only

You may change:

- Anything under `src/components/ParkDetails/`
- A new original SVG at `src/assets/park-placeholder.svg`

Do not edit `App.tsx`, `src/styles.css`, `ParkMap`, `ParkList`, `normalizePark`, sample JSON, README, or other feature folders. Do not commit or push. Leave version control to the operator. Windows machine; use PowerShell-friendly commands.

`tsconfig` already includes `"types": ["vite/client"]`, so a default Vite SVG import (`import placeholder from '../../assets/park-placeholder.svg'`) types as a URL string. Use that. Do not add declaration files elsewhere.

Normalized data: blank/null strings are `undefined`; `amenities` and `images` are always arrays; numeric `0` for rating or acreage is a real value (`!= null`), never treat it as missing with a truthiness check.

## 1. Consistent fields

When a park is selected, ALWAYS show the same fields, in this exact order, for every park:

1. Hours
2. Address
3. Description
4. Amenities
5. Acreage
6. Rating
7. Photos

Do not hide a field when its value is missing. Render the label and the value "Not provided". Muted styling for "Not provided" is fine, but the text must remain readable (sufficient contrast against the panel background; do not use light gray on white). Keep using `!= null` (or equivalent) so `0` still renders as "0 acres" / "0 out of 5". Singular "1 acre". Hours and address still use "Not provided" when missing, as before.

Amenities: if the array is empty, show "Not provided" rather than an empty list. If present, show the humanized list as today.

## 2. Hours front and center

Directly under the park name, before everything else, render hours prominently: a highlighted block with a bold "Hours" label and the value in larger text, exactly as given in the data. No parsing, no "open now", no rewriting "Dawn to dusk". Address comes next, then description, amenities, acreage, rating, photos.

The Hours block counts as the Hours field in the consistent list above — do not also repeat Hours later in the definition list. Address should be the first fact after that hours block.

## 3. Fallback / placeholder image

Create an original, generic park illustration as SVG at `src/assets/park-placeholder.svg`.

Requirements for the artwork:

- Simple, flat, original illustration: trees, grass, a path, and sky. Optional water or a bench if it stays simple.
- No text, no letters, no logos, no brand marks, no copyrighted characters, no photorealism.
- Keep the file small (aim well under 8 KB). Inline SVG, modest viewBox (e.g. 160x100 or 3:2), a handful of shapes, no filters or embedded raster.
- Use a few calm, distinct fills so it reads as a drawing, not a photo.

Use this illustration in two cases:

- A park image fails to load: `onError` swaps that `<img>` `src` to the imported placeholder URL **once**. Guard so a failed placeholder cannot loop (if the fallback itself errors, do not swap again; e.g. a `swapped`/`failed` flag, or only swap when `currentSrc` is still the original).
- A park has no images (`images` is empty): show **one** placeholder image in the Photos field.

Honest alternative text and a visible caption are required so the drawing never looks like a real photo of this park:

- Failed photo: `alt="Placeholder illustration (photo unavailable)"` and a small visible caption such as "Photo unavailable".
- No photos: `alt="Placeholder illustration (no photos provided)"` and a small visible caption such as "No photos provided" or "Not provided".

Do not use alt text that names the park as if this were a real photo (not "Photo 1 of Prospect Park" on the placeholder). Real (pre-error) photos keep their existing meaningful alt, e.g. "Photo 1 of Prospect Park", and `loading="lazy"`.

The Photos field is always present. When there are photos, render them (with the one-time src swap on error, plus caption after a swap). When there are none, render the placeholder and caption as above. You may also show the "Not provided" value in the no-photos case; the caption/placeholder must still be there.

Implement the swap by changing `src` on the existing img (or a small photo subcomponent that replaces src once). Do not fetch a second remote URL.

## 4. Amenity formatting

Keep `formatAmenity` small, but make casing consistent title-style for each word except the WiFi special case:

- `dog-run` → `Dog run` is acceptable (only first word capitalized) **or** title case; pick one rule and apply it consistently.
- Preferred visible forms that tests should cover: `WiFi`, `Bike path`, `Kayak launch`, `Picnic areas`, `Accessible paths`.
- `wifi` / `WiFi` → `WiFi`.
- Split on `-` and `_`. Do not build a huge special-case dictionary. Update `formatAmenity.test.ts` for these slugs.

## 5. Back button focus

In `ParkDetails.css`, add a visible `:focus-visible` style for the Back button: `3px solid` high-contrast outline with an outline offset (similar to `3px solid` and `outline-offset: 3px`). Do not rely on the global `:focus-visible` rule. Do not remove outlines. Keep `type="button"` and the accessible name "Back to list".

Empty state is unchanged in spirit: heading "Park details", a short prompt that still matches `/no park selected/i` (current copy is fine), no focus steal on initial empty mount. Selected heading still `tabIndex={-1}` and focused via an effect keyed on park id when the selected park changes, not on same-id rerender, not when park is undefined.

## Tests (required)

Update `ParkDetails.test.tsx` (and formatAmenity tests) so they match the new product rules. Keep `// @vitest-environment jsdom`. No new dependencies. You may import the sample JSON and run it through `normalizePark`.

Must cover:

- Prospect Park still shows real name, address, hours, description, "526 acres", "4.7 out of 5", humanized amenities, and real photo alts before error.
- Old Mill Botanical Garden (null description): Description label is present and the value is "Not provided". The page text must not include the literals "null" or "undefined".
- Highland Dog Park (no address): Address value is "Not provided". Hours still shown as given.
- Cedar Hill Nature Preserve (empty images, null rating): Rating is "Not provided"; Photos shows the placeholder image with the no-photos alt and a visible caption. It must not crash.
- Image `onError` swaps `src` to the placeholder, updates alt to the photo-unavailable wording, shows the visible caption, and a second error on that same image does not loop or throw. Fire the error event; do not rely on the network. Switching to another park should show that park's images fresh (no leftover unavailable caption).
- Hours are rendered first after the heading (before Address). A simple DOM-order assertion is enough (e.g. heading, then Hours, then Address).
- All field labels — Hours, Address, Description, Amenities, Acreage, Rating, Photos — are present for every sample park. Loop over the whole sample, render each normalized park, assert the seven labels, and assert the details text does not contain "null" or "undefined". Also keep coverage that acreage `0` / rating `0` still render, and `1 acre` is singular.
- `formatAmenity` unit tests for `dog-run`, `wifi`, `bike-path`, `kayak-launch`, `picnic-areas` / `picnic_areas`, and `accessible-paths`.
- Existing focus and Back-to-list `onClose` coverage should still pass (adjust only if the new DOM requires it).

## Verification (required before you finish)

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

All must pass. Fix anything you break. Do not leave the worktree broken.

## Final message

Include: files changed; confirmation you did not edit App.tsx or styles.css; exact command results; how hours, consistent fields, placeholder swap, and captions work; any contrast or SVG notes; the integration reminder that `onClose` still does not restore list focus (that remains App/list work).
