## What
Implements the park map on `feature/map` only. `ParkMap` renders a react-leaflet `MapContainer` with attributed OpenStreetMap tiles, one marker per park with a valid normalized coordinate pair, and a short note when some parks cannot be plotted. The map fits all markers on load (NYC-area fallback if none). Clicking a marker or its "View details" button calls `onSelectPark`. The selected marker is larger and recolored, and the map pans to it when the selected id changes. Marker icon URLs are imported explicitly so Vite resolves them. No geolocation is used. `App.tsx` and `src/styles.css` were not changed.

## How tested
Independently re-ran in the `wt-map` worktree (all passed):
- `npm run typecheck`
- `npm run lint`
- `npm test` — 32 tests passed (3 files), including `parksWithCoordinates` coverage for missing, incomplete, invalid, boundary, and address-only locations
- `npm run build`

Codex also smoke-tested the production build in headless Chrome, including with tile requests blocked.

## Known gaps
- The current sample appears to include coordinates for all 12 parks, so the "no map location" note is implemented but not visible until a park lacks coords.
- List-driven selection panning still needs an end-to-end check after `feature/list` merges (the list is still a placeholder on this branch).
- Failed tiles show blank/gray tiles rather than a custom error banner; the rest of the app should remain usable.
- Initial bounds are applied on MapContainer mount; parks in this app are static.
