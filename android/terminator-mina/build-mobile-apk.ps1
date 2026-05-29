param(
  [string]$AndroidSdk = "$env:LOCALAPPDATA\Android\Sdk",
  [string]$OutputDir = "D:\TerminatorStorage\codex_outputs\phase5_mobile_pwa"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$BuildRoot = Join-Path $ProjectRoot "build"
$GenDir = Join-Path $BuildRoot "gen"
$ObjDir = Join-Path $BuildRoot "obj"
$DexDir = Join-Path $BuildRoot "dex"
$ResDir = Join-Path $ProjectRoot "res"
$Manifest = Join-Path $ProjectRoot "AndroidManifest.xml"
$AndroidJar = Join-Path $AndroidSdk "platforms\android-36\android.jar"
$BuildTools = Join-Path $AndroidSdk "build-tools\37.0.0"
$Aapt = Join-Path $BuildTools "aapt.exe"
$D8 = Join-Path $BuildTools "d8.bat"
$ZipAlign = Join-Path $BuildTools "zipalign.exe"
$ApkSigner = Join-Path $BuildTools "apksigner.bat"
$JavaHome = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
$Javac = Join-Path $JavaHome "bin\javac.exe"
$KeyTool = Join-Path $JavaHome "bin\keytool.exe"
$Keystore = Join-Path $BuildRoot "terminator-mina-debug.keystore"
$SigningConfigPath = Join-Path $BuildRoot "debug-signing.local.json"

function New-LocalSigningSecret {
  $bytes = New-Object byte[] 24
  [Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
  return [Convert]::ToBase64String($bytes).TrimEnd("=")
}

function Get-DebugSigningConfig {
  $storePass = $env:TERMINATOR_MINA_DEBUG_STOREPASS
  $keyPass = $env:TERMINATOR_MINA_DEBUG_KEYPASS
  if ($storePass -and $keyPass) {
    return [pscustomobject]@{
      storepass = $storePass
      keypass = $keyPass
      source = "environment"
    }
  }

  if (Test-Path -LiteralPath $SigningConfigPath) {
    $local = Get-Content -LiteralPath $SigningConfigPath -Raw | ConvertFrom-Json
    if ($local.storepass -and $local.keypass) {
      return [pscustomobject]@{
        storepass = [string]$local.storepass
        keypass = [string]$local.keypass
        source = "local_ignored_file"
      }
    }
  }

  if (Test-Path -LiteralPath $Keystore) {
    throw "Existing debug keystore found, but no local signing config is available. Set TERMINATOR_MINA_DEBUG_STOREPASS and TERMINATOR_MINA_DEBUG_KEYPASS or recreate the ignored build folder."
  }

  $generated = [pscustomobject]@{
    storepass = New-LocalSigningSecret
    keypass = New-LocalSigningSecret
    created_at = (Get-Date).ToString("s")
    note = "Local debug signing only. Do not commit this file."
  }
  $generated | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath $SigningConfigPath -Encoding UTF8
  return [pscustomobject]@{
    storepass = [string]$generated.storepass
    keypass = [string]$generated.keypass
    source = "generated_local_ignored_file"
  }
}

New-Item -ItemType Directory -Force -Path $BuildRoot, $GenDir, $ObjDir, $DexDir, $OutputDir | Out-Null
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue $GenDir\*, $ObjDir\*, $DexDir\*

& $Aapt package -f -m -J $GenDir -M $Manifest -S $ResDir -I $AndroidJar
if ($LASTEXITCODE -ne 0) { throw "aapt resource generation failed" }
& $Javac -source 8 -target 8 -bootclasspath $AndroidJar -d $ObjDir `
  (Join-Path $GenDir "app\terminator\mina\R.java") `
  (Join-Path $ProjectRoot "src\app\terminator\mina\MainActivity.java")
if ($LASTEXITCODE -ne 0) { throw "javac failed" }
$ClassFiles = Get-ChildItem -Path $ObjDir -Recurse -Filter *.class | ForEach-Object { $_.FullName }
& $D8 --min-api 23 --lib $AndroidJar --output $DexDir @ClassFiles
if ($LASTEXITCODE -ne 0) { throw "d8 failed" }

$UnsignedApk = Join-Path $BuildRoot "terminator-mina-unsigned.apk"
$AlignedApk = Join-Path $BuildRoot "terminator-mina-aligned.apk"
$SignedApk = Join-Path $OutputDir "terminator-mina-phase5-debug.apk"
$Signing = Get-DebugSigningConfig

& $Aapt package -f -M $Manifest -S $ResDir -I $AndroidJar -F $UnsignedApk $DexDir
if ($LASTEXITCODE -ne 0) { throw "aapt apk package failed" }
& $ZipAlign -f 4 $UnsignedApk $AlignedApk
if ($LASTEXITCODE -ne 0) { throw "zipalign failed" }

if (-not (Test-Path $Keystore)) {
  & $KeyTool -genkeypair -v `
    -keystore $Keystore `
    -alias terminator_mina_debug `
    -storepass $Signing.storepass `
    -keypass $Signing.keypass `
    -keyalg RSA `
    -keysize 2048 `
    -validity 10000 `
    -dname "CN=Terminator Mina,O=Terminator,C=US" | Out-Null
}

& $ApkSigner sign `
  --ks $Keystore `
  --ks-pass "pass:$($Signing.storepass)" `
  --key-pass "pass:$($Signing.keypass)" `
  --out $SignedApk `
  $AlignedApk
if ($LASTEXITCODE -ne 0) { throw "apksigner sign failed" }

& $ApkSigner verify --verbose $SignedApk
if ($LASTEXITCODE -ne 0) { throw "apksigner verify failed" }
Get-Item $SignedApk
