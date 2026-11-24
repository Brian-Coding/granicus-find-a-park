# AI logs

Unredacted Codex CLI logs and prompts from the Granicus “Find a Park” take-home. Paths in this index are relative to this `ai-logs/` directory. Prompts are in `prompts/`.

The assignment brief and a source copy of the sample JSON lived outside this repository during development and are not included here.

Model used for Codex sessions: `gpt-6.2-astra`, `model_reasoning_effort=high`.

## Scaffold and probe

- `00-model-probe.jsonl`
- `00-model-probe.last.md`
- `01-scaffold.jsonl`
- `01-scaffold.last.md`
- `01-scaffold.stderr.txt`

## Map feature (`feature/map`)

- Prompt: `prompts/map.md`
- `10-map.jsonl`
- `10-map-last.md`
- `10-map.stderr.txt`
- `10-map-pr-body.md`
- Commit `f09d2af`. PR https://github.com/Brian-Coding/granicus-find-a-park/pull/1

## List feature (`feature/list`)

- Prompt: `prompts/list.md`
- `11-list.jsonl`
- `11-list-last.md`
- `11-list.stderr.txt`

## Details feature (`feature/details`)

- Prompt: `prompts/details.md`
- `12-details.jsonl`
- `12-details-last.md`
- `12-details.stderr.txt`
- `12-details-pr.md`
- Launchers: `run-12-details.cmd`, `run-12-details.ps1`

## Details polish (`feature/details-polish`)

- Prompt: `prompts/details-polish.md`
- `13-details-polish.jsonl`
- `13-details-polish-last.md`
- `13-details-polish.stderr.txt`
- `13-details-polish-pr.md`
- Launcher: `run-13-details-polish.cmd`

Raster placeholder follow-up:

- Prompt: `prompts/details-polish-image.md`
- `13-details-polish-image.jsonl`
- `13-details-polish-image-last.md`
- `13-details-polish-image.stderr.txt`
- Launcher: `run-13-details-polish-image.cmd`

## List revisions (PR #3)

- Prompt: `prompts/list-revisions.md`
- `15-list-revisions.jsonl`
- `15-list-revisions-last.md`
- `15-list-revisions.stderr.txt`
- Mid-session product decision (applied after Codex finished): missing or blank list addresses show “Address not provided” in muted italic style; tests updated.

## Coordinate research

- `14-coordinates-notes.md`

## README polish + placeholder collapse (`feature/readme-polish`)

- Prompt: `prompts/readme-polish.md`
- `16-readme-polish.jsonl`
- `16-readme-polish.last.md`
- `16-readme-polish.stderr.txt`
- `16-readme-polish-pr.md`
- Launcher: `run-16-readme-polish.cmd`

## UX fixes from browser testing (`feature/ux-fixes`)

- Prompt: `prompts/ux-fixes.md`
- `17-ux-fixes.jsonl`
- `17-ux-fixes.last.md`
- `17-ux-fixes.stderr.txt`
- `17-ux-fixes-pr.md`
- `17-ux-fixes-review.md`
- Launcher: `run-17-ux-fixes.cmd`

Revision (DOM/Tab order, scroll behavior, marker outline):

- Prompt: `prompts/ux-fixes-revision.md`
- `18-ux-fixes-revision.jsonl`
- `18-ux-fixes-revision.last.md`
- `18-ux-fixes-revision.stderr.txt`
- Launcher: `run-18-ux-fixes-revision.cmd`

## Phone scroll details to top (`feature/phone-scroll`)

- Prompt: `prompts/phone-scroll.md`
- `19-phone-scroll.jsonl`
- `19-phone-scroll.last.md`
- `19-phone-scroll.stderr.txt`
- `19-phone-scroll-pr.md`
- Launcher: `run-19-phone-scroll.cmd`

## Final wrap-up (`chore/final-wrapup`)

This index and the project README were updated by Grok Bot (no Codex session) after a secret scan of every copied file. See `20-final-wrapup.md`.
