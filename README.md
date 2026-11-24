# Find a Park

A Phase 1 scaffold for a New York City-area park finder using the 12 supplied sample records.

## Run

From the repository root, using Node.js 24 and npm:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite.

## What works

The app loads and normalizes the sample. Three labeled placeholder regions show the planned layout. The list and details share the left pane, with the map on the right. The regions stack on a narrow screen.

## Left out

Resident-facing park selection, markers, tiles, and detail content are future work. Search, filters, geolocation, accounts, a backend, and deployment are outside this phase.

## Decisions

- Both JSON files are unchanged copies of the supplied sample. The app imports `src/data/parks.sample.json`. The brief names `assets/parks.sample.json`.
- Normalization requires a nonblank ID and name, trims text, and produces empty arrays for absent amenities and images. Invalid or incomplete coordinate pairs are discarded together. The park and any usable address are retained.
- `App` owns the selected ID. Map and list receive the same collection, selected ID, and selection callback. Details receives the matching park and a close callback. Each feature can be developed in its component folder.
- Brian has two open UX decisions for the details feature: whether to omit missing fields or label them “Not provided”, and what mobile Close/Back should return to after a list or marker selection.

## Known issues

The sample image URLs are placeholders. The details feature will need to handle a failed image load as well as an empty image array. The map feature will need to handle unavailable tiles while keeping the list and details usable.

## How it was checked

- `npm run build`, `npm test`, `npm run typecheck`, and `npm run lint` passed with Node.js 24.20.0 and npm 11.19.0.
- All 18 tests passed. They cover the sample's missing values, string cleanup, invalid and boundary coordinates, and rendering the three named regions with the full collection.
- SHA-256 hashes matched for the supplied JSON and both repository copies.
- A headless Chrome check of the production build measured the panes side by side at 1280 CSS pixels and stacked at 375, with no horizontal overflow at either width.

## Time spent

Approximately 3 minutes of elapsed scaffold and verification time in this session. This excludes prior planning and subsequent feature work.

## Next steps

1. **feature/map** — Use React Leaflet and OpenStreetMap tiles. Fit bounds to valid markers, connect marker selection to details, distinguish the selected marker, and handle tile failure. The map should work without a location prompt.
2. **feature/list** — Render a count and a name-sorted semantic list of buttons. Support keyboard selection, visible focus, and an accessible current-park indication.
3. **feature/details** — Show supplied fields, humanize amenity slugs, preserve hours as written, and handle missing fields and failed images. Focus the heading on selection and support mobile Close/Back.
4. After integration, exercise both selection paths on a phone and desktop, including keyboard-only use, focus movement, image failure, and tile failure.
