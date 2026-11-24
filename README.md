# Find a Park

Find a Park helps NYC residents browse 12 sample parks, select one from a list or map, and read its details. The app loads the bundled dataset in the browser and needs no backend.

## Run

Developed and checked with Node.js 24.20.0 and npm 11.19.0. For Node 20 or 22, the locked tools require at least 20.19 or 22.13, respectively. OpenStreetMap tiles need no API key.

- `npm install` installs the dependencies.
- `npm run dev` starts the app. Open the local URL Vite prints.
- `npm test` runs the test suite once.
- `npm run build` creates the production build. Run `npm run preview` to serve it locally.
- `npm run lint` and `npm run typecheck` run ESLint and TypeScript checks.

## What works

- The map fits the parks on load. Click a marker or its **View details** popup button to select a park. The selected marker grows, and the app never requests your location.
- Tab through the alphabetical list and press Enter or Space to select a park. Keyboard focus has a visible ring. An inset bar and `aria-current` identify the selected list button.
- Selection moves focus to the details heading. **Back to list** returns focus to the selected park’s button, including after selection from the map.
- The list and details sit beside the map on desktop. At widths of 44rem or less, the panels stack.
- Supplied photos load lazily. Failed photos disappear individually. If none remain, a single illustration has a visible **Placeholder** label and a caption explaining whether the photos failed or none were supplied.

## Architecture

`App` imports `src/data/parks.sample.json`, runs each record through `normalizePark`, and owns `selectedParkId`. `ParkList` and `ParkMap` share the same parks, selected ID, and selection callback. `App` looks up the current record for `ParkDetails`. Keeping just the ID synchronizes both selection paths and avoids stale copies or a separate store.

Each feature folder holds its component, CSS, and tests. The shared `Park` type and selection props let the features develop in parallel. The pure `parksWithCoordinates` helper is tested independently of Leaflet. Native buttons in a `<ul>` provide Tab, Enter, and Space behavior without a custom ARIA listbox.

## Decisions & assumptions

- Brian chose NYC from the sample addresses and kept the supplied JSON unchanged. The map uses the original points.
- Every park shows Hours, Address, Description, Amenities, Acreage, Rating, and Photos in that order so residents can find the same facts each time. Missing facts read “Not provided.” A missing list address reads “Address not provided.”
- Hours come first in a highlighted block and preserve the supplied wording. Free text such as “Dawn to dusk” and “24 hours” is displayed without inferring an “open now” status.
- The generated illustration carries its own label so residents can distinguish it from a park photo.

## Data quality findings

- **One exact match.** Prospect Park’s sample point is about 230 m from its reference point. Riverside Commons and Sunset Playground have plausible address matches to Riverside Park and Sunset Park Playground, respectively, under unofficial sample names.
- **Nine parks have no defensible match.** Cedar Hill Nature Preserve uses the generic NYC City Hall point (`40.7128, -74.006`). Hillcrest Skate Park lands on the Brooklyn Bridge Marriott. East Ridge Trailhead lands on a residential block in Bronxdale. The researched coordinates are reference material only. [Research notes](docs/coordinates.md) · [Reference JSON](src/data/parkCoordinates.reference.json)
- Highland Dog Park lacks an address, Old Mill Botanical Garden has a null description, and Cedar Hill has a null rating. Each gets the corresponding missing-field label. Cedar Hill and East Ridge have empty image arrays and show “No photos provided.”

## Left out

Search, filters, current location, URL deep links (`?park=id`), a backend, and deployment.

## Known issues

- All supplied photo URLs point to `images.example.com`. These placeholder URLs yield the “Photo unavailable” illustration when loading fails.
- Missing tiles leave grey areas on the map without an explanatory message. The list and details still work.
- The list is the primary keyboard path. A formal screen-reader and WCAG audit is still outstanding.
- Most sample points lack a verified park match and are unsuitable for navigation.

## How it was checked

- All 73 unit and component tests passed across six files. The list tests use `@testing-library/user-event` for Tab, Enter, and Space. Photo tests dispatch errors without using the network.
- `npm run lint`, `npm run typecheck`, and `npm run build` passed.
- Grok Bot reviewed each PR before merge. Review replaced a direct focus-and-click test with keyboard input, caught UTF-8 BOMs from Windows tooling, fixed a layout shift on list selection, and added focus restoration on Back.
- Brian tested the app manually on localhost.

Automated UI/accessibility review: results to be added

## AI usage

Grok Bot orchestrated the work. Codex CLI (`gpt-6.2-astra`, high reasoning effort) created the scaffold, then ran parallel sessions for `feature/map`, `feature/list`, and `feature/details`, followed by polish and revision sessions. Full unredacted session logs accompany the submission in its `ai-logs` folder outside this repository.

## Time spent

Started 2:54 PM CT, 24 Nov 2026.

Total: TBD (target ≤ 2h)

## Next steps before public use

- Connect a real parks API, retain normalization, and add loading and error states in `App`. Verify coordinates and source real park photos.
- Add deep links (`?park=id`), search, and filters. Derive the matching parks in `App` and pass them to both the map and list.
- Audit the selection and return paths with NVDA and VoiceOver. Complete an analytics-free privacy review.
- Arrange hosting and CI. Select a production tile provider with an SLA and usage terms that fit expected traffic.
