## What

Collapses redundant placeholder photos and replaces the scaffold-era README with a reviewer-facing writeup.

- When a park has photo URLs, they are rendered. A failed image is hidden rather than replaced with its own copy of the placeholder.
- If every photo fails, or the park has no photos, the panel shows exactly one illustration with a visible **Placeholder** label and a caption: "Photo unavailable" or "No photos provided". Alt text is honest (`Placeholder illustration — photo unavailable` / `— no photos provided`). The placeholder image has no `onError` handler, so it cannot loop.
- Switching parks starts with fresh photo state.
- Adds the standard Vite `preview` script so `npm run preview` works.
- README covers overview, run instructions (Node 20+; developed on Node 24.20.0), what works, architecture, Brian's product decisions, coordinate research findings, known issues, how it was checked, AI usage, time spent, and next steps. The automated UI/accessibility review line is left as a placeholder.

No changes to App.tsx, ParkList, ParkMap, or the sample dataset. The researched coordinates remain reference-only.

## How tested

Re-ran independently in this worktree after Codex finished (all passed):

- `npm run typecheck`
- `npm run lint`
- `npm test` — **73 tests across 6 files**, including: Prospect with both images failing yields exactly one placeholder; mixed success keeps only the real photo; empty images (Cedar Hill) show one no-photos placeholder; a second error on the placeholder does not change `src`; park changes reset photo state.
- `npm run build`

## Notes for reviewers

- All supplied sample photo URLs still point at `images.example.com` and will fail in the running app, so residents currently see the labeled placeholder.
- Automated UI/accessibility review results will be added to the README in a follow-up.
