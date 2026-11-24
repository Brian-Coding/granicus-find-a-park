Implemented the park details polish on `feature/details-polish`. All four required checks passed.

Every selected park shows Hours, Address, Description, Amenities, Acreage, Rating, and Photos in that order. Hours appear once beneath the park header, with a bold label and larger text on a pale green background. The panel preserves the supplied wording, displays “Not provided” for missing facts, and handles `0 acres`, `1 acre`, and `0 out of 5`. Amenities use sentence case and preserve `WiFi`.

Real photos retain their descriptive alt text and lazy loading. If a photo fails, the same `<img>` switches once to the original 574-byte park illustration, updates its alt text, and shows **Photo unavailable**. The error handler is then disabled. A park with no photos shows one illustration captioned **No photos provided**. Selecting another park starts with fresh photos.

Missing values use the panel’s dark text, and captions use dark gray on white. **Back to list** has a dedicated 3px blue focus outline with a 3px offset. It still calls `onClose`. Restoring focus to the list remains App/list integration work.

| Command | Final result |
|---|---|
| `npm run typecheck` | Exit 0, no diagnostics |
| `npm run lint` | Exit 0, no warnings or errors |
| `npm test` | Exit 0, all 48 tests passed across 4 files, including field-order checks for all 12 sample parks |
| `npm run build` | Exit 0, Vite transformed 24 modules and built in 115 ms |

**Files changed:** `ParkDetails.tsx`, `ParkDetails.css`, `ParkDetails.test.tsx`, `formatAmenity.ts`, and `formatAmenity.test.ts` under `src/components/ParkDetails/`, plus the new `src/assets/park-placeholder.svg`.

I did not edit `App.tsx`, `src/styles.css`, ParkMap, or ParkList, add dependencies, commit, or push. Git reports the worktree is two commits behind `origin/develop`.