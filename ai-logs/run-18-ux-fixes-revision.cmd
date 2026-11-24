@echo off
cd /d C:\Users\brian\granicus-takehome\wt-ux
"C:\Users\brian\AppData\Roaming\npm\codex.cmd" exec -m gpt-6.2-astra -c model_reasoning_effort=high -c approval_policy="never" --sandbox workspace-write --json -C C:\Users\brian\granicus-takehome\wt-ux -o C:\Users\brian\granicus-takehome\ai-logs\18-ux-fixes-revision.last.md - < C:\Users\brian\granicus-takehome\prompts\ux-fixes-revision.md > C:\Users\brian\granicus-takehome\ai-logs\18-ux-fixes-revision.jsonl 2> C:\Users\brian\granicus-takehome\ai-logs\18-ux-fixes-revision.stderr.txt
echo CODEX_EXIT=%ERRORLEVEL%
exit /b %ERRORLEVEL%
