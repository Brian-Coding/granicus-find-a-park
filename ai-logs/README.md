# AI logs — Granicus “Find a Park”

These files are the conversation record for the take-home: the visible Grok Bot chat and the Codex sessions that built the app.

## What’s in this folder

| File | What it is |
|---|---|
| `grokbot-transcript.md` | The visible Granicus Build chat, oldest first. Brian’s messages and Grok Bot’s replies (including question cards). |
| `combined-transcript.md` | The same Grok chat interleaved with the Codex coding sessions, in chronological order (America/Chicago). |
| `codex-1-scaffold.md` … `codex-11-phone-scroll.md` | One readable Codex session each, in the order they ran. |
| `raw/` | The original Codex session files (`.jsonl`), unmodified. |

## How to read them

**Grok Bot log.** This is the chat you would have seen in the app. Hidden system setup, background-task notices, tool calls, and tool output are left out. Message wording is unedited, aside from stripping app wrappers (timestamps are kept as headers; widget answers are labeled `Answered: …`).

**Codex readable files.** These are the prompts sent to Codex and Codex’s replies, the way a conversation would look. Codex reasoning summaries were disabled for these sessions (`summary` mode `none`), so there is no plaintext “thinking” to include. The reasoning is stored only as encrypted content in `raw/`.

**`raw/`.** Byte-for-byte copies of the Codex session files from `~/.codex/sessions/` on the machine that ran them. They include commands, command output, tool calls, and encrypted reasoning. They have not been edited.

raw/rollout-2026-11-24T15-15-00-01a20f69-7858-7591-8521-c3b750a09a3c.jsonl: two browser window titles captured by a screen-reading step were redacted for privacy; nothing else in raw/ is modified.

**Combined log.** Same filtering as the separate files. One automated Codex safety-review session is omitted from this file only (it is a large internal policy check, not a coding chat). A one-line pointer marks where it ran; the session itself is in `codex-4-map-auto-review.md` and `raw/`.

## What was left out

One Codex session from 2:57 PM CT (America/Chicago) on Nov 24, 2026 was excluded entirely. Its working directory was the parent folder (`C:\Users\brian\granicus-takehome`), not the `granicus-find-a-park` repo or a worktree, and the content was only a connectivity ping (“Reply with the exact word ok”).

## Codex CLI session files and prompts from the build

The files below were collected during the build and already lived in this folder. Paths are relative to `ai-logs/`. Prompts are in `prompts/`.

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
