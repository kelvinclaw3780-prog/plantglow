try {
  $r = Invoke-WebRequest -Uri "https://plantglow-production.up.railway.app/index.html" -UseBasicParsing -TimeoutSec 10
  Write-Host "Status=$($r.StatusCode) Length=$($r.Content.Length)"
} catch {
  Write-Host "FAILED: $($_.Exception.Message)"
}