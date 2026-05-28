param(
  [switch]$DryRun,
  [switch]$CreateStartMenuShortcut,
  [switch]$CreateDesktopShortcut,
  [switch]$InstallAutostart,
  [string]$TaskName = "Terminator-Mina-Windows-Companion"
)

$ErrorActionPreference = "Stop"
$ScriptRoot = $PSScriptRoot
$CompanionScript = Join-Path $ScriptRoot "mina-windows-companion.ps1"
$StorageRoot = if ($env:TERMINATOR_STORAGE_ROOT) { $env:TERMINATOR_STORAGE_ROOT } else { "D:\TerminatorStorage" }
$ReportRoot = Join-Path $StorageRoot "diagnostics\phase24_windows_companion_installed"
$ReportPath = Join-Path $ReportRoot "installer-report.json"
$StartMenuDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Terminator Mina"
$StartMenuShortcutPath = Join-Path $StartMenuDir "Mina Windows Companion.lnk"
$DesktopShortcutPath = Join-Path ([Environment]::GetFolderPath("Desktop")) "Mina Windows Companion.lnk"

if (-not (Test-Path -LiteralPath $CompanionScript)) {
  throw "Companion script not found: $CompanionScript"
}

function New-Shortcut {
  param(
    [string]$Path,
    [string]$Arguments
  )
  $shell = New-Object -ComObject WScript.Shell
  $shortcut = $shell.CreateShortcut($Path)
  $shortcut.TargetPath = "powershell.exe"
  $shortcut.Arguments = $Arguments
  $shortcut.WorkingDirectory = $ScriptRoot
  $shortcut.IconLocation = "$env:SystemRoot\System32\shell32.dll,44"
  $shortcut.Save()
}

$checks = @(
  [pscustomobject]@{ id = "script"; status = "pass"; note = $CompanionScript },
  [pscustomobject]@{ id = "dry_run_first"; status = "pass"; note = "Run with -DryRun before enabling shortcuts/autostart; Phase 24 acceptance runs dry-run before install." },
  [pscustomobject]@{ id = "autostart"; status = if ($InstallAutostart) { "review" } else { "pass" }; note = "Autostart is explicit only." },
  [pscustomobject]@{ id = "start_menu_shortcut"; status = "pass"; note = "Start Menu shortcut is the recommended non-invasive install target." },
  [pscustomobject]@{ id = "silent_window_policy"; status = "pass"; note = "Autostart/tray commands use hidden PowerShell window style." },
  [pscustomobject]@{ id = "legacy_pm2_policy"; status = "pass"; note = "Installer does not enable legacy PM2/n8n autostart." },
  [pscustomobject]@{ id = "secrets"; status = "pass"; note = "Installer does not read secrets, cookies, tokens or .env." },
  [pscustomobject]@{ id = "network"; status = "pass"; note = "No DNS/VPN/proxy/firewall/Defender changes." }
)

$actions = @()
$trayArgs = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$CompanionScript`" -Tray"

if (-not $DryRun) {
  New-Item -ItemType Directory -Path $ReportRoot -Force | Out-Null
  if ($CreateStartMenuShortcut) {
    New-Item -ItemType Directory -Path $StartMenuDir -Force | Out-Null
    New-Shortcut -Path $StartMenuShortcutPath -Arguments $trayArgs
    $actions += "created_start_menu_shortcut:$StartMenuShortcutPath"
  }
  if ($CreateDesktopShortcut) {
    New-Shortcut -Path $DesktopShortcutPath -Arguments $trayArgs
    $actions += "created_desktop_shortcut:$DesktopShortcutPath"
  }
  if ($InstallAutostart) {
    $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $trayArgs -WorkingDirectory $ScriptRoot
    $trigger = New-ScheduledTaskTrigger -AtLogOn
    $principal = New-ScheduledTaskPrincipal -UserId ([System.Security.Principal.WindowsIdentity]::GetCurrent().Name) -LogonType Interactive -RunLevel Limited
    $settings = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
    Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Description "Starts Mina Windows Companion tray at Windows logon." -Force | Out-Null
    $registered = Get-ScheduledTask -TaskName $TaskName -ErrorAction Stop
    $registered.Settings.Hidden = $true
    Set-ScheduledTask -InputObject $registered | Out-Null
    $actions += "installed_autostart_task:$TaskName"
  }
}

$report = [pscustomobject]@{
  schema_version = 1
  phase = "Phase 24 Windows Companion Installed User Layer"
  status = if ($DryRun) { "dry_run_pass" } else { "completed" }
  dry_run = [bool]$DryRun
  created_at = (Get-Date).ToString("s")
  script_root = $ScriptRoot
  companion_script = $CompanionScript
  report_path = $ReportPath
  start_menu_shortcut = $StartMenuShortcutPath
  desktop_shortcut = $DesktopShortcutPath
  start_menu_shortcut_exists = [bool](Test-Path -LiteralPath $StartMenuShortcutPath)
  desktop_shortcut_exists = [bool](Test-Path -LiteralPath $DesktopShortcutPath)
  actions = $actions
  checks = $checks
  policy = [pscustomobject]@{
    autostart_default = $false
    autostart_hidden = $true
    secrets_read = $false
    network_changes = $false
    deploy = $false
    paid_services = $false
  }
}

if (-not $DryRun) {
  $report | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$report | ConvertTo-Json -Depth 5
