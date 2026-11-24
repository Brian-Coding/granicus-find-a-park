Implemented the UX fixes on `feature/ux-fixes` and left the changes uncommitted.

- **Layout and navigation.** Desktop shows the list on the left and the map above details on the right. The DOM order is list → details → map, so keyboard users reach details before the 12 markers. At `44rem` and below, the visual order matches the DOM.
- **Selection and Back.** Selecting or reselecting a park focuses its details heading and scrolls it into view. **Back to list** focuses and scrolls to that park’s list button while preserving the details, highlighted row, and selected marker. Both paths use instant scrolling with `block: 'nearest'`. The empty state does not scroll.
- **Map.** Changing or clearing selection closes a stale popup. Back preserves the selected park’s open popup. Markers and the focusable map container have a `3px solid #1853a0` focus-visible outline with a `3px` offset. The popup’s **View details** button has a `44px` minimum height.

**Files changed:** `src/App.tsx`, `src/App.test.tsx`, `src/styles.css`, `src/components/ParkDetails/ParkDetails.tsx`, `src/components/ParkMap/ParkMap.tsx`, `src/components/ParkMap/ParkMap.css`, and `README.md`. The README records the new behavior and all three requested known issues.

| Command | Result |
|---|---|
| `npm run typecheck` | Passed, exit 0 |
| `npm run lint` | Passed, exit 0 |
| `npm test` | **74 tests passed across 6 files**, exit 0 |
| `npm run build` | Production build passed, exit 0 |

The new popup regression test uses real Leaflet in jsdom. `git diff --check` passed, and all seven edited files passed the UTF-8 BOM check.

Live desktop and phone-width visual verification remains outstanding. Headless Chrome failed to start reliably, and the browser access host was unavailable. The preview server was stopped. Workspace policy blocked cleanup of two temporary Chrome profiles outside the repository.