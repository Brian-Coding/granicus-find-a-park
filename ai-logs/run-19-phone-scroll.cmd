@echo off
cd /d C:\Users\brian\granicus-takehome\wt-phone
"C:\Users\brian\AppData\Roaming\npm\codex.cmd" exec -m gpt-6.2-astra -c model_reasoning_effort=high -c approval_policy="never" --sandbox workspace-write --json -C C:\Users\brian\granicus-takehome\wt-phone -o C:\Users\brian\granicus-takehome\ai-logs\19-phone-scroll.last.md - < C:\Users\brian\granicus-takehome\prompts\phone-scroll.md > C:\Users\brian\granicus-takehome\ai-logs\19-phone-scroll.jsonl 2> C:\Users\brian\granicus-takehome\ai-logs\19-phone-scroll.stderr.txt
echo CODEX_EXIT=%ERRORLEVEL%
exit /b %ERRORLEVEL%
