@echo off
cd /d C:\Users\brian\granicus-takehome\wt-ux
"C:\Users\brian\AppData\Roaming\npm\codex.cmd" exec -m gpt-6.2-astra -c model_reasoning_effort=high -c approval_policy="never" --sandbox workspace-write --add-dir C:\Users\brian\granicus-takehome\brief --json -C C:\Users\brian\granicus-takehome\wt-ux -o C:\Users\brian\granicus-takehome\ai-logs\17-ux-fixes.last.md - < C:\Users\brian\granicus-takehome\prompts\ux-fixes.md > C:\Users\brian\granicus-takehome\ai-logs\17-ux-fixes.jsonl 2> C:\Users\brian\granicus-takehome\ai-logs\17-ux-fixes.stderr.txt
echo CODEX_EXIT=%ERRORLEVEL%
exit /b %ERRORLEVEL%
