param(
  [switch]$SelfTest,
  [switch]$Tray,
  [switch]$StatusJson,
  [switch]$WriteReport,
  [string]$WebAppUrl = "https://vitaliykonstantinovich.github.io/terminator-webapp/",
  [string]$LocalAgentDir = "",
  [string]$TaskName = "Terminator-Mina-Local-Agent",
  [ValidateSet("", "start", "stop", "restart")]
  [string]$AgentAction = "",
  [string]$ApprovedActionId = "",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Resolve-CompanionPaths {
  $scriptRoot = $PSScriptRoot
  $candidates = @()
  if ($LocalAgentDir) { $candidates += $LocalAgentDir }
  if ($env:TERMINATOR_LOCAL_AGENT_DIR) { $candidates += $env:TERMINATOR_LOCAL_AGENT_DIR }
  $candidates += (Join-Path $scriptRoot "..\..\..\local-agent")
  $candidates += (Join-Path $scriptRoot "..\..\local-agent")
  $candidates += (Join-Path (Get-Location) "local-agent")

  $resolvedAgent = $null
  foreach ($candidate in $candidates) {
    try {
      $path = Resolve-Path -LiteralPath $candidate -ErrorAction Stop
      if (Test-Path -LiteralPath (Join-Path $path "mina-local-agent.mjs")) {
        $resolvedAgent = $path.Path
        break
      }
    } catch {
      continue
    }
  }

  $storageRoot = if ($env:TERMINATOR_STORAGE_ROOT) { $env:TERMINATOR_STORAGE_ROOT } else { "D:\TerminatorStorage" }
  [pscustomobject]@{
    ScriptRoot = $scriptRoot
    LocalAgentDir = $resolvedAgent
    StorageRoot = $storageRoot
    LogPath = if ($resolvedAgent) { Join-Path (Split-Path $resolvedAgent -Parent) "logs\local-agent.log" } else { "" }
    ReportRoot = Join-Path $storageRoot "diagnostics\phase23_windows_companion"
    ReportPath = Join-Path (Join-Path $storageRoot "diagnostics\phase23_windows_companion") "companion-self-test.json"
  }
}

function Get-LocalAgentProcessInfo {
  Get-CimInstance Win32_Process |
    Where-Object {
      $_.Name -eq "node.exe" -and
      $_.CommandLine -and
      $_.CommandLine -like "*mina-local-agent.mjs*"
    } |
    Select-Object ProcessId, Name, CommandLine
}

function Get-ScheduledTaskStatus {
  param([string]$Name)
  try {
    $task = Get-ScheduledTask -TaskName $Name -ErrorAction Stop
    $info = Get-ScheduledTaskInfo -TaskName $Name -ErrorAction Stop
    $action = @($task.Actions | Select-Object -First 1)[0]
    return [pscustomobject]@{
      exists = $true
      state = [string]$task.State
      last_result = $info.LastTaskResult
      last_run_time = $info.LastRunTime
      next_run_time = $info.NextRunTime
      hidden = [bool]$task.Settings.Hidden
      execute = if ($action) { [string]$action.Execute } else { "" }
      arguments = if ($action) { [string]$action.Arguments } else { "" }
      working_directory = if ($action) { [string]$action.WorkingDirectory } else { "" }
    }
  } catch {
    return [pscustomobject]@{
      exists = $false
      state = "not_installed"
      error = $_.Exception.Message
    }
  }
}

function Get-VisibleTerminatorWindows {
  $patterns = @(
    "mina-local-agent.mjs",
    "mina-windows-companion.ps1",
    "start-local-agent.ps1",
    "start-local-agent-hidden.vbs",
    "Terminator-Mina-Local-Agent"
  )
  Get-CimInstance Win32_Process |
    Where-Object {
      $commandLine = $_.CommandLine
      $commandLine -and
      @($patterns | Where-Object { $pattern = $_; $pattern -and $commandLine -like "*$pattern*" }).Count -gt 0
    } |
    ForEach-Object {
      $process = Get-Process -Id $_.ProcessId -ErrorAction SilentlyContinue
      if ($process -and $process.MainWindowHandle -ne 0) {
        [pscustomobject]@{
          process_id = $_.ProcessId
          name = $_.Name
          title = $process.MainWindowTitle
        }
      }
    }
}

function Write-CompanionGuardianEvent {
  param(
    [string]$Action,
    [string]$Status,
    [string]$Risk,
    [string]$Message,
    [bool]$IsDryRun = [bool]$DryRun
  )
  $paths = Resolve-CompanionPaths
  $eventRoot = Join-Path $paths.StorageRoot "diagnostics\windows_companion_guardian"
  $eventPath = Join-Path $eventRoot "events.jsonl"
  New-Item -ItemType Directory -Path $eventRoot -Force | Out-Null
  $event = [pscustomobject]@{
    schema_version = 1
    event_id = "COMPANION-" + ([guid]::NewGuid().ToString("N"))
    action = $Action
    status = $Status
    risk_level = $Risk
    message = $Message
    approved_action_id = $ApprovedActionId
    dry_run = $IsDryRun
    created_at = (Get-Date).ToString("s")
  }
  ($event | ConvertTo-Json -Compress -Depth 5) | Add-Content -LiteralPath $eventPath -Encoding UTF8
  return $event
}

function Invoke-CompanionLocalAgentAction {
  param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("start", "stop", "restart")]
    [string]$Action,
    [switch]$ForceDryRun
  )
  $paths = Resolve-CompanionPaths
  $risk = if ($Action -eq "start") { "medium" } else { "high" }
  if (-not $paths.LocalAgentDir) {
    return Write-CompanionGuardianEvent -Action $Action -Status "blocked" -Risk $risk -Message "Local Agent folder not found." -IsDryRun $true
  }

  if ($Action -in @("stop", "restart") -and -not $ApprovedActionId) {
    return Write-CompanionGuardianEvent -Action $Action -Status "approval_required" -Risk $risk -Message "Stop/restart Local Agent requires explicit Guardian/Approval path." -IsDryRun $true
  }

  if ($DryRun -or $ForceDryRun) {
    return Write-CompanionGuardianEvent -Action $Action -Status "dry_run" -Risk $risk -Message "Controlled dry-run only; no Local Agent process was changed." -IsDryRun $true
  }

  if ($Action -in @("stop", "restart")) {
    Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-WindowStyle", "Hidden", "-File", (Join-Path $paths.LocalAgentDir "stop-local-agent.ps1")) -WindowStyle Hidden
  }
  if ($Action -in @("start", "restart")) {
    Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-WindowStyle", "Hidden", "-File", (Join-Path $paths.LocalAgentDir "start-local-agent.ps1")) -WindowStyle Hidden
  }

  return Write-CompanionGuardianEvent -Action $Action -Status "dispatched" -Risk $risk -Message "Controlled Local Agent action dispatched by Windows Companion."
}

function Invoke-CompanionSelfTest {
  $paths = Resolve-CompanionPaths
  $agentProcesses = @(Get-LocalAgentProcessInfo)
  $task = Get-ScheduledTaskStatus -Name $TaskName
  $legacyTask = Get-ScheduledTaskStatus -Name "Terminator-PM2-Resurrect"
  $visibleWindows = @(Get-VisibleTerminatorWindows)
  $node = Get-Command node.exe -ErrorAction SilentlyContinue
  $silentAutostart = $task.exists -and
    $task.hidden -and
    $task.execute -like "*wscript.exe*" -and
    $task.arguments -like "*//B*" -and
    $task.arguments -like "*//NoLogo*" -and
    $task.arguments -like "*start-local-agent-hidden.vbs*"
  $legacyDisabled = (-not $legacyTask.exists) -or $legacyTask.state -eq "Disabled"

  $checks = @(
    [pscustomobject]@{
      id = "windows"
      name = "Windows"
      status = if ($IsWindows -or $env:OS -like "*Windows*") { "pass" } else { "review" }
      note = "Windows companion is intended for Windows desktop."
    },
    [pscustomobject]@{
      id = "node"
      name = "Node.js"
      status = if ($node) { "pass" } else { "blocked" }
      note = if ($node) { $node.Source } else { "node.exe not found" }
    },
    [pscustomobject]@{
      id = "local_agent_dir"
      name = "Local Agent folder"
      status = if ($paths.LocalAgentDir) { "pass" } else { "blocked" }
      note = if ($paths.LocalAgentDir) { $paths.LocalAgentDir } else { "local-agent folder not found" }
    },
    [pscustomobject]@{
      id = "agent_config"
      name = "Agent config"
      status = if ($paths.LocalAgentDir -and (Test-Path -LiteralPath (Join-Path $paths.LocalAgentDir "agent.config.json"))) { "pass" } else { "review" }
      note = "Only existence is checked; secrets are not read."
    },
    [pscustomobject]@{
      id = "agent_process"
      name = "Agent process"
      status = if ($agentProcesses.Count -gt 0) { "pass" } else { "review" }
      note = if ($agentProcesses.Count -gt 0) { "running pids: " + (($agentProcesses | Select-Object -ExpandProperty ProcessId) -join ",") } else { "not running" }
    },
    [pscustomobject]@{
      id = "task_scheduler"
      name = "Autostart task"
      status = if ($task.exists) { "pass" } else { "review" }
      note = if ($task.exists) { "state=$($task.state); last_result=$($task.last_result)" } else { "not installed" }
    },
    [pscustomobject]@{
      id = "silent_autostart"
      name = "Silent autostart"
      status = if ($silentAutostart) { "pass" } else { "review" }
      note = if ($silentAutostart) { "hidden wscript //B //NoLogo startup is configured" } else { "autostart should use hidden wscript launcher without visible console windows" }
    },
    [pscustomobject]@{
      id = "legacy_pm2_resurrect"
      name = "Legacy PM2 autostart"
      status = if ($legacyDisabled) { "pass" } else { "review" }
      note = if ($legacyDisabled) { "Terminator-PM2-Resurrect is disabled or absent" } else { "legacy PM2 autostart is enabled and can create noisy windows/processes" }
    },
    [pscustomobject]@{
      id = "visible_windows"
      name = "No visible companion windows"
      status = if ($visibleWindows.Count -eq 0) { "pass" } else { "review" }
      note = if ($visibleWindows.Count -eq 0) { "no visible node/powershell/wscript Terminator windows detected" } else { "visible windows: " + (($visibleWindows | ForEach-Object { "$($_.name):$($_.process_id)" }) -join ",") }
    },
    [pscustomobject]@{
      id = "storage_root"
      name = "Storage root"
      status = if (Test-Path -LiteralPath $paths.StorageRoot) { "pass" } else { "review" }
      note = $paths.StorageRoot
    },
    [pscustomobject]@{
      id = "policy"
      name = "Safety policy"
      status = "pass"
      note = "No secrets, no deploy, no network/security changes, no automatic restart."
    }
  )

  $blocked = @($checks | Where-Object { $_.status -eq "blocked" }).Count
  $pass = @($checks | Where-Object { $_.status -eq "pass" }).Count
  $score = [math]::Round(($pass / $checks.Count) * 100)
  $status = if ($blocked -gt 0) { "blocked" } elseif ($score -ge 75) { "ready" } else { "review" }

  [pscustomobject]@{
    schema_version = 1
    phase = "Phase 23 Windows Companion Silent Autostart"
    status = $status
    score = $score
    checked_at = (Get-Date).ToString("s")
    webapp_url = $WebAppUrl
    script_root = $paths.ScriptRoot
    local_agent_dir = $paths.LocalAgentDir
    storage_root = $paths.StorageRoot
    log_path = $paths.LogPath
    report_path = $paths.ReportPath
    task_name = $TaskName
    legacy_task_state = $legacyTask.state
    visible_windows = $visibleWindows
    checks = $checks
    policy = [pscustomobject]@{
      starts_agent_automatically = $false
      reads_secrets = $false
      changes_network = $false
      deploys = $false
      paid_services = $false
      autostart_must_be_hidden = $true
      visible_console_windows_allowed = $false
    }
  }
}

function Show-CompanionTray {
  $paths = Resolve-CompanionPaths
  Add-Type -AssemblyName System.Windows.Forms
  Add-Type -AssemblyName System.Drawing

  $notify = New-Object System.Windows.Forms.NotifyIcon
  $notify.Icon = [System.Drawing.SystemIcons]::Application
  $notify.Text = "Mina Terminator"
  $notify.Visible = $true

  $menu = New-Object System.Windows.Forms.ContextMenuStrip
  $items = @(
    @{ Text = "Открыть Терминатор"; Action = { Start-Process $WebAppUrl } },
    @{ Text = "Схема Мины"; Action = { Start-Process ($WebAppUrl.TrimEnd("/") + "/?screen=scheme&source=tray") } },
    @{ Text = "Система"; Action = { Start-Process ($WebAppUrl.TrimEnd("/") + "/?screen=system&source=tray") } },
    @{ Text = "Диагност"; Action = { Start-Process ($WebAppUrl.TrimEnd("/") + "/?screen=system&source=tray-diagnost") } },
    @{ Text = "Проверить компаньон"; Action = {
      $result = Invoke-CompanionSelfTest
      [System.Windows.Forms.MessageBox]::Show("Статус: $($result.status)`nГотовность: $($result.score)%", "Mina Windows Companion")
    } },
    @{ Text = "Запустить Local Agent"; Action = {
      $answer = [System.Windows.Forms.MessageBox]::Show("Запуск Local Agent будет записан как controlled owner action. Продолжить?", "Mina Guardian", [System.Windows.Forms.MessageBoxButtons]::YesNo, [System.Windows.Forms.MessageBoxIcon]::Question)
      if ($answer -eq [System.Windows.Forms.DialogResult]::Yes) {
        $result = Invoke-CompanionLocalAgentAction -Action "start"
        [System.Windows.Forms.MessageBox]::Show("Статус: $($result.status)`nРиск: $($result.risk_level)", "Mina Guardian")
      }
    } },
    @{ Text = "Остановить Local Agent через Approval"; Action = {
      $result = Invoke-CompanionLocalAgentAction -Action "stop" -ForceDryRun
      [System.Windows.Forms.MessageBox]::Show("Остановка Local Agent требует Approval в Guardian.`nСтатус: $($result.status)`nДействие не выполнено.", "Mina Guardian")
      Start-Process ($WebAppUrl.TrimEnd("/") + "/?screen=system&source=tray-approval-required")
    } },
    @{ Text = "Открыть логи"; Action = {
      if ($paths.LogPath -and (Test-Path -LiteralPath $paths.LogPath)) { Start-Process "notepad.exe" $paths.LogPath }
    } },
    @{ Text = "Выход"; Action = { $notify.Visible = $false; [System.Windows.Forms.Application]::Exit() } }
  )

  foreach ($item in $items) {
    $menuItem = New-Object System.Windows.Forms.ToolStripMenuItem
    $menuItem.Text = $item.Text
    $menuItem.add_Click($item.Action)
    [void]$menu.Items.Add($menuItem)
  }

  $notify.ContextMenuStrip = $menu
  $notify.ShowBalloonTip(2500, "Mina", "Windows-компаньон запущен. Опасные действия не выполняются автоматически.", [System.Windows.Forms.ToolTipIcon]::Info)
  [System.Windows.Forms.Application]::Run()
}

if ($AgentAction) {
  $result = Invoke-CompanionLocalAgentAction -Action $AgentAction
  $result | ConvertTo-Json -Depth 5
  if ($result.status -in @("blocked", "approval_required")) { exit 2 }
  exit 0
}

if ($SelfTest -or $StatusJson) {
  $result = Invoke-CompanionSelfTest
  if ($WriteReport) {
    $paths = Resolve-CompanionPaths
    New-Item -ItemType Directory -Path $paths.ReportRoot -Force | Out-Null
    $result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $paths.ReportPath -Encoding UTF8
  }
  $result | ConvertTo-Json -Depth 6
  exit 0
}

if ($Tray) {
  Show-CompanionTray
  exit 0
}

Write-Host "Mina Windows Companion"
Write-Host "Use -SelfTest for readiness or -Tray to launch the tray shell."
