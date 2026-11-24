# Follow-up: generate a raster park placeholder (`feature/details-polish`)

You are Codex, continuing the park details polish in `C:\Users\brian\granicus-takehome\wt-details2` on branch `feature/details-polish`. The panel, tests, hours placement, consistent fields, captions, and Back-button focus work are already implemented and should stay. Do not start over. Do not commit or push. Do not edit App.tsx, styles.css, ParkMap, ParkList, or sample data.

## What changed

Brian wants a **real generated raster image** as the photo placeholder, not only the SVG illustration already at `src/assets/park-placeholder.svg`.

## Do this

1. **First, use your built-in image generation tool** (the image-generation / generate-image capability, not a hand-drawn SVG, not a downloaded stock photo, not a screenshot). Generate one original generic park image:
   - Raster PNG or WebP
   - No people, no text, no letters, no logos, no watermarks, no brand marks
   - About 1200x800 (3:2 is fine)
   - File size under ~150 KB (compress if needed, but keep it a real generated image)
   - Subject: a generic public park — trees, grass, a path, sky; calm and photoreal or painterly is fine, as long as it is clearly a park and not a specific famous landmark you are copying
   - Save it as `src/assets/park-placeholder.png` or `src/assets/park-placeholder.webp`

2. If generation succeeds, switch the app and tests to import that raster file instead of `park-placeholder.svg`. Remove the unused SVG so the repo does not ship two placeholders. Keep the honest alt text and visible captions exactly as they are:
   - Failed photo: alt `Placeholder illustration (photo unavailable)`, caption `Photo unavailable`
   - No photos: alt `Placeholder illustration (no photos provided)`, caption `No photos provided`
   Vite already types PNG/WebP via `vite/client`. One-time `onError` src swap must still be loop-proof.

3. **If image generation is not available** in this Codex CLI / session (no image-generation tool, the tool errors, or you cannot actually produce a raster image), do **not** fake it. Do not download an image from the internet. Do not convert the SVG into a "photo." Leave the existing SVG in place and say clearly in your final message that generation was unavailable and why.

4. Re-run and make all pass:

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

## Final message

State which path you took (raster generated vs SVG kept), the exact output path, pixel dimensions, file size in KB, the tool or reason generation was or was not available, and the four command results. Confirm alt text and captions are unchanged.
