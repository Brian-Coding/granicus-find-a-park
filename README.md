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
- Selecting a park focuses its details heading and scrolls it into view. On phone-width screens (44rem and below), the details panel scrolls to the top so the hours are visible. **Back to list** returns focus to that park’s list button and scrolls it into view. The park stays selected.
- On desktop, the list is on the left, with the map then the details stacked on the right. At widths of 44rem or less, the panels stack in list, map, details order.
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
- Leaflet’s default zoom and popup close buttons are under 44px tall.
- About 25 Tab stops precede the zoom controls, including 12 list buttons and then 12 markers. There is no skip link. The list is the primary keyboard path.
- **Back to list** wraps below long park names when space is tight.
- Most sample coordinates are fictional or unverified and are unsuitable for navigation. See [docs/coordinates.md](docs/coordinates.md).
- No formal screen-reader or WCAG audit has been done.

## How it was checked

- All 75 unit and component tests passed across six files. The list tests use `@testing-library/user-event` for Tab, Enter, and Space. Photo tests dispatch errors without using the network.
- `npm run lint`, `npm run typecheck`, and `npm run build` passed.
- Grok Bot reviewed each PR before merge. Review replaced a direct focus-and-click test with keyboard input, caught UTF-8 BOMs from Windows tooling, fixed a layout shift on list selection, and added focus restoration on Back.

### Automated UI/accessibility review

- Brian tested manually with only the keyboard on localhost and found that it all works.
- Grok Bot ran browser-driven tests in a real Chrome at 1280px desktop, at 375px phone width (DevTools emulation), and at 200% zoom, plus a headless Playwright check at 375px.
- Pass 1 passed: no keyboard trap; Enter/Space select; focus moves to the details heading; Back returns focus; no “undefined”/“null”/“NaN”; reflow at 200% and 375px with no horizontal scroll.
- Pass 1 found these issues, all fixed in PRs #6–#8: details were below the 12-item list (moved under the map); a stale map popup stayed open after list selection; marker focus ring was weak and later clipped by Leaflet overflow; duplicate placeholder images; popup button under 44px; phone tap didn’t bring details into view; Back cleared the selection (now keeps it, per product decision).
- Grok’s PR review caught a WCAG 2.4.3 focus-order issue: CSS `column-reverse` made the visual order differ from the Tab order. It was fixed by matching the DOM order.
- A regression pass on the final build confirmed every fix.
- The two console errors are the sample data’s unreachable `images.example.com` photos, which are expected and handled.

## AI usage

Grok Bot orchestrated the work. Codex CLI (`gpt-6.2-astra`, high reasoning effort) created the scaffold, then ran parallel sessions for `feature/map`, `feature/list`, and `feature/details`, followed by polish and revision sessions. Each pull request was reviewed before merge.

The full, unredacted Codex logs (JSONL event streams, final messages, and stderr) and every prompt are in `ai-logs/` in this repository, indexed by `ai-logs/README.md`. The orchestration chat with Grok Bot (which planned the work, ran the Codex sessions, reviewed every PR, and ran the browser tests) is exported separately with the submission.

## Time spent

About 70 minutes (started just before 3:00 PM CT, finished about 4:10 PM CT, on Nov 24, 2026).

## Next steps before public use

- Connect a real parks API, retain normalization, and add loading and error states in `App`. Verify coordinates and source real park photos.
- Add deep links (`?park=id`), search, and filters. Derive the matching parks in `App` and pass them to both the map and list.
- Audit the selection and return paths with NVDA and VoiceOver. Complete an analytics-free privacy review.
- Arrange hosting and CI. Select a production tile provider with an SLA and usage terms that fit expected traffic.
