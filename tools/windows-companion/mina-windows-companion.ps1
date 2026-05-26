param(
  [switch]$SelfTest,
  [switch]$Tray,
  [switch]$StatusJson,
  [string]$WebAppUrl = "https://vitaliykonstantinovich.github.io/terminator-webapp/",
  [string]$LocalAgentDir = "",
  [string]$TaskName = "Terminator-Mina-Local-Agent"
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
    return [pscustomobject]@{
      exists = $true
      state = [string]$task.State
      last_result = $info.LastTaskResult
      last_run_time = $info.LastRunTime
      next_run_time = $info.NextRunTime
    }
  } catch {
    return [pscustomobject]@{
      exists = $false
      state = "not_installed"
      error = $_.Exception.Message
    }
  }
}

function Invoke-CompanionSelfTest {
  $paths = Resolve-CompanionPaths
  $agentProcesses = @(Get-LocalAgentProcessInfo)
  $task = Get-ScheduledTaskStatus -Name $TaskName
  $node = Get-Command node.exe -ErrorAction SilentlyContinue

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
    phase = "Phase 7 Windows Companion"
    status = $status
    score = $score
    checked_at = (Get-Date).ToString("s")
    webapp_url = $WebAppUrl
    script_root = $paths.ScriptRoot
    local_agent_dir = $paths.LocalAgentDir
    storage_root = $paths.StorageRoot
    log_path = $paths.LogPath
    task_name = $TaskName
    checks = $checks
    policy = [pscustomobject]@{
      starts_agent_automatically = $false
      reads_secrets = $false
      changes_network = $false
      deploys = $false
      paid_services = $false
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
      if ($paths.LocalAgentDir) {
        Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-WindowStyle", "Hidden", "-File", (Join-Path $paths.LocalAgentDir "start-local-agent.ps1")) -WindowStyle Hidden
      }
    } },
    @{ Text = "Остановить Local Agent"; Action = {
      if ($paths.LocalAgentDir) {
        Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", (Join-Path $paths.LocalAgentDir "stop-local-agent.ps1")) -WindowStyle Normal
      }
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

if ($SelfTest -or $StatusJson) {
  $result = Invoke-CompanionSelfTest
  $result | ConvertTo-Json -Depth 6
  exit 0
}

if ($Tray) {
  Show-CompanionTray
  exit 0
}

Write-Host "Mina Windows Companion"
Write-Host "Use -SelfTest for readiness or -Tray to launch the tray shell."
