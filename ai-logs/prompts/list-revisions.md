# Granicus "Find a Park" — feature/list revisions (PR #3)

You are Codex on a timed take-home. This session revises the ParkList work on branch `feature/list` in worktree `C:\Users\brian\granicus-takehome\wt-list` in response to a review of https://github.com/Brian-Coding/granicus-find-a-park/pull/3. Stay professional and on-task. Logs will be submitted to Granicus. Keep the app small; do not over-engineer.

`origin/develop` (map PR #1 and details PR #2) has already been merged into this worktree. Do not merge, rebase, commit, or push. Leave version control to the operator.

## Read first

- `src/components/ParkList/ParkList.tsx`
- `src/components/ParkList/ParkList.css`
- `src/components/ParkList/ParkList.test.tsx`
- `src/App.tsx`
- `src/App.test.tsx`
- `src/styles.css`
- `src/components/ParkDetails/ParkDetails.tsx` (already focuses the details heading when a park is selected, and has a native "Back to list" button that calls `onClose`)

## Required revisions

### 1. Real keyboard tests with @testing-library/user-event

The current "Tab+Enter" test in `ParkList.test.tsx` is not a real keyboard test: it calls `button.focus()` and `fireEvent.click` itself, so it would pass even if keyboard support were broken. Replace that test.

Add `@testing-library/user-event` as a devDependency if it is missing (it is not installed today). Use it — do not keep a focus()+click fake.

The replacement test must:

- `await user.tab()` should land on the first park button. Assert `document.activeElement` is that button (the first in locale-aware name order).
- `await user.keyboard('{Enter}')` should call `onSelectPark` with that park's id.
- After another tab, `await user.keyboard(' ')` (Space) should call `onSelectPark` with the next park button's id.

Use `userEvent.setup()`. Keep the existing tests for sort order, `aria-current`, missing addresses, and the empty state. Do not regress them.

### 2. Focus restoration when details closes (App integration)

A small edit to `App.tsx` is allowed.

When `ParkDetails` calls `onClose`, App must clear the selection **and** move focus back to the list button of the park that was just open.

Choose the simplest readable approach, for example:

- a `data-park-id` attribute on each list button, then focus that button from App after close, or
- a ref map keyed by park id in ParkList exposed via a callback / `forwardRef`.

Do not build a state library or a focus manager framework. Do not change ParkDetails unless it is truly necessary (it should not be: it already calls `onClose` and already moves focus to the details heading on selection).

Add an **App-level** test with user-event:

1. Select a park from the list.
2. Assert the details heading receives focus (this already happens in ParkDetails).
3. Activate the "Back to list" button.
4. Assert focus returns to that park's list button.

Rendering `App` also mounts `ParkMap` (Leaflet). If jsdom needs a small map-related test accommodation, keep it minimal and do not rewrite the map feature.

### 3. Explicit :focus-visible rule in ParkList.css

Add a `:focus-visible` rule on the list buttons: **3px solid** high-contrast outline and **at least 2px** offset (3px offset is fine and matches the global rule). The list focus ring must not depend solely on the global rule in `src/styles.css`. Do not remove or weaken the global rule.

### 4. No layout shift on the selected state

The selected style currently sets `border-inline-start: 5px solid #285b3e` while the resting border is 1px, which can shift content. Keep the border width constant. For example:

- use an inset `box-shadow` (or similar) for the selected cue, or
- keep a constant 5px start border whose color is transparent when not selected and solid when selected.

The selected state must still not rely on color alone (a thicker/inset bar plus background is fine if width does not change).

## Constraints

- Do not edit `ParkMap` files except a last-resort test-only accommodation, and say so if you do.
- Do not change normalization, sample JSON, or types unless a tiny prop addition on `ParkSelectionProps` is the cleanest way to support focus restoration — prefer keeping types unchanged if a `data-` attribute or local ref is enough.
- No new runtime dependencies. `user-event` as a devDependency is required and allowed.
- Do not add search, filters, or other features.
- Do not git commit or git push.

## Verification (required)

Run and make all of these pass:

```
npm run typecheck && npm run lint && npm test && npm run build
```

## Final message

Include: files changed (especially any App.tsx / App.test.tsx / types changes and why), how focus restoration works, how the selected-state shift was avoided, the exact commands and results, and anything a reviewer should look at closely.
