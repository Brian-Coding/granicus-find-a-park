## What

On the single-column (phone) layout, selecting a park scrolls the details panel to the top of the viewport so the hours are visible.

- At `max-width: 44rem`, `scrollIntoView` uses `block: 'start'` and `behavior: 'auto'` on the details **section**, not just the heading. The heading is still focused with `preventScroll: true`.
- A `0.75rem` `scroll-margin-top` on `.park-details` keeps the panel from sitting flush against the edge.
- Desktop keeps `block: 'nearest'`.
- **Back to list** is unchanged: it still uses `block: 'nearest'` and does not clear the selection.

## How tested

Re-ran independently in this worktree after Codex finished (all passed):

- `npm run typecheck`
- `npm run lint`
- `npm test` — **75 tests across 6 files**, including a mocked `matchMedia` test at both widths (selection and reselection use `start` vs `nearest`; Back always uses `nearest`)
- `npm run build`
