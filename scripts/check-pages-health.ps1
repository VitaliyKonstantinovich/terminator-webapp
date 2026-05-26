param(
  [string]$Repository = "VitaliyKonstantinovich/terminator-webapp",
  [string]$Url = "https://vitaliykonstantinovich.github.io/terminator-webapp/",
  [string]$ExpectedAssetMarker = "20260526-memory-search-v1",
  [string]$ExpectedCacheMarker = "terminator-mina-pwa-20260526-memory-search-v1"
)

$ErrorActionPreference = "Stop"

function Decode-ResponseContent {
  param($Content)
  if ($Content -is [byte[]]) {
    return [Text.Encoding]::UTF8.GetString($Content)
  }
  return [string]$Content
}

$pages = gh api "repos/$Repository/pages" | ConvertFrom-Json
$latestBuild = gh api "repos/$Repository/pages/builds/latest" | ConvertFrom-Json
$runs = gh run list --repo $Repository --workflow "Deploy GitHub Pages" --limit 1 --json databaseId,status,conclusion,headSha,createdAt | ConvertFrom-Json
$latestRun = @($runs)[0]

$root = if ($Url.EndsWith("/")) { $Url } else { "$Url/" }
$html = Decode-ResponseContent ((Invoke-WebRequest -UseBasicParsing "$root`?force=pages-health-$(Get-Date -Format yyyyMMddHHmmss)").Content)
$manifestResponse = Invoke-WebRequest -UseBasicParsing "$root`manifest.webmanifest?force=pages-health-$(Get-Date -Format yyyyMMddHHmmss)"
$manifest = Decode-ResponseContent $manifestResponse.Content | ConvertFrom-Json
$sw = Decode-ResponseContent ((Invoke-WebRequest -UseBasicParsing "$root`sw.js?force=pages-health-$(Get-Date -Format yyyyMMddHHmmss)").Content)

$checks = [ordered]@{
  repository = $Repository
  page_url = $pages.html_url
  pages_status = $pages.status
  build_type = $pages.build_type
  latest_legacy_build_status = $latestBuild.status
  latest_legacy_build_commit = $latestBuild.commit
  latest_legacy_build_error = $latestBuild.error.message
  latest_workflow_run_id = $latestRun.databaseId
  latest_workflow_status = $latestRun.status
  latest_workflow_conclusion = $latestRun.conclusion
  expected_asset_marker = $ExpectedAssetMarker
  expected_cache_marker = $ExpectedCacheMarker
  live_html_asset_marker = $html.Contains($ExpectedAssetMarker)
  live_html_manifest_link = $html.Contains("manifest.webmanifest")
  live_html_start_screen = $html.Contains("screen-start")
  live_html_start_button = $html.Contains("btn-start")
  manifest_name = $manifest.name
  manifest_display = $manifest.display
  manifest_icon_count = @($manifest.icons).Count
  service_worker_cache_marker = $sw.Contains($ExpectedCacheMarker)
}

$failures = @()
if ($checks.pages_status -ne "built") { $failures += "GitHub Pages status is $($checks.pages_status), expected built." }
if ($checks.build_type -ne "workflow") { $failures += "GitHub Pages build_type is $($checks.build_type), expected workflow." }
if ($checks.latest_legacy_build_status -ne "built") { $failures += "Latest legacy Pages build is $($checks.latest_legacy_build_status), expected built." }
if ($checks.latest_workflow_conclusion -ne "success") { $failures += "Latest Pages workflow conclusion is $($checks.latest_workflow_conclusion), expected success." }
if (-not $checks.live_html_asset_marker) { $failures += "Live HTML misses expected asset marker: $ExpectedAssetMarker." }
if (-not $checks.live_html_manifest_link) { $failures += "Live HTML misses manifest link." }
if (-not $checks.live_html_start_screen) { $failures += "Live HTML misses start screen marker." }
if (-not $checks.live_html_start_button) { $failures += "Live HTML misses start button marker." }
if ($checks.manifest_name -ne "Terminator Mina UI") { $failures += "Manifest name is $($checks.manifest_name)." }
if ($checks.manifest_display -ne "standalone") { $failures += "Manifest display is $($checks.manifest_display)." }
if ($checks.manifest_icon_count -lt 3) { $failures += "Manifest has only $($checks.manifest_icon_count) icons." }
if (-not $checks.service_worker_cache_marker) { $failures += "Service worker misses expected cache marker: $ExpectedCacheMarker." }

$checks | ConvertTo-Json -Depth 4

if ($failures.Count -gt 0) {
  Write-Error ("Pages health check failed:`n" + ($failures -join "`n"))
  exit 1
}

Write-Output "Pages health check: PASS"
