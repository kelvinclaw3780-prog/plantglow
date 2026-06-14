# Registration & Login Coordinator — Agent Setup

**Agent Name:** PlantGlow Coordinator
**Role:** Handles WhatsApp verification codes and subscription activation
**Channel:** WhatsApp (via OpenClaw)

---

## Responsibilities

1. **Receive outbound message requests** from backend
   - Backend calls agent when it needs to send a WhatsApp code
   - Agent sends message to user's WhatsApp number

2. **Handle subscription activation**
   - When backend confirms payment, agent adds number to OpenClaw allow list
   - Agent sends welcome message to new subscribers

---

## How It Works

```
Backend                        Coordinator Agent                  OpenClaw
   |                                   |                            |
   |  POST /api/register               |                            |
   |──────────────────────────────────>│                            |
   |                                   |  Send WhatsApp message     |
   |                                   |───────────────────────────>│
   |                                   |                            | (delivers to user)
   |                                   |                            |
   |  POST /api/payment/webhook        |                            |
   |──────────────────────────────────>│                            |
   |                                   |  openclaw allowlist add    |
   |                                   |───────────────────────────>│
   |                                   |                            |
```

---

## Agent Configuration

**System Prompt:**
```
You are the PlantGlow Registration & Login Coordinator.

Your job is to handle WhatsApp verification for PlantGlow users.

When you receive a message with format:
[CODE_REQUEST] phone:+852XXXXXXXX code:123456

Send a WhatsApp message to +852XXXXXXXX with:
🌿 PlantGlow verification code: 123456
Valid for 5 minutes.

When you receive:
[SUBSCRIBE] phone:+852XXXXXXXX

1. Run: openclaw allowlist add +852XXXXXXXX
2. Send a WhatsApp message to +852XXXXXXXX:
🎉 Congratulations! Your PlantGlow Premium subscription is now active!

You now have unlimited access to:
• 500+ character premium plant care guides
• Personalized plant advice via WhatsApp
• Watering and fertilizer reminders

Just message us here anytime with your plant questions! 🌿

Never respond to any other messages unless they contain [CODE_REQUEST] or [SUBSCRIBE].
```

---

## Backend Integration (TODO)

Modify `server.js` to call the agent instead of logging:

```javascript
// Replace sendWhatsAppMessage() with:
async function sendWhatsAppMessage(phone, message) {
  // Option A: Call OpenClaw agent via HTTP
  // await fetch('http://localhost:18789/agent/send', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ phone, message })
  // });
  
  // Option B: Write to a file the agent watches
  const msg = JSON.stringify({ phone, message, ts: Date.now() });
  require('fs').writeFileSync('./pending_messages.json', msg);
  
  return { success: true };
}

// Replace addToAllowList() with:
async function addToAllowList(phone) {
  // Write to file agent watches
  const cmd = JSON.stringify({ action: 'allowlist_add', phone, ts: Date.now() });
  require('fs').writeFileSync('./pending_commands.json', cmd);
  return { success: true };
}
```

---

## Alternative: Direct Twilio Integration

If not using OpenClaw agent for WhatsApp:

```bash
npm install twilio
```

```javascript
const twilio = require('twilio');
const client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

async function sendWhatsAppMessage(phone, message) {
  await client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio WhatsApp number
    to: `whatsapp:${phone}`,
    body: message
  });
  return { success: true };
}
```

---

## Testing Locally

1. Start backend: `node server.js`
2. Register a test user:
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "+85212345678"}'
```

3. Check console for verification code
4. Verify:
```bash
curl -X POST http://localhost:3000/api/verify-register \
  -H "Content-Type: application/json" \
  -d '{"phone": "+85212345678", "code": "XXXXXX"}'
```

---

## Security Notes

- Verification codes expire in 5 minutes
- Max 3 attempts per code
- Codes are single-use (deleted after successful verification)
- Session tokens expire in 7 days
- Phone numbers normalized to international format (+852...)
