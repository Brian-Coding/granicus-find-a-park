DOM, visual, and Tab order now match on desktop and phone: **list → map → details**. Desktop keeps the list on the left and the map above details on the right. At 44rem and below, all three stack in that order. Updated [App.tsx](src/App.tsx), [styles.css](src/styles.css), and the order wording in [README.md](README.md).

Selection and **Back to list** now scroll with `behavior: 'auto'` and retain `block: 'nearest'`. Updated [ParkDetails.tsx](src/components/ParkDetails/ParkDetails.tsx).

Marker outline clipping is real at the map edge. Leaflet’s `.leaflet-container` uses `overflow: hidden`, which clips an outward ring. The marker’s 3px `#1853a0` ring now uses `outline-offset: -3px` to draw inside the icon. Updated [ParkMap.css](src/components/ParkMap/ParkMap.css).

| Command | Result |
|---|---|
| `npm run typecheck` | Passed, exit 0 |
| `npm run lint` | Passed, exit 0 |
| `npm test` | 74 tests passed across 6 files, exit 0 |
| `npm run build` | Production build succeeded, exit 0 |

Confirmed all five edited files are free of UTF-8 BOMs.