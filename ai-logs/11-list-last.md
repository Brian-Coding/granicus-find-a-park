Implemented ParkList with a live count, a labeled region, and one native button per park. It sorts a copy of `parks` using `localeCompare`, preserving the input order. Each button shows the trimmed address only when it contains text. Highland Dog Park displays just its name. An empty collection displays “No parks available.”

The selected button exposes `aria-current="true"` and has a thicker left border. Keyboard focus uses the existing 3px outline with a 3px offset.

**Files changed**

- `src/components/ParkList/ParkList.tsx`
- `src/components/ParkList/ParkList.css`
- `src/components/ParkList/ParkList.test.tsx`
- `src/App.test.tsx` — replaced the placeholder assertion with a check for the `Parks (N)` region.

`App.tsx` and `src/styles.css` were untouched. No dependencies, commits, or pushes.

**Verification** — `npm run typecheck && npm run lint && npm test && npm run build` passed. All 26 tests passed, including 8 ParkList cases. `git diff --check` also passed.

The keyboard test is worth a close look because jsdom requires simulated focus and activation. I separately verified in headless Chrome that Tab reached the park buttons and that Enter and Space selected the focused park and updated the details region. At 375px wide, all 12 buttons met the 44px minimum height, and a 160-character unbroken name wrapped without horizontal overflow.