$lines = Get-Content index.html
$inside = $false
$filtered = @()
foreach ($l in $lines) {
    if ($l -match '<!-- inline icon sprite') {
        $inside = $true
        continue
    }
    if ($inside -and $l -match '</svg>') {
        $inside = $false
        continue
    }
    if ($inside) {
        continue
    }
    $filtered += $l
}
$filtered | Set-Content index.html
