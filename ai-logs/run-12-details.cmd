@echo off
cd /d C:\Users\brian\granicus-takehome\wt-details
"C:\Users\brian\AppData\Roaming\npm\codex.cmd" exec -m gpt-6.2-astra -c model_reasoning_effort=high -c approval_policy="never" --sandbox workspace-write --add-dir C:\Users\brian\granicus-takehome\brief --json -C C:\Users\brian\granicus-takehome\wt-details -o C:\Users\brian\granicus-takehome\ai-logs\12-details-last.md - < C:\Users\brian\granicus-takehome\prompts\details.md > C:\Users\brian\granicus-takehome\ai-logs\12-details.jsonl 2> C:\Users\brian\granicus-takehome\ai-logs\12-details.stderr.txt
echo CODEX_EXIT=%ERRORLEVEL%
exit /b %ERRORLEVEL%
