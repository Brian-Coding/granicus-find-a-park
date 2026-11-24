@echo off
cd /d C:\Users\brian\granicus-takehome\wt-details2
"C:\Users\brian\AppData\Roaming\npm\codex.cmd" exec -m gpt-6.2-astra -c model_reasoning_effort=high -c approval_policy="never" --sandbox workspace-write --add-dir C:\Users\brian\granicus-takehome\brief --json -C C:\Users\brian\granicus-takehome\wt-details2 -o C:\Users\brian\granicus-takehome\ai-logs\13-details-polish-image-last.md resume 01a20f68-301f-7cb0-a55e-3b0db166a358 - < C:\Users\brian\granicus-takehome\prompts\details-polish-image.md > C:\Users\brian\granicus-takehome\ai-logs\13-details-polish-image.jsonl 2> C:\Users\brian\granicus-takehome\ai-logs\13-details-polish-image.stderr.txt
echo CODEX_EXIT=%ERRORLEVEL%
exit /b %ERRORLEVEL%
