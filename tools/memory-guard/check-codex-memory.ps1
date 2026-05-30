[CmdletBinding()]
param(
  [switch]$Json,
  [switch]$FailOnRed
)

$ErrorActionPreference = 'Stop'

function Convert-ToGb {
  param([Nullable[Int64]]$Bytes)
  if ($null -eq $Bytes) { return 0 }
  return [math]::Round($Bytes / 1GB, 2)
}

function Get-Level {
  param(
    [double]$CodexPrivateGb,
    [double]$SystemFreeGb,
    [double]$BlueStacksPrivateGb
  )

  if ($CodexPrivateGb -ge 15 -or $SystemFreeGb -lt 2) { return 'RED' }
  if ($CodexPrivateGb -ge 13 -or $SystemFreeGb -lt 4) { return 'ORANGE' }
  if ($CodexPrivateGb -ge 10 -or $SystemFreeGb -lt 6 -or $BlueStacksPrivateGb -ge 5) { return 'YELLOW' }
  return 'GREEN'
}

function Get-Recommendation {
  param([string]$Level)

  switch ($Level) {
    'RED' {
      return 'Stop heavy browser/BlueStacks/video/evidence operations, create checkpoint, continue only with a small read-only block.'
    }
    'ORANGE' {
      return 'Do not run BlueStacks or large evidence scans. Finish the current small step and create checkpoint.'
    }
    'YELLOW' {
      return 'Work carefully: screenshots in batches of 2-3, no full evidence scans, no BlueStacks unless needed.'
    }
    default {
      return 'Normal work is allowed. Still create checkpoint before a heavy block.'
    }
  }
}

$trackedNames = @(
  'codex',
  'chrome',
  'msedge',
  'HD-Player',
  'BlueStacks',
  'node',
  'java',
  'gradle',
  'powershell',
  'pwsh'
)

$processes = Get-Process -ErrorAction SilentlyContinue |
  Where-Object { $trackedNames -contains $_.ProcessName } |
  Sort-Object ProcessName, Id |
  ForEach-Object {
    [pscustomobject]@{
      name = $_.ProcessName
      id = $_.Id
      working_set_gb = Convert-ToGb $_.WorkingSet64
      private_gb = Convert-ToGb $_.PrivateMemorySize64
      virtual_gb = Convert-ToGb $_.VirtualMemorySize64
      path = $_.Path
    }
  }

$codexVirtualGb = [math]::Round((($processes | Where-Object { $_.name -eq 'codex' } | Measure-Object -Property virtual_gb -Sum).Sum), 2)
$codexPrivateGb = [math]::Round((($processes | Where-Object { $_.name -eq 'codex' } | Measure-Object -Property private_gb -Sum).Sum), 2)
$blueStacksVirtualGb = [math]::Round((($processes | Where-Object { $_.name -in @('HD-Player','BlueStacks') } | Measure-Object -Property virtual_gb -Sum).Sum), 2)
$blueStacksPrivateGb = [math]::Round((($processes | Where-Object { $_.name -in @('HD-Player','BlueStacks') } | Measure-Object -Property private_gb -Sum).Sum), 2)
$chromeVirtualGb = [math]::Round((($processes | Where-Object { $_.name -in @('chrome','msedge') } | Measure-Object -Property virtual_gb -Sum).Sum), 2)
$chromePrivateGb = [math]::Round((($processes | Where-Object { $_.name -in @('chrome','msedge') } | Measure-Object -Property private_gb -Sum).Sum), 2)

$os = Get-CimInstance Win32_OperatingSystem
$system = [pscustomobject]@{
  total_ram_gb = [math]::Round($os.TotalVisibleMemorySize / 1MB, 2)
  free_ram_gb = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
  pagefile_gb = [math]::Round(($os.TotalVirtualMemorySize - $os.TotalVisibleMemorySize) / 1MB, 2)
  last_boot = $os.LastBootUpTime
}

$level = Get-Level -CodexPrivateGb $codexPrivateGb -SystemFreeGb $system.free_ram_gb -BlueStacksPrivateGb $blueStacksPrivateGb

$report = [pscustomobject]@{
  checked_at = (Get-Date).ToString('s')
  memory_guard = $level
  recommendation = Get-Recommendation $level
  thresholds = [pscustomobject]@{
    green = 'codex < 10 GB private memory and system free >= 6 GB'
    yellow = 'codex 10-13 GB private memory, system free 4-6 GB, or BlueStacks >= 5 GB private memory'
    orange = 'codex 13-15 GB private memory or system free 2-4 GB'
    red = 'codex >= 15 GB private memory or system free < 2 GB'
  }
  system = $system
  totals = [pscustomobject]@{
    codex_virtual_gb = $codexVirtualGb
    codex_private_gb = $codexPrivateGb
    browser_virtual_gb = $chromeVirtualGb
    browser_private_gb = $chromePrivateGb
    bluestacks_virtual_gb = $blueStacksVirtualGb
    bluestacks_private_gb = $blueStacksPrivateGb
  }
  processes = $processes
}

if ($Json) {
  $report | ConvertTo-Json -Depth 6
} else {
  "Memory Guard: $($report.memory_guard)"
  "Recommendation: $($report.recommendation)"
  ""
  "System: total=$($system.total_ram_gb) GB free=$($system.free_ram_gb) GB pagefile=$($system.pagefile_gb) GB"
  "Totals: codex_private=$codexPrivateGb GB browser_private=$chromePrivateGb GB bluestacks_private=$blueStacksPrivateGb GB"
  "Note: reserved virtual memory is listed per process below, but guard level uses private memory + free RAM to avoid Chromium/Electron false RED."
  ""
  $processes | Format-Table name,id,working_set_gb,private_gb,virtual_gb -AutoSize
}

if ($FailOnRed -and $level -eq 'RED') {
  exit 2
}
