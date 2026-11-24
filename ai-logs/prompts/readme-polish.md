# Feature: collapse duplicate placeholders + rewrite README (`feature/readme-polish`)

You are Codex, working on a timed take-home interview exercise for Granicus. This chat and all logs will be submitted. Stay professional and on-task. This is a small app; do not over-engineer it. No new npm dependencies (adding a standard `"preview": "vite preview"` script to `package.json` is the only package.json change allowed, and only if that script is missing).

Do not commit or push. Leave version control to the operator. Windows machine; use PowerShell-friendly commands. If any file you write or edit gets a UTF-8 BOM, strip it before you finish (Windows tooling sometimes adds one).

## Paths

- Working directory (git worktree, branch `feature/readme-polish`, based on latest `develop` at `f4268a8`): `C:\Users\brian\granicus-takehome\wt-readme`
- Brief text (OUTSIDE the repo; read if useful; never copy it into the repo): `C:\Users\brian\granicus-takehome\brief\brief.txt`
- Coordinate research already in the repo: `docs/coordinates.md` and `src/data/parkCoordinates.reference.json`
- Current (stale, scaffold-era) README: `README.md` — replace it entirely.

## Allowed files only

You may change:

- `src/components/ParkDetails/ParkDetails.tsx`
- `src/components/ParkDetails/ParkDetails.css`
- `src/components/ParkDetails/ParkDetails.test.tsx`
- `README.md`
- `package.json` only to add `"preview": "vite preview"` if it is missing

Do not edit App.tsx, styles.css, ParkMap, ParkList, formatAmenity, normalizePark, sample JSON, the placeholder image asset, docs/coordinates.md, or other feature folders. Do not add new dependencies.

Normalized data reminder: blank/null strings are `undefined`; `amenities` and `images` are always arrays; numeric `0` for rating or acreage is a real value (`!= null`).

---

## 1. Collapse placeholder images in ParkDetails

Current behavior (the bug): `ParkPhoto` swaps each failed remote `src` to the same `park-placeholder.webp`. Prospect Park has two `images.example.com` URLs that always fail, so the details panel shows the same placeholder illustration twice.

Required behavior:

- When a park has image URLs, render them.
- Any URL that fails to load is **hidden** (do not leave a broken image, and do not replace each failure with its own copy of the placeholder).
- If **all** of a park's images fail, **or** the park has no images, show **exactly one** placeholder illustration (`src/assets/park-placeholder.webp`, already imported).
- Never show the same placeholder twice for one park.
- Keep an `onError` no-loop guarantee: the placeholder `<img>` must not swap or re-set its `src` if it itself errors. Failed remote images should be hidden, not repeatedly retried. Switching to another park must start fresh (no leftover unavailable caption or hidden state).
- Make the placeholder obviously a placeholder, so nobody thinks it is a real photo of the park:
  - Visible caption **and** a small "Placeholder" label overlaid on the image or placed directly under it (both is fine; at least one of the label/caption must be clearly visible in the UI, not only in alt text).
  - Alt / caption wording:
    - All provided photos failed: alt `Placeholder illustration — photo unavailable`, visible caption along the lines of "Placeholder illustration — photo unavailable" (a short visible "Placeholder" badge plus "Photo unavailable" is also fine, as long as both ideas are present and visible).
    - No photos in the data: alt `Placeholder illustration — no photos provided`, visible caption along the lines of "Placeholder illustration — no photos provided" (or "Placeholder" plus "No photos provided").
  - Do not use alt text that names the park as if this were a real photo. Real (successfully loaded) photos keep their existing meaningful alt, e.g. "Photo 1 of Prospect Park", and `loading="lazy"`.
- The Photos field itself stays present for every park (the consistent field list is unchanged: Hours, Address, Description, Amenities, Acreage, Rating, Photos). Hours stay first and prominent. "Not provided" rules for other fields are unchanged.

Suggested shape (you may implement equivalently): a small amount of state in the details photos area that records which remote images have failed; render only the ones that have not failed; if that set is empty, render a single separate placeholder figure. Do not fetch a second remote URL.

### Tests (update `ParkDetails.test.tsx`)

Keep `// @vitest-environment jsdom`. No new dependencies. Fire `error` events; do not rely on the network.

Must cover, in addition to keeping existing field/focus/Back coverage passing:

- **Prospect Park, both images fail:** start with the two real photo alts/src as today; fire `error` on both images; then there is **exactly one** `img` in the details, it is the placeholder, and the honest unavailable alt/caption/"Placeholder" label are present. There must not be two placeholders.
- **Mixed success:** a park with two image URLs; fire `error` only on the first; the failed image is gone; the second real image remains (original alt/src); **no** placeholder is shown.
- **Empty images:** Cedar Hill (empty `images`) still shows exactly one placeholder with the no-photos alt and a visible caption/label. It must not crash.
- **No-loop:** after the placeholder is showing (all-failed or empty case), firing `error` on the placeholder does not change `src`, does not throw, and does not add another image. A MutationObserver on `src` (as the current test does) is a good assertion.
- **Fresh state on park change:** after failures on Prospect, switching to Highland Dog Park shows Highland's real photo(s) with no leftover unavailable caption or placeholder (until those photos themselves fail).
- Existing tests that assumed "each failed photo is replaced in place by a placeholder" must be rewritten to match the new rules. Do not leave a failing test. Keep the all-fields-in-order test, Prospect supplied-facts test (before errors), Old Mill / Highland missing-field tests, zero/singular acreage tests, and focus / Back-to-list tests.

---

## 2. Rewrite README.md

Write a concise, scannable README for a Granicus reviewer. Replace the current scaffold-era README entirely. Use short paragraphs and bullet lists. Do not paste large code blocks. Do not invent features, tests, or tooling that are not in this worktree.

**Verify every claim against the code** (and against `docs/coordinates.md` for the coordinate section, and against the test run for the test count). If a suggested bullet below is not true, omit or rephrase it rather than stretching the truth. If `npm run preview` is documented, the script must actually exist (add the standard Vite script if missing).

Suggested sections, in this order:

### Overview

One paragraph: Find a Park is a small web app that helps NYC residents browse the supplied sample parks, pick one from a list or map, and read its details. It uses the bundled sample dataset; there is no backend.

### Run

- Prerequisites: Node 20+; developed on Node 24 (this machine has Node v24.20.0 and npm 11.19.0 — you may mention that).
- Commands to list: `npm install`, `npm run dev`, `npm test`, `npm run build`, `npm run preview`, `npm run lint`, `npm run typecheck`.
- No API keys needed (OpenStreetMap tiles). Tell the reviewer to open the local URL Vite prints.

### What works

Only list behavior you can point to in the code, for example:

- Map with selectable markers (click marker or "View details" in the popup); selected marker is larger (not color alone); map fits to parks on load; no geolocation / no location permission prompt.
- Keyboard-accessible park list (native `<button>`s in a `<ul>`), visible `:focus-visible` ring, selected item indicated with more than color and `aria-current`.
- Details show a consistent field set for every park; missing values say "Not provided" (never the literals `null` or `undefined`). Hours are shown exactly as given and placed first in a prominent block. List items with no address show "Address not provided".
- Focus moves to the details heading when a park is selected, and "Back to list" returns focus to that park's list button (this is in `App.closeDetails`, not only in ParkDetails — verify).
- Responsive two-pane desktop layout, stacked on narrow viewports (`styles.css`, breakpoint `44rem`).
- Placeholder image honesty: one labeled placeholder when photos are missing or all fail; never presented as a real photo of the park.

### Architecture

Cover:

- Data flow: `src/data/parks.sample.json` → `normalizePark` → `App` owns `selectedParkId` → `ParkList` / `ParkMap` / `ParkDetails`.
- Why one piece of state (map and list stay in sync; storing the id avoids stale copies; this app is too small for a store).
- Component-per-folder (component, CSS, tests) so features could be built in parallel against a shared contract (`Park` type and selection props).
- Pure `parksWithCoordinates` helper, tested without rendering Leaflet.
- Native buttons over a custom ARIA listbox, so Tab / Enter / Space work without hand-rolled keyboard behavior.

Keep this short. A simple mermaid flowchart is optional and welcome if it stays small.

### Decisions & assumptions

Product decisions by Brian:

- Municipality stays NYC, as the sample data implies.
- Always show every details field, with "Not provided" when empty (hiding fields caused incongruity).
- Hours are shown exactly as given and placed first; no "open now" badge, because hours are free text ("Dawn to dusk", "24 hours").
- List items with a missing address show "Address not provided".
- Generated placeholder illustration is labeled as a placeholder so it cannot pass for a real park photo.
- The supplied sample JSON is kept unchanged; researched coordinates live in a reference file and are not wired in.

### Data quality findings

Summarize `docs/coordinates.md` accurately (do not invent extra matches):

- Only Prospect Park is an exact named, verified park; its sample point is about 230 m off.
- Riverside Commons and Sunset Playground have fictional or unofficial names but plausible address matches to Riverside Park and Sunset Park Playground.
- The other nine have no defensible real match. Cedar Hill Nature Preserve uses the generic NYC City Hall point (`40.7128, -74.006`). Hillcrest Skate Park's sample point lands on the Brooklyn Bridge Marriott. East Ridge Trailhead and others land on residential blocks or otherwise unmatched locations.
- Reference file `src/data/parkCoordinates.reference.json` is **not wired into the app**. The running app uses the supplied sample as-is.
- Also briefly list missing/null fields in the sample and how each is handled (e.g. Highland Dog Park has no address; Old Mill description is null; Cedar Hill rating is null and it has no images; all sample image URLs point at `images.example.com` and will fail). Confirm these against `parks.sample.json` and the UI code.

### Left out

Search, filters, current location, URL deep links (`?park=id`), a backend, and deployment.

### Known issues

- Sample image URLs are placeholders that always fail (so residents currently see the labeled fallback, not real photos).
- If map tiles fail to load, Leaflet shows grey tiles with no explanatory message; list and details still work.
- Map markers are not the primary keyboard path; the list is.
- No formal screen-reader / WCAG audit yet.
- Coordinates in the sample are mostly fictional, as documented above.

### How it was checked

- Unit/component tests: **count them from your final `npm test` run** and use that number (do not guess; the count before this session was 71, but your new tests will change it).
- Real keyboard tests with `@testing-library/user-event` in the list tests (verify this is still true).
- `npm run lint`, `npm run typecheck`, and `npm run build` passed in this worktree (report the reality after you run them).
- Per-PR review by the orchestrator (Grok Bot) before merge, with these specific catches: a fake "keyboard" test that focused and clicked the button directly was replaced with real Tab / Enter / Space tests via user-event; UTF-8 BOM characters from Windows tooling were stripped; a layout shift on the selected list item was fixed; focus restore to the list on Back was added.
- Manual testing by Brian on localhost.
- Include this exact placeholder line, to be filled in later: `Automated UI/accessibility review: results to be added`

### AI usage

- Grok Bot orchestrated the work.
- Codex CLI (`gpt-6.2-astra`, high reasoning effort) created the scaffold and then ran one session per feature branch in parallel (`feature/map`, `feature/list`, `feature/details`, plus follow-up polish/revision sessions). Each pull request was reviewed before merge.
- Full unredacted session logs are in the submission's `ai-logs` folder, **not in this repository**. Do not copy logs into the repo.

### Time spent

- Started 2:54 PM CT, 24 Nov 2026.
- Leave the total as: `Total: TBD (target ≤ 2h)`

### Next steps before public use

- Real data source / API, with loading and error states in `App` (normalization can stay).
- Verified coordinates and real images.
- Deep links (`?park=id`).
- Search and filters (a derived list in `App` passed to map and list).
- Screen-reader audit with NVDA / VoiceOver.
- A tile provider with an SLA and usage-policy compliance (OpenStreetMap's public tile servers are fine for this demo, not for production traffic).
- Hosting and CI.
- Analytics-free privacy review.

---

## Verification (required before you finish)

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

All must pass. Fix anything you break. Do not leave the worktree broken. Confirm `README.md` and any edited source files have no UTF-8 BOM.

## Final message

Include:

- Files changed, and confirmation you did not edit App.tsx / ParkList / ParkMap / sample data.
- How the collapsed-placeholder logic works (including the no-loop guarantee and visible "Placeholder" labeling).
- Exact command results, including the final test count.
- Any README claim you could not verify, or that you softened because the code did not support it.
- Whether you added the `preview` script.
