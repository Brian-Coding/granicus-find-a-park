Selecting or reselecting a park at widths up to `44rem` now scrolls the details panel to the top with a `0.75rem` margin. Wider screens use `block: 'nearest'`. Both use `behavior: 'auto'` and focus the heading with `preventScroll: true`.

Back-to-list still focuses the selected park’s list button, scrolls it with `nearest` and `auto`, and keeps the park selected.

Changed `src/App.tsx`, `src/App.test.tsx`, `src/components/ParkDetails/ParkDetails.tsx`, and `src/components/ParkDetails/ParkDetails.css`. The App test mocks `matchMedia` at both widths and checks the scroll target, options, and focus for selection, Back, and reselection.

| Command | Result |
|---|---|
| `npm run typecheck` | Passed, exit 0 |
| `npm run lint` | Passed, exit 0 |
| `npm test` | 75 tests passed across 6 files, exit 0 |
| `npm run build` | Production build succeeded, exit 0 |

All four edited files were verified free of a UTF-8 BOM.