# Granicus "Find a Park" take-home — feature/map

You are Codex, working on a timed take-home interview exercise (90 minutes to 2 hours total for the whole submission). This session is the **map feature only**. Two sibling sessions are implementing the list and details features in parallel on other branches and worktrees. Stay in this worktree and this branch.

This chat and all logs will be submitted to Granicus. Stay professional and on-task. This is a small app; do not over-engineer it. Search, filters, and geolocation are out of scope.

## Paths

- Your working directory (already a git worktree on `feature/map`, dependencies already installed): `C:\Users\brian\granicus-takehome\wt-map`
- Brief text extract (OUTSIDE the repo — read it; never copy the brief into the repo): `C:\Users\brian\granicus-takehome\brief\brief.txt`
- Brief PDF (same sibling folder): `C:\Users\brian\granicus-takehome\brief\brief.pdf`

Read these files first, then implement:

- `C:\Users\brian\granicus-takehome\brief\brief.txt`
- `README.md`
- `src/types.ts`
- `src/data/normalizePark.ts`
- `src/App.tsx`
- `src/components/ParkMap/ParkMap.tsx`
- `src/styles.css`

`App.tsx` already owns `selectedParkId` and already passes `{ parks, selectedParkId, onSelectPark }` into `ParkMap`. You should not need to change that wiring.

## Implement `src/components/ParkMap` only

Implement the real map in the existing `ParkMap` component folder. You may add:

- `src/components/ParkMap/ParkMap.tsx` (replace the placeholder)
- a co-located CSS file imported by the component (for example `ParkMap.css`)
- a co-located test file and a small pure helper module if that keeps tests and the component readable (for example `parksWithCoordinates.ts` / `ParkMap.test.ts`)

Do **not** edit `ParkList`, `ParkDetails`, `normalizePark.ts`, `types.ts`, sample JSON, or other feature folders. Do **not** edit `App.tsx` or `src/styles.css` except the minimum needed to wire props — and if you do touch them, say so clearly in your final message and keep the change tiny. Prefer putting map styles in the component CSS file. Do **not** edit the README (sibling branches will also touch it; the operator will update it after integration). Do not commit or push. Leave version control to the operator.

## Requirements

- Use `react-leaflet` `MapContainer` with OpenStreetMap tiles and proper attribution.
- Import `leaflet/dist/leaflet.css`.
- Fix Leaflet's default marker icon paths for Vite by importing the icon images explicitly (the default marker icons break in Vite builds unless the image URLs are set this way). Also fix or replace the icon for the selected marker the same way.
- One marker per park that has a valid normalized coordinate pair. Parks without coords are simply skipped.
- The map shows a small note when some parks cannot be plotted, for example: "1 park has no map location; see the list" (use correct singular/plural).
- Fit bounds to all markers on load. Use a sensible fallback center and zoom if there are zero markers (the NYC-area sample is a reasonable fallback).
- Clicking a marker calls `onSelectPark(id)`.
- The selected park's marker is visually distinct (different icon/color or class) and the map pans to it when selection changes from the list.
- Each marker has an accessible title/alt with the park name.
- A popup or tooltip shows the park name plus a "View details" button that selects the park.
- Never call geolocation. Do not request the resident's location.
- A tile load failure must not break the rest of the app (list and details stay usable). Do not add a custom error UI unless it is a small, local note; the important part is that a failed tile request must not crash React.
- Give the map container a clear `aria-label` such as "Map of parks". The list is the keyboard alternative, so do **not** build custom keyboard navigation for markers.
- Keep the code small and readable. No new dependencies beyond what is already in `package.json` unless truly essential. No state library, router, CSS framework, search, filters, or geolocation.

## Tests

Add Vitest test(s) for the marker filtering logic as a **pure function** (for example `parksWithCoordinates`) rather than full Leaflet rendering in jsdom. Cover:

- parks with a valid lat/lng pair are included
- parks missing location, or missing/invalid lat or lng, are excluded
- at least one case derived from how `normalizePark` represents incomplete coordinates (address only, no lat/lng)

Existing `App.test.tsx` asserts a "Park map" region. Keep a labeled region or equivalent so that test still passes (the placeholder already uses `aria-labelledby="park-map-heading"` / heading "Park map").

## Verification (required before you finish)

Run all of these and make them pass:

```
npm run typecheck
npm run lint
npm test
npm run build
```

Fix issues you introduce. Do not leave the worktree in a broken install/build/test state.

## Final message

Include:

1. What you implemented and where.
2. Whether you edited `App.tsx` or `src/styles.css` (and why, if so).
3. The exact commands you ran and their results.
4. Known gaps or anything a reviewer should look at closely (Leaflet icon fix, effect dependencies for fitting/panning, cleanup/memory leaks, accessibility labels).
5. Anything you were unsure about.

## Constraints

- Windows machine. Use PowerShell-friendly commands.
- Do not `git commit` or `git push`.
- Do not copy `brief.pdf`, `brief.txt`, or `ai-logs` into the repo.
- Do not include secrets or tokens.
- Do not invent parks or fill missing sample fields.
- Stay on `feature/map` in this worktree. Do not switch branches or touch sibling worktrees.
