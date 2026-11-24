All four revisions are complete on `feature/list`. The required verification chain passed, including **54 tests across 6 files**. The changes are uncommitted.

- `ParkList.tsx` gives each list button a stable ID derived from the park ID. `App.tsx` uses that ID when “Back to list” is activated to clear the selection and focus the button for the park that was open.
- `ParkList.test.tsx` replaces the simulated focus and click with `userEvent.setup()`. It verifies that Tab lands on Alder Park, Enter selects it, the next Tab lands on Élan Park, and Space selects it. The existing sort, `aria-current`, missing-address, and empty-state tests also pass.
- `App.test.tsx` checks the full focus round trip for Highland Dog Park, a non-first list entry. It verifies focus on the details heading, activates “Back to list” with Tab and Enter, then checks both the original button’s focus and the cleared details panel. The test runs with the real `ParkMap`.
- `ParkList.css` adds a 3px solid focus outline with a 3px offset. The selected button keeps its 1px border and draws a 4px inset bar over a tinted background, so its text stays in place.
- `package.json` and `package-lock.json` add `@testing-library/user-event` 14.6.13 as a dev dependency. No changes were needed in shared types, `ParkDetails`, `ParkMap`, or global styles.

Ran `npm run typecheck && npm run lint && npm test && npm run build`. TypeScript and ESLint passed, all tests passed, and Vite built the production bundle successfully.