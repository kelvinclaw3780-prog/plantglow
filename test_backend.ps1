try {
    $req = [Net.WebRequest]::Create('https://plantglow-production.up.railway.app/api/auth/check-email')
    $req.Method = 'POST'
    $req.ContentType = 'application/json'
    $req.Timeout = 10000
    $req.ServicePoint.Expect100Continue = $false
    $body = [Text.Encoding]::UTF8.GetBytes('{"email":"test@test.com"}')
    $req.GetRequestStream().Write($body, 0, $body.Length)
    $req.GetRequestStream().Close()
    $resp = $req.GetResponse()
    Write-Host "Status: $($resp.StatusCode)"
    $resp.Close()
} catch {
    Write-Host "Error: $($_.Exception.InnerException.Message)"
}