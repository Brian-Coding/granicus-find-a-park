## What

Revises the merged park details panel from product decisions:

- Every selected park shows the same fields in the same order: Hours, Address, Description, Amenities, Acreage, Rating, Photos. Missing values display "Not provided" instead of hiding the field. Numeric `0` still renders (`0 acres`, `0 out of 5`).
- Hours are front and center directly under the park name (bold label, larger text, highlighted block), shown exactly as given. Address follows.
- Photo placeholder is a Codex-generated generic park illustration at `src/assets/park-placeholder.webp` (1200×800, 144.7 KB). Failed images swap `src` once (no loop). Parks with no images show one placeholder. Honest alt text and a visible caption prevent it from looking like a real photo of that park.
- Amenity slugs use consistent sentence case, with `wifi` → `WiFi`.
- The Back button has its own 3px high-contrast `:focus-visible` outline and offset.

No changes to `App.tsx` or `src/styles.css`. Rebased onto latest `develop` (includes the map merge).

## How tested

Independently re-ran after the raster swap (all passed):

- `npm run typecheck`
- `npm run lint`
- `npm test` — 48 tests across 4 files, including a loop over all 12 sample parks, Old Mill description, Cedar Hill rating and placeholder, `onError` swap without looping, hours-before-address, and `0` acreage/rating
- `npm run build` — includes the WebP asset

After rebase onto `origin/develop` (which includes the map tests), `npm test` was 62 tests across 5 files, all passing.

## Known gaps

- "Back to list" still only calls `onClose`. After merge, App/list should restore focus to the previously selected list item.
- "Not provided" uses the same dark body text as real values (high contrast) rather than a muted color.
- Sample image URLs still point at `images.example.com` and will show the placeholder plus "Photo unavailable" in the running app.

