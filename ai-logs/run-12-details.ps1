$ErrorActionPreference = "Continue"
Set-Location -LiteralPath "C:\Users\brian\granicus-takehome\wt-details"
$log = "C:\Users\brian\granicus-takehome\ai-logs\12-details.jsonl"
$last = "C:\Users\brian\granicus-takehome\ai-logs\12-details-last.md"
$err = "C:\Users\brian\granicus-takehome\ai-logs\12-details.stderr.txt"
$promptPath = "C:\Users\brian\granicus-takehome\prompts\details.md"

New-Item -ItemType File -Force -Path $log | Out-Null
New-Item -ItemType File -Force -Path $err | Out-Null

$codexArgs = @(
  "exec",
  "-m", "gpt-6.2-astra",
  "-c", "model_reasoning_effort=high",
  "-c", "approval_policy=""never""",
  "--sandbox", "workspace-write",
  "--add-dir", "C:\Users\brian\granicus-takehome\brief",
  "--json",
  "-C", "C:\Users\brian\granicus-takehome\wt-details",
  "-o", $last,
  "-"
)

$p = Start-Process -FilePath "codex" -ArgumentList $codexArgs -RedirectStandardInput $promptPath -RedirectStandardOutput $log -RedirectStandardError $err -NoNewWindow -Wait -PassThru
Write-Output "CODEX_EXIT=$($p.ExitCode)"
exit $p.ExitCode
