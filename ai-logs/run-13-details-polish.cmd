@echo off
cd /d C:\Users\brian\granicus-takehome\wt-details2
"C:\Users\brian\AppData\Roaming\npm\codex.cmd" exec -m gpt-6.2-astra -c model_reasoning_effort=high -c approval_policy="never" --sandbox workspace-write --add-dir C:\Users\brian\granicus-takehome\brief --json -C C:\Users\brian\granicus-takehome\wt-details2 -o C:\Users\brian\granicus-takehome\ai-logs\13-details-polish-last.md - < C:\Users\brian\granicus-takehome\prompts\details-polish.md > C:\Users\brian\granicus-takehome\ai-logs\13-details-polish.jsonl 2> C:\Users\brian\granicus-takehome\ai-logs\13-details-polish.stderr.txt
echo CODEX_EXIT=%ERRORLEVEL%
exit /b %ERRORLEVEL%
