$ROOT = "D:\zentry_hub_projects\zentry_portfolio"
$OUTPUT = "$env:TEMP\zentry_audit.txt"
$lines = [System.Collections.Generic.List[string]]::new()

function Add { param($t) $lines.Add($t) }
function Sep { $lines.Add(("=" * 60)) }

Add "ZENTRY HUB - PROJECT AUDIT"
Add "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Sep

# --- FOLDER TREE ---
Add ""
Sep
Add "  1. FOLDER TREE"
Sep
Add ""

function Show-Tree {
    param($path, $indent = "")
    $skip = @('node_modules','.git','dist','build','.next','.vercel')
    $items = Get-ChildItem -Path $path -Force -ErrorAction SilentlyContinue |
             Where-Object { $_.Name -notin $skip } |
             Sort-Object { $_.PSIsContainer } -Descending
    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            Add "$indent[DIR] $($item.Name)"
            Show-Tree -path $item.FullName -indent "$indent    "
        } else {
            $sz = if ($item.Length -gt 1024) { "$([math]::Round($item.Length/1024,1))KB" } else { "$($item.Length)B" }
            Add "$indent$($item.Name) ($sz)"
        }
    }
}

Show-Tree -path $ROOT

# --- FILE CONTENTS ---
Add ""
Sep
Add "  2. FILE CONTENTS"
Sep

$scanDirs = @(
    "$ROOT\backend\src",
    "$ROOT\backend\prisma",
    "$ROOT\frontend\src"
)
$exts = @('.js','.jsx','.ts','.tsx','.json','.prisma','.css')

foreach ($dir in $scanDirs) {
    Add ""
    Add ("=" * 60)
    Add "DIR: $dir"
    Add ("=" * 60)

    if (-not (Test-Path $dir)) {
        Add "  *** DIRECTORY DOES NOT EXIST ***"
        continue
    }

    $files = Get-ChildItem -Path $dir -Recurse -File -ErrorAction SilentlyContinue |
             Where-Object { $exts -contains $_.Extension -and $_.FullName -notmatch 'node_modules' } |
             Sort-Object FullName

    if ($files.Count -eq 0) {
        Add "  *** DIRECTORY IS EMPTY - NO SOURCE FILES ***"
        continue
    }

    foreach ($file in $files) {
        $rel = $file.FullName.Replace($ROOT, "").TrimStart('\')
        Add ""
        Add "FILE: $rel ($($file.Length) bytes)"
        Add ("-" * 50)
        if ($file.Length -gt 80000) {
            Add "[FILE TOO LARGE TO DISPLAY]"
        } else {
            try {
                $content = Get-Content $file.FullName -Raw -Encoding UTF8
                Add $content
            } catch {
                Add "[COULD NOT READ FILE]"
            }
        }
        Add ("-" * 50)
    }
}

# --- PACKAGE JSON ---
Add ""
Sep
Add "  3. PACKAGE.JSON"
Sep

foreach ($pkg in @("$ROOT\backend\package.json","$ROOT\frontend\package.json")) {
    Add ""
    Add ">> $pkg"
    if (Test-Path $pkg) {
        Add (Get-Content $pkg -Raw)
    } else {
        Add "MISSING"
    }
}

# --- ENV CHECK ---
Add ""
Sep
Add "  4. ENV FILE CHECK"
Sep

foreach ($envFile in @("$ROOT\backend\.env","$ROOT\frontend\.env.local")) {
    Add ""
    Add ">> $envFile"
    if (Test-Path $envFile) {
        $envLines = Get-Content $envFile
        foreach ($l in $envLines) {
            if ($l -match "^([^=]+)=(.*)$") {
                $k = $matches[1].Trim()
                $v = $matches[2].Trim().Trim('"')
                $status = if ($v -eq "" -or $v -match "REPLACE|YOUR_|placeholder|xxxx|USER:PASSWORD") {
                    "EMPTY/PLACEHOLDER"
                } else {
                    "SET ($($v.Length) chars)"
                }
                Add "  $k = $status"
            } else {
                Add "  $l"
            }
        }
    } else {
        Add "  MISSING"
    }
}

# --- MISSING FILES ---
Add ""
Sep
Add "  5. MISSING FILES CHECK"
Sep
Add ""

$required = @(
    "backend\src\server.js",
    "backend\src\routes\auth.js",
    "backend\src\routes\projects.js",
    "backend\src\routes\contact.js",
    "backend\src\routes\testimonials.js",
    "backend\src\middleware\auth.js",
    "backend\src\middleware\rateLimiter.js",
    "backend\src\config\db.js",
    "backend\src\config\cloudinary.js",
    "backend\prisma\schema.prisma",
    "backend\prisma\seed.js",
    "backend\.env",
    "backend\vercel.json",
    "frontend\src\App.jsx",
    "frontend\src\main.jsx",
    "frontend\src\index.css",
    "frontend\src\pages\Home.jsx",
    "frontend\src\pages\Services.jsx",
    "frontend\src\pages\Work.jsx",
    "frontend\src\pages\About.jsx",
    "frontend\src\pages\Contact.jsx",
    "frontend\src\pages\Testimonials.jsx",
    "frontend\src\pages\NotFound.jsx",
    "frontend\src\pages\admin\AdminLogin.jsx",
    "frontend\src\pages\admin\AdminDashboard.jsx",
    "frontend\src\components\layout\Navbar.jsx",
    "frontend\src\components\layout\Footer.jsx",
    "frontend\src\components\layout\PageTransition.jsx",
    "frontend\src\components\ui\AnimatedSection.jsx",
    "frontend\src\components\ui\SectionHeader.jsx",
    "frontend\src\components\ui\Spinner.jsx",
    "frontend\src\components\admin\ProtectedRoute.jsx",
    "frontend\src\services\api.js",
    "frontend\src\services\projectsApi.js",
    "frontend\src\services\testimonialsApi.js",
    "frontend\src\services\contactApi.js",
    "frontend\src\services\adminApi.js",
    "frontend\src\context\AuthContext.jsx",
    "frontend\src\hooks\ScrollToTop.jsx",
    "frontend\src\hooks\useScrolled.js",
    "frontend\src\utils\validators.js",
    "frontend\src\assets\images\logo.png",
    "frontend\vite.config.js",
    "frontend\vercel.json"
)

$ok = 0
$miss = 0
$missingList = @()

foreach ($f in $required) {
    $full = "$ROOT\$f"
    if (Test-Path $full) {
        $sz = (Get-Item $full).Length
        Add "  [OK]      $f ($sz bytes)"
        $ok++
    } else {
        Add "  [MISSING] $f"
        $missingList += $f
        $miss++
    }
}

Add ""
Add "SUMMARY: $ok OK  |  $miss MISSING"
if ($missingList.Count -gt 0) {
    Add ""
    Add "MISSING LIST:"
    foreach ($m in $missingList) { Add "  - $m" }
}

# --- WRITE AND OPEN ---
$lines | Set-Content -Path $OUTPUT -Encoding UTF8

Write-Host ""
Write-Host "  Audit done! Opening in Notepad..." -ForegroundColor Green
Write-Host "  File: $OUTPUT" -ForegroundColor Cyan
Write-Host ""

Start-Process notepad.exe -ArgumentList $OUTPUT