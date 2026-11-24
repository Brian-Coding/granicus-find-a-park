# Revision: match visual and Tab order on feature/ux-fixes

You are Codex, working on a timed take-home interview exercise for Granicus. Stay professional and on-task. Minimal, focused changes only. No new npm dependencies. Do not commit or push. Leave version control to the operator. Windows machine; use PowerShell-friendly commands. Strip any UTF-8 BOM you introduce.

## Paths

- Working directory (already on branch `feature/ux-fixes`): `C:\Users\brian\granicus-takehome\wt-ux`
- Do not touch any other worktree or `C:\Users\brian\granicus-takehome\granicus-find-a-park`. Do not start or stop a dev server on port 5173.

## Requested changes (do only these)

A review of PR #7 asked for one accessibility fix plus two small follow-ups.

### 1. DOM order must match visual order (required)

Today `src/App.tsx` renders list, then a wrapper with details then map, and `src/styles.css` uses `flex-direction: column-reverse` so the desktop visual order is map above details. That makes Tab order (details before map) disagree with the visual order (map above details). A keyboard user on the details panel who presses Tab jumps up the screen into the map. That fails WCAG 2.4.3 Focus Order and 1.3.2 Meaningful Sequence.

Fix:

- Put the DOM order as **list, map, details**.
- Drop `column-reverse` (and any other visual reordering such as `order` or `row-reverse` that would desync Tab and visual order). A simple two-column grid is fine: list in the left column, map then details stacked in the right column. On phone (`max-width: 44rem`), a single column should naturally be list, then map, then details.
- That phone order is acceptable: selecting a park already focuses the details heading and scrolls it into view.

Update any tests or README lines that describe the panel order (in particular the "What works" sentence that currently says narrow viewports stack as list, details, map). Do not invent other README changes. Leave `Automated UI/accessibility review: results to be added` and `Total: TBD (target ≤ 2h)` exactly as they are. If you mention a test count, use the number from your final `npm test` run.

Existing focus-on-selection, Back-to-list (keep selection, restore focus, scroll list into view), popup-close-on-selection-change, 44px View details button, and marker focus ring must keep working.

### 2. scrollIntoView behavior (required)

In `focusAndScrollTo` (and anywhere else you scroll), use `behavior: 'auto'` instead of `'instant'`. Same effect, wider support. Keep `block: 'nearest'` (or `'start'` if already used).

### 3. Marker focus outline clipping (check, then fix only if real)

Please check whether the `:focus-visible` outline on `.leaflet-marker-icon` is clipped by Leaflet's `overflow: hidden` (or similar) on the map pane/container. Methods: inspect computed overflow on `.leaflet-container`, `.leaflet-pane`, `.leaflet-marker-pane`, and `.park-map` in the CSS and in Leaflet's stylesheet; you may also reason from a quick local render if that is reliable in this environment. Do not start a long-lived server on port 5173.

- If clipping is real (or clearly likely because a parent with overflow hidden would crop a 3px outline-offset), fix it: drop `outline-offset` to `0`, or use a negative offset, whichever keeps a clearly visible 3px `#1853a0` ring without being cropped.
- If it is not clipped, leave the 3px offset as it is.
- Say clearly in your final message whether clipping was real and what you changed or left alone.

## Allowed files

- `src/App.tsx`, `src/styles.css`
- `src/components/ParkDetails/` and `src/components/ParkMap/` only if needed for the scroll behavior or outline fix
- Tests that break because of the order change
- `README.md` only for order wording (and test count if it is already stated and your run changes it)

Do not change sample data, architecture, Back-to-list semantics, or add features.

## Verification (required before you finish)

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

All must pass. Confirm edited files have no UTF-8 BOM.

## Final message

Include: files changed; confirmation that DOM and visual order now match on desktop and phone (list, map, details); scroll behavior change; whether outline clipping was real and what you did; exact command results and test count.
