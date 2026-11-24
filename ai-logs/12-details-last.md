Implemented park details on `feature/details`. All four required checks passed.

| Command | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | 31 tests passed across 4 files |
| `npm run build` | Production build succeeded |

**Files changed** under `src/components/ParkDetails/` only. Updated [ParkDetails.tsx](./src/components/ParkDetails/ParkDetails.tsx) and added [ParkDetails.css](./src/components/ParkDetails/ParkDetails.css), [formatAmenity.ts](./src/components/ParkDetails/formatAmenity.ts), [ParkDetails.test.tsx](./src/components/ParkDetails/ParkDetails.test.tsx), and [formatAmenity.test.ts](./src/components/ParkDetails/formatAmenity.test.ts). `App.tsx`, `App.test.tsx`, and `src/styles.css` were untouched. No dependencies, commits, or pushes.

**Behavior verified**

- Selecting a park focuses its name heading. The initial empty state leaves focus alone, and re-rendering the same park preserves the user’s current focus.
- Missing address or hours display “Not provided.” Other missing facts are omitted. Tests cover literal `null` and `undefined` leaks, `0 acres`, `1 acre`, and `0 out of 5`.
- Each photo loads lazily with park-specific alt text. A load error replaces only that image with an “Image unavailable” block, so there is no fallback request loop. Parks with no photos omit the gallery.

**Integration check:** “Back to list” calls `onClose`. After the branches are combined, verify that App/list restores keyboard focus to the previously selected list item.