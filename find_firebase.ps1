$content = Get-Content login.html -Raw
$match = [regex]::Match($content, 'firebaseConfig\s*=\s*\{[^}]+\}')
if ($match.Success) {
    Write-Host $match.Value
} else {
    Write-Host "NOT FOUND"
}