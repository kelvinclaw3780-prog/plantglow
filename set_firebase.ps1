$json = Get-Content "C:\Users\kelvi\.openclaw\media\inbound\plantglow-firebase-adminsdk-fbsvc-fd647591b9---b921eeb2-74bb-49c2-9512-98b99b85e0cf.json" -Raw
$oneline = $json -replace '\r?\n', ''
$escaped = $oneline -replace '"', '\"'
$cmd = "railway variables set FIREBASE_SERVICE_ACCOUNT=`"$oneline`" --environment fcb0619e-7177-4337-8e25-559a7f91e719 --project 8fa9ad17-9d81-4f57-9424-5f76ec81f832"
Invoke-Expression $cmd