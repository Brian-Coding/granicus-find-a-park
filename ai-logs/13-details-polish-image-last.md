Generated the raster placeholder with the built-in image generation tool and saved it at `src/assets/park-placeholder.webp`. The verified WebP is **1200 × 800 pixels, 144.7 KB (144,700 bytes)**. The panel and tests now import it, and the unused SVG was removed.

The one-time image swap remains loop-proof. Alt text and visible captions are unchanged.

| Case | Alt text | Visible caption |
|---|---|---|
| Failed photo | `Placeholder illustration (photo unavailable)` | `Photo unavailable` |
| No photos | `Placeholder illustration (no photos provided)` | `No photos provided` |

| Command | Result |
|---|---|
| `npm run typecheck` | Exit 0, no diagnostics |
| `npm run lint` | Exit 0, no warnings or errors |
| `npm test` | Exit 0, all 48 tests passed across 4 files |
| `npm run build` | Exit 0, production build included the WebP |