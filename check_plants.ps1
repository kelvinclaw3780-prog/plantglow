$content = Get-Content 'C:\Users\kelvi\.openclaw\workspace-appcreator\plantglow\index.html' -Raw
$pattern = "var plantData = \{([\s\S]*?)\};\s*</script>"
if ($content -match $pattern) {
    $plantBlock = $matches[1]
    $entries = [regex]::Matches($plantBlock, "^\s+([a-zA-Z0-9_]+): \{\r?\n\s+name: '([^']+)',\r?\n\s+img: '([^']+)'", [System.Text.RegularExpressions.RegexOptions]::Multiline)
    foreach ($e in $entries) {
        $key = $e.Groups[1].Value
        $name = $e.Groups[2].Value
        $img = $e.Groups[3].Value
        Write-Host "$key | $name | $img"
    }
}