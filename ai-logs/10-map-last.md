Implemented the map on `feature/map`. All four changed files are in [src/components/ParkMap](C:/Users/brian/granicus-takehome/wt-map/src/components/ParkMap). I did not edit `App.tsx` or `src/styles.css`, commit, or push.

The map uses attributed OpenStreetMap tiles and fits all valid markers on load. It falls back to an NYC view when none can be plotted and shows a count when parks are missing coordinates. Clicking a marker or its **View details** button selects the park. Selection pans to the marker and distinguishes it by size and color. Both marker styles use explicitly imported Leaflet images so Vite resolves their URLs.

| Verification command | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | All 32 tests passed, including address-only, incomplete, invalid, and boundary coordinate cases |
| `npm run build` | Production build passed |
| `git diff --check` | Passed |

A headless Chrome check of the production build confirmed that all 12 marker icons loaded, fit inside the map, and had matching park-name titles and alt text at viewport widths of 1264 and 500 pixels. With tile requests blocked, selecting Prospect Park still opened its popup and updated the details region. The map element had the **Map of parks** label.

**Integration check remaining:** The list is a placeholder on this branch, so list-driven selection still needs an end-to-end check after merge. Initial bounds are applied on mount. The pan effect depends on the map and selected coordinates, so unrelated renders preserve the resident’s view. React Leaflet manages map and marker cleanup.