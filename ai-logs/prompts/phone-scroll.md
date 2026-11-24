# Feature: phone selection scrolls details to the top (`feature/phone-scroll`)

You are Codex, working on a timed take-home interview exercise for Granicus. Stay professional and on-task. Minimal, focused changes only. No new npm dependencies. Do not commit or push. Leave version control to the operator. Windows machine; use PowerShell-friendly commands. Strip any UTF-8 BOM you introduce.

## Paths

- Working directory (git worktree, branch `feature/phone-scroll`, based on `origin/develop` at `76fc5ce`): `C:\Users\brian\granicus-takehome\wt-phone`
- Do not touch any other worktree or `C:\Users\brian\granicus-takehome\granicus-find-a-park`. Do not start, stop, or use a server on port 5173.

## Product decision (Brian)

On phone (the single-column layout, `max-width: 44rem`), selecting a park should scroll so the **details panel starts at the TOP of the screen**, so the hours are visible. Today `scrollIntoView({ block: 'nearest' })` on the details heading leaves the heading at the bottom edge of the viewport, and the hours sit below the fold.

Desktop behavior stays as it is (`block: 'nearest'`).

## Implementation (keep it simple)

In `src/components/ParkDetails/ParkDetails.tsx`, `focusAndScrollTo` is used both for the details heading on selection and for Back-to-list (the list button). **Back-to-list scrolling stays as it is** (`block: 'nearest'`, `behavior: 'auto'`). Do not change list-button scroll behavior.

When scrolling to the details on selection:

- Use `block: 'start'` if `window.matchMedia('(max-width: 44rem)').matches`, otherwise `block: 'nearest'`.
- Keep `behavior: 'auto'`.
- Scroll the **details section** (the panel) rather than just the `h2` if that looks cleaner, so the whole panel, including the hours block, lines up at the top. Continue to **focus the heading** (with `preventScroll: true`) so keyboard and screen-reader behavior is unchanged.
- Add a small `scroll-margin-top` on the scrolled element (the section is preferred) so the panel is not flush against the viewport edge. Something in the 0.5rem–1rem range is enough. Put the CSS in the existing details or global stylesheet, not a new file.

Suggested shape (equivalent is fine): keep `focusAndScrollTo` for Back-to-list; have the selection effect scroll the section with the media-query block choice. Do not add a resize listener unless you have a good reason; reading `matchMedia` at scroll time is enough.

Do not change layout, DOM order, Back-to-list semantics (the park stays selected), popup behavior, or other UX from PR #7.

## Tests

Add or adjust a cheap unit test with `window.matchMedia` mocked. No new dependencies. Cover:

- At a narrow viewport (`matches: true` for `(max-width: 44rem)`), selecting a park calls `scrollIntoView` on the details panel (or the element you chose) with `{ block: 'start', behavior: 'auto' }`.
- At a wide viewport (`matches: false`), it uses `{ block: 'nearest', behavior: 'auto' }`.
- Back-to-list still uses `{ block: 'nearest', behavior: 'auto' }` (even if you mock a narrow viewport).
- Existing focus tests must still pass (heading is focused on selection; Back returns focus to the list button; selection is not cleared).

You can mock `scrollIntoView` on the element (or on `Element.prototype` with care to restore it). Existing App tests already cover focus and Back.

## README

Optionally add one short clause to the "What works" sentence about selection scrolling, if you can do it in a single honest line (phone: details panel scrolls to the top; desktop: nearest). Do not rewrite other sections. Leave `Automated UI/accessibility review: results to be added` and `Total: TBD (target ≤ 2h)` exactly as they are. If you mention a test count, use the number from your final `npm test` run.

## Allowed files

- `src/components/ParkDetails/ParkDetails.tsx`, `ParkDetails.css`, `ParkDetails.test.tsx`
- `src/App.tsx` / `src/App.test.tsx` only if needed for the Back vs details scroll split or tests
- `src/styles.css` only if the scroll-margin belongs there
- `README.md` only for the optional one-line What works tweak

## Verification (required before you finish)

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

All must pass. Confirm edited files have no UTF-8 BOM.

## Final message

Include: files changed; how phone vs desktop scroll works; confirmation Back-to-list is unchanged; test approach; exact command results and test count.
