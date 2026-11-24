@echo off
cd /d C:\Users\brian\granicus-takehome\wt-readme
"C:\Users\brian\AppData\Roaming\npm\codex.cmd" exec -m gpt-6.2-astra -c model_reasoning_effort=high -c approval_policy="never" --sandbox workspace-write --add-dir C:\Users\brian\granicus-takehome\brief --json -C C:\Users\brian\granicus-takehome\wt-readme -o C:\Users\brian\granicus-takehome\ai-logs\16-readme-polish.last.md - < C:\Users\brian\granicus-takehome\prompts\readme-polish.md > C:\Users\brian\granicus-takehome\ai-logs\16-readme-polish.jsonl 2> C:\Users\brian\granicus-takehome\ai-logs\16-readme-polish.stderr.txt
echo CODEX_EXIT=%ERRORLEVEL%
exit /b %ERRORLEVEL%

