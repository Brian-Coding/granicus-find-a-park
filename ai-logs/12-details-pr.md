## What

Implements the park details panel on `feature/details`. Selecting a park shows its name (focused for keyboard and screen-reader users), address, hours, and any supplied description, acreage, rating, amenities, and photos. Missing address or hours display "Not provided." Other missing fields are omitted. Amenity slugs are humanized (`dog-run` → `Dog run`). Broken images are replaced with an "Image unavailable" placeholder block, not another image request. "Back to list" calls `onClose`.

No changes to `App.tsx`, `src/styles.css`, map, list, or shared data/normalization. App already passed `park` and `onClose`.

## How tested

Independently re-ran (all passed):

- `npm run typecheck`
- `npm run lint`
- `npm test` — 31 tests across 4 files, including Prospect Park, Old Mill (null description), Highland (no address), Cedar Hill (empty images, null rating), image `onError` fallback, focus on park change but not empty initial load, acreage/rating `0`, and `formatAmenity`
- `npm run build`

## Known gaps

- After merge, App/list should restore focus to the previously selected list item when `onClose` runs. Details only calls the callback.
- README still describes the scaffold placeholders; it should be updated after the three feature branches are integrated.
- All sample image URLs point at `images.example.com` and will show the fallback in the running app.
- Empty image arrays omit the photo section (no "No photos available" note).
