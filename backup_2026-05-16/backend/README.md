# PlantGlow Backend

## Setup

```bash
cd plantglow/backend
npm init -y
npm install express sqlite3
node server.js
```

Server runs at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Start registration — sends WhatsApp code |
| POST | `/api/verify-register` | Verify code — creates account |
| POST | `/api/login` | Start login — sends WhatsApp code |
| POST | `/api/verify-login` | Verify code — returns session token |
| GET | `/api/plants?subscribed=true` | Get plants (premium info if subscribed) |
| POST | `/api/payment/webhook` | Payment confirmed — activates subscription |
| GET | `/api/user/:phone` | Check user status |

## WhatsApp Integration (TODO)

Currently `sendWhatsAppMessage()` just logs to console.

**Option A — OpenClaw Agent (Kelvin's setup):**
Modify the `Registration & Login Coordinator` agent to:
1. Receive HTTP request from backend when code needs sending
2. Send WhatsApp message via OpenClaw/Telegram bridge
3. TODO: Add endpoint for agent to receive outbound message requests

**Option B — Twilio:**
```bash
npm install twilio
```
Then replace `sendWhatsAppMessage()` with Twilio client calls.

## OpenClaw Allow List Integration (TODO)

Currently `addToAllowList()` just logs to console.

To actually add numbers to OpenClaw allow list, you need to:
1. Call OpenClaw gateway API
2. Or run `openclaw allowlist add +852XXXXXXXX` via exec

## Database

SQLite file: `plantglow/backend/plantglow.db`

Tables:
- `users` — registered users
- `verification_codes` — active codes (auto-deleted after use)
- `pending_users` — registration queue

## Next Steps

1. ✅ Backend structure complete
2. ⬜ Integrate WhatsApp sending (OpenClaw agent or Twilio)
3. ⬜ Integrate OpenClaw allow list API
4. ⬜ Build login/register HTML pages
5. ⬜ Wire frontend to backend API
6. ⬜ Add remaining plants to API
7. ⬜ Test payment webhook flow
