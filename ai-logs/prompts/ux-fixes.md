# Feature: UX fixes from desktop and phone testing (`feature/ux-fixes`)

You are Codex, working on a timed take-home interview exercise for Granicus. This chat and all logs will be submitted. Stay professional and on-task. This is a small app; do not over-engineer it. No new npm dependencies. Minimal, focused changes only.

Do not commit or push. Leave version control to the operator. Windows machine; use PowerShell-friendly commands. If any file you write or edit gets a UTF-8 BOM, strip it before you finish (Windows tooling sometimes adds one).

## Paths

- Working directory (git worktree, branch `feature/ux-fixes`, based on `origin/develop` at `d31ffc7`): `C:\Users\brian\granicus-takehome\wt-ux`
- Brief text (OUTSIDE the repo; read if useful; never copy it into the repo): `C:\Users\brian\granicus-takehome\brief\brief.txt`

## Allowed files

You may change what you need in:

- `src/App.tsx`, `src/App.test.tsx`, `src/styles.css`
- `src/components/ParkDetails/` (tsx, css, tests) if required for scroll-into-view or header layout
- `src/components/ParkMap/` (tsx, css, and tests if you add them)
- `src/components/ParkList/` only if needed so Back can scroll the list into view (e.g. a ref/id on the list section)
- `README.md` (What works layout sentence, and Known issues as specified below)

Do not change sample JSON, coordinate research, the placeholder image, normalizePark, formatAmenity, or package.json. Do not add dependencies.

---

## 1. Desktop layout: details under the map (Brian's product decision)

Today the list and details share a left sidebar, and the area under the map is empty. On desktop (two columns, current breakpoint `44rem`):

- Left column: the park list only.
- Right column: the map on top, park details directly under the map.

Phone / narrow view (`max-width: 44rem`) stays one column. When a park is selected, its details must come into view. The existing focus move to the details heading may already scroll it into view for keyboard users. Also scroll the details panel (or its heading) into view on mouse or tap selection, using `scrollIntoView` with `block: 'nearest'` or `'start'`. If you use `behavior: 'smooth'`, respect `prefers-reduced-motion: reduce` and use `'auto'` / instant scrolling in that case. Do not scroll when nothing is selected (the empty details state).

**DOM order:** Keep it sensible for keyboard users. **List, then details, then map is acceptable** (and recommended) if CSS grid places them visually as list | (map above details) on desktop. That way Tab goes through the list and then details without first hitting every map marker. Justify your choice briefly in the final message. On a phone, list then details then map also means the map is not stuck between the list and the details.

Selection still moves focus to the details heading. See item 6 for the new Back behavior — focus return must keep working.

Update the README "What works" sentence that currently says the list and details sit beside the map.

## 2. Stale map popup

Selecting a park from the list leaves the previous park's Leaflet popup open. When `selectedParkId` changes, either close any open popup, or open the popup for the newly selected marker. Pick the simpler option that keeps the map and details in sync. Close any open popup when the selection is cleared (`selectedParkId` is null). Do not add a location prompt. Do not change tile or fit-bounds behavior.

Leaflet often does not run well in jsdom. If you can add a cheap, reliable test for "popup closes or follows the selection" without brittle map mocking, do so (for example a small helper or a child component that is unit-testable). If it is not reasonably testable in jsdom, skip the test and say so. Do not add new dependencies or a heavy Leaflet mock just for this.

## 3. Marker focus ring

Leaflet marker icons get a weak or invisible ring when focused. Add a clear `:focus-visible` outline for `.leaflet-marker-icon` matching the list: `3px solid #1853a0` with `outline-offset: 3px`. If the map container itself is focusable, give it the same visible ring. Do not remove outlines. Do not restyle Leaflet's zoom or attribution controls except as needed to avoid clipping the marker ring (only if you must).

## 4. "View details" touch target

The popup **View details** button must be at least 44px tall (`min-height: 44px` is fine). Leave Leaflet's own zoom and close controls alone; they will be listed in the README as known issues.

## 5. "Back to list" keeps the park selected (Brian's product decision — this overrides the current `closeDetails` behavior)

**Do not call `setSelectedParkId(null)` when the user activates "Back to list".** The button must only move focus back to that park's list button (`park-list-button-${id}`, already used today) and scroll that list button (or the list) into view on phone, again using `scrollIntoView` with `block: 'nearest'` or `'start'` and respecting `prefers-reduced-motion`.

After Back:

- The details panel stays open on the same park.
- The list row stays highlighted (`aria-current` and the inset bar).
- The selected (larger / recolored) map marker stays selected.
- Any popup behavior from item 2 should stay consistent with the still-selected park (do not treat Back as a clear).

There is no need to add a separate "deselect" control in this pass.

Update tests to match. In particular, `src/App.test.tsx` currently asserts that after Back the details region matches `/no park selected/i`. That is now wrong. After Back, focus is on the park's list button and the details heading / content for that park is still present. Keep coverage that focus moves to the details heading on selection, Tab reaches Back, and Enter/click on Back returns focus to the same list button. Adjust ParkDetails tests only if they assumed Back unmounts or clears the park (today `onClose` is just a callback; the parent owns the new meaning).

## 6. README Known issues

Update Known issues with these remaining items (word them clearly and truthfully):

- Leaflet zoom and close buttons are under 44px (left as Leaflet defaults).
- About 25 Tab stops before the zoom controls (12 list buttons, then 12 markers), and there is no skip link.
- The "Back to list" button wraps under long park names.

**Do not** add "Back clears the selection" — that is no longer true and must not appear.

Leave these two lines/values exactly as they are, to be filled in later:

- `Automated UI/accessibility review: results to be added`
- `Total: TBD (target ≤ 2h)`

You may also lightly adjust "What works" so it describes the new desktop layout and the new Back behavior (focus returns to the list button; the park stays selected). Do not invent test counts; if you mention a test count, use the number from your final `npm test` run. Do not change Time spent, AI usage, or the automated-review placeholder.

---

## Verification (required before you finish)

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

All must pass. Fix anything you break. Confirm edited files have no UTF-8 BOM.

## Final message

Include:

- Files changed and a brief justification of DOM order vs visual placement.
- How selection scroll, Back-to-list (no clear, focus + scroll), popup sync, focus rings, and the 44px View details button work.
- Whether you added a popup test, or why you skipped it.
- Exact command results and the final test count.
- Any claim you could not verify, or any product ambiguity you resolved.
