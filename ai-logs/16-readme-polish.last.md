ParkDetails now removes each failed photo while preserving the original numbering and alt text of the remaining photos. If all photos fail or none were supplied, the panel shows **exactly one illustration** with a visible **Placeholder** label and either “Photo unavailable” or “No photos provided.” The illustration has no error handler, so an error cannot reset its `src` or create a retry loop. Selecting another park starts with fresh photo state.

| Verification | Final result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | **73 tests passed across 6 files** |
| `npm run build` | Passed, 72 modules transformed |

Changed only `README.md`, `package.json`, `ParkDetails.tsx`, `ParkDetails.css`, and `ParkDetails.test.tsx`. The only package change was adding the missing `"preview": "vite preview"` script. All five files were verified as UTF-8 without a BOM. App.tsx, ParkList, ParkMap, and the sample data were untouched. No commit or push was made.

The rewritten README gives the locked tools’ Node minimums and describes sample photo failures without claiming a live network check. Brian’s manual testing, AI session details, review process, start time, and external log location are documented from the supplied project history. The automated accessibility review and total time remain open as requested.