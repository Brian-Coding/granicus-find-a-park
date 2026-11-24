# Granicus "Find a Park" — feature/list (ParkList only)

You are Codex on a timed take-home (hard stop for this build: 4:24 PM America/Chicago). This session implements the LIST feature only. Stay professional and on-task. This chat and all logs will be submitted to Granicus. This is a small app; do not over-engineer it. Search, filters, and geolocation are out of scope.

Work only in this worktree. Do not commit or push. Leave version control to the operator.

## Paths (read first)

- Worktree (cwd): `C:\Users\brian\granicus-takehome\wt-list` (branch `feature/list`)
- Brief text (OUTSIDE the repo — read only, never copy into the repo): `C:\Users\brian\granicus-takehome\brief\brief.txt`
- Also read in the worktree: `README.md`, `src/types.ts`, `src/data/normalizePark.ts`, `src/App.tsx`, `src/components/ParkList/ParkList.tsx`, `src/App.test.tsx`, `src/styles.css`

`App.tsx` already owns `selectedParkId` and already passes `{ parks, selectedParkId, onSelectPark }` into `ParkList`. Props are already wired. You should not need to change `App.tsx`.

## Implement `src/components/ParkList` only

You may add a CSS file and tests next to the component, for example:

- `src/components/ParkList/ParkList.tsx` (replace the placeholder)
- `src/components/ParkList/ParkList.css` (import it from the component)
- `src/components/ParkList/ParkList.test.tsx`

Requirements:

1. A heading like **Parks (12)** — the number is the length of the `parks` prop (not a hardcoded 12). Keep the list in a labeled region (the stub uses `<section aria-labelledby="park-list-heading">`; keep an accessible region so the shell test can still find it).
2. A semantic `<ul>` of native `<button type="button">` items, one per park, **sorted by name with a locale-aware comparison**. Copy before sorting. **Never mutate the `parks` prop** (do not call `.sort()` on the incoming array).
3. Each button shows the park name and a short secondary line **only from real data**: show the address if `park.location?.address` is a non-empty string; otherwise show no secondary address line. **Never invent an address. Never render "undefined", "null", or "Not provided" for a missing address.** Highland Dog Park in the sample has no address — that case must look clean.
4. The selected item has `aria-current="true"` (preferred) or `aria-pressed`, plus a visual selected style that **does not rely on color alone** (for example a thicker left border and/or font-weight, not only a background tint).
5. A clearly visible `:focus-visible` outline that is **at least 3px**, high contrast, with offset. Do not remove or weaken the global `:focus-visible` rule already in `src/styles.css`. You may add a list-specific rule in `ParkList.css` so the list buttons are clearly focused.
6. Clicking a button, or activating it with Enter/Space via native button behavior, calls `onSelectPark(id)` with that park's id. **No custom key handling.** Tab/Enter/Space must work because these are real buttons, not a hand-rolled listbox.
7. Do **not** use `role="listbox"`, `role="option"`, or a roving tabindex. The list must be a full keyboard-accessible alternative to the map.
8. If `parks` is empty, show a clear empty-state message (and no empty or pointless list).
9. Long names wrap rather than overflow. Touch targets are at least **44px** tall.
10. Keep it small. **No new dependencies.** `@testing-library/user-event` is not installed; use Testing Library and `fireEvent` (or native button clicks) rather than adding packages.

## Files you must not touch

- Do not edit `src/components/ParkMap/**` or `src/components/ParkDetails/**`.
- Do not edit `src/App.tsx` or `src/styles.css` except the absolute minimum required to wire props, and if you do, say so clearly in your final message and explain why. You should not need to.
- Do not change `src/types.ts`, normalization, or the sample JSON.
- Do not add search, filters, a router, a UI kit, or a state library.

## Tests (required)

Add Vitest + Testing Library tests for ParkList (jsdom). `@testing-library/user-event` is not available; `fireEvent` is fine.

Cover at least:

- Renders all parks **sorted by name** (locale-aware). Use a small fixture, not only the sample, so sort order is obvious.
- Keyboard: Tab to a park button, then Enter, selects that park and calls `onSelectPark` with the correct id. (Space is native button behavior; Enter is the required case.)
- The selected item exposes `aria-current="true"` (or the alternative you chose, consistently).
- A park with no address renders without the strings "undefined" or "null".
- Empty `parks` shows the empty-state message.

`src/App.test.tsx` currently looks for a region named "Park list" and the placeholder text `List placeholder for ${sample.length} parks.`. After you replace the placeholder, that shell test will fail. **You may update `src/App.test.tsx` only as needed** so it still verifies the list region is present (for example by the new heading / Parks (N) name) and no longer depends on the placeholder sentence. Do not turn App.test into a second copy of the list unit tests.

## Verification (required before you finish)

Run, and make all of them pass:

```
npm run typecheck && npm run lint && npm test && npm run build
```

Fix any failures you introduced. Do not leave the worktree broken.

## Final message

Include: files changed (and whether you touched App.tsx, styles.css, or App.test.tsx), how you handled missing addresses and sorting, the exact commands you ran and their results, and anything a reviewer should look at closely.

Do not git commit or git push.
