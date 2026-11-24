## What

Fixes from desktop (1280px) and phone (375px) testing, plus Brian's Back-to-list decision.

- **Layout.** On desktop the list is on the left; the map sits above the details on the right. DOM order is list → details → map so keyboard users reach details before the markers. CSS grid + `flex-direction: column-reverse` places the map visually above the details. On viewports `44rem` and below, the panels stack as list, details, map. Selecting a park focuses the details heading and scrolls it into view (`block: 'nearest'`).
- **Back to list keeps the park selected.** It only moves focus to that park's list button and scrolls it into view. The details panel, highlighted list row, and selected marker stay.
- **Stale popup.** An open marker popup closes when `selectedParkId` changes to a different park (or is cleared). Back does not close the selected park's popup.
- **Focus rings.** `.leaflet-marker-icon` and the focusable map container get a `3px solid #1853a0` `:focus-visible` outline with a `3px` offset.
- **View details** in the popup is at least 44px tall. Leaflet zoom and close controls are unchanged and documented as known issues.

README What works and Known issues are updated. Leaflet zoom/close under 44px, the long Tab path with no skip link, and the wrapping Back button are listed. Automated UI review and total time placeholders are unchanged.

## How tested

Re-ran independently in this worktree after Codex finished (all passed):

- `npm run typecheck`
- `npm run lint`
- `npm test` — **74 tests across 6 files**, including Back keeping the selection and a jsdom test that a list selection closes the previous marker popup
- `npm run build`

## Notes

Live desktop/phone visual verification of the new grid still belongs in the manual pass. The 3px marker outline may be clipped if Leaflet's map pane uses `overflow: hidden`.
