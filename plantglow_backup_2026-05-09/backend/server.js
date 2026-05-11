/**
 * PlantGlow Backend Server
 * 
 * Handles:
 * - User registration & login (WhatsApp verification)
 * - Payment confirmation → adds to OpenClaw allow list
 * - Plant data API (premium descriptions for paid users)
 * 
 * Run: node server.js
 * Requires: Node.js + SQLite (npm install below)
 */

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Database Setup ─────────────────────────────────────────────────────────
const db = new sqlite3.Database('./plantglow.db', (err) => {
  if (err) console.error('DB connection error:', err);
  else console.log('📦 SQLite connected to plantglow.db');
});

// Create tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE NOT NULL,
      verified INTEGER DEFAULT 0,
      subscribed INTEGER DEFAULT 0,
      subscribed_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Verification codes table
  db.run(`
    CREATE TABLE IF NOT EXISTS verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      attempts INTEGER DEFAULT 0,
      type TEXT DEFAULT 'login',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Pending registrations (before verification)
  db.run(`
    CREATE TABLE IF NOT EXISTS pending_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      verified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve frontend

// ─── Helpers ────────────────────────────────────────────────────────────────
function isLocalhost(req) {
  return req.hostname === 'localhost' || req.hostname === '127.0.0.1';
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

function isCodeExpired(expiresAt) {
  return new Date() > new Date(expiresAt);
}

function isPhoneValid(phone) {
  // Accepts: +852XXXXXXXX, 852XXXXXXXX, +XXXXXXXXXXX (international formats)
  const cleaned = phone.replace(/[\s\-]/g, '');
  return /^\+?[\d]{8,15}$/.test(cleaned);
}

function normalizePhone(phone) {
  return phone.replace(/[\s\-\(\)]/g, '').replace(/^0/, '+852');
}

// ─── WhatsApp Message Sending ───────────────────────────────────────────────
async function sendWhatsAppMessage(phone, message, req) {
  console.log(`[WHATSAPP] To: ${phone}`);
  console.log(`[WHATSAPP] Message: ${message}`);
  
  // TEST MODE: Return code in response for localhost
  if (isLocalhost(req)) {
    // Extract 6-digit code from message
    const codeMatch = message.match(/\b(\d{6})\b/);
    return { success: true, test_mode: true, code: codeMatch ? codeMatch[1] : null };
  }
  
  // TODO: Integrate with OpenClaw agent or Twilio for production
  return { success: true };
}

// ─── OpenClaw Allow List Integration ───────────────────────────────────────
// PLACEHOLDER: Replace with actual OpenClaw CLI or API call
async function addToAllowList(phone) {
  console.log(`[OPENCLAW] Adding to allow list: ${phone}`);
  
  // TODO: Call OpenClaw gateway API or CLI
  // Example: openclaw allowlist add +852XXXXXXXX
  
  return { success: true, phone };
}

// ─── API Routes ─────────────────────────────────────────────────────────────

/**
 * POST /api/register
 * Body: { phone: "+852XXXXXXXX" }
 * 
 * Starts registration: generates code, sends via WhatsApp, creates pending user
 */
app.post('/api/register', async (req, res) => {
  const { phone } = req.body;
  
  if (!phone || !isPhoneValid(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  
  const normalized = normalizePhone(phone);
  
  // Check if already registered
  db.get('SELECT * FROM users WHERE phone = ?', [normalized], async (err, row) => {
    if (row) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }
    
    // Generate verification code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 mins
    
    // Store in pending_users and verification_codes
    db.run('INSERT OR REPLACE INTO pending_users (phone, verified) VALUES (?, 0)', [normalized]);
    db.run('INSERT INTO verification_codes (phone, code, expires_at, type) VALUES (?, ?, ?, ?)', 
      [normalized, code, expiresAt, 'register']);
    
    // Send code via WhatsApp
    const whatsappResult = await sendWhatsAppMessage(normalized, 
      `🌿 PlantGlow verification code: ${code}\n\nValid for 5 minutes.`,
      req
    );
    
    const response = { 
      success: true, 
      message: 'Verification code sent to your WhatsApp',
      phone: normalized.slice(-8) + 'XXXX' // Mask phone in response
    };
    
    // TEST MODE: Include code in response for localhost
    if (whatsappResult.test_mode && whatsappResult.code) {
      response.test_code = whatsappResult.code;
      response.message = 'TEST MODE: Code shown below (WhatsApp sending disabled)';
    }
    
    res.json(response);
  });
});

/**
 * POST /api/verify-register
 * Body: { phone: "+852XXXXXXXX", code: "123456" }
 * 
 * Verifies code and creates正式 account
 */
app.post('/api/verify-register', (req, res) => {
  const { phone, code } = req.body;
  const normalized = normalizePhone(phone);
  
  db.get('SELECT * FROM verification_codes WHERE phone = ? AND type = ? ORDER BY id DESC LIMIT 1', 
    [normalized, 'register'], (err, row) => {
    
    if (!row) {
      return res.status(400).json({ error: 'No verification code found. Please request a new one.' });
    }
    
    if (isCodeExpired(row.expires_at)) {
      return res.status(400).json({ error: 'Code expired. Please request a new one.' });
    }
    
    if (row.attempts >= 3) {
      return res.status(400).json({ error: 'Too many attempts. Please request a new code.' });
    }
    
    if (row.code !== code) {
      db.run('UPDATE verification_codes SET attempts = attempts + 1 WHERE id = ?', [row.id]);
      return res.status(400).json({ error: 'Incorrect code.' });
    }
    
    // Success — create user
    db.run('INSERT INTO users (phone, verified) VALUES (?, 1)', [normalized]);
    db.run('UPDATE pending_users SET verified = 1 WHERE phone = ?', [normalized]);
    db.run('DELETE FROM verification_codes WHERE phone = ?', [normalized]);
    
    res.json({ success: true, message: 'Account created successfully!' });
  });
});

/**
 * POST /api/login
 * Body: { phone: "+852XXXXXXXX" }
 * 
 * Sends verification code for login
 */
app.post('/api/login', async (req, res) => {
  const { phone } = req.body;
  
  if (!phone || !isPhoneValid(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  
  const normalized = normalizePhone(phone);
  
  db.get('SELECT * FROM users WHERE phone = ? AND verified = 1', [normalized], async (err, row) => {
    if (!row) {
      return res.status(404).json({ error: 'Account not found. Please register first.' });
    }
    
    // Generate code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    
    db.run('INSERT INTO verification_codes (phone, code, expires_at, type) VALUES (?, ?, ?, ?)',
      [normalized, code, expiresAt, 'login']);
    
    const whatsappResult = await sendWhatsAppMessage(normalized,
      `🔐 PlantGlow login code: ${code}\n\nValid for 5 minutes.`,
      req
    );
    
    const response = { success: true, message: 'Login code sent to your WhatsApp' };
    
    // TEST MODE: Include code in response for localhost
    if (whatsappResult.test_mode && whatsappResult.code) {
      response.test_code = whatsappResult.code;
      response.message = 'TEST MODE: Code shown below (WhatsApp sending disabled)';
    }
    
    res.json(response);
  });
});

/**
 * POST /api/verify-login
 * Body: { phone: "+852XXXXXXXX", code: "123456" }
 * 
 * Verifies code and returns session token
 */
app.post('/api/verify-login', (req, res) => {
  const { phone, code } = req.body;
  const normalized = normalizePhone(phone);
  
  db.get('SELECT * FROM verification_codes WHERE phone = ? AND type = ? ORDER BY id DESC LIMIT 1',
    [normalized, 'login'], (err, row) => {
    
    if (!row) {
      return res.status(400).json({ error: 'No login code found. Please request a new one.' });
    }
    
    if (isCodeExpired(row.expires_at)) {
      return res.status(400).json({ error: 'Code expired. Please request a new one.' });
    }
    
    if (row.attempts >= 3) {
      return res.status(400).json({ error: 'Too many attempts. Please request a new code.' });
    }
    
    if (row.code !== code) {
      db.run('UPDATE verification_codes SET attempts = attempts + 1 WHERE id = ?', [row.id]);
      return res.status(400).json({ error: 'Incorrect code.' });
    }
    
    // Success — generate session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
    
    // Store session (simplified — use Redis in production)
    db.run('DELETE FROM verification_codes WHERE phone = ?', [normalized]);
    
    // Check subscription status
    db.get('SELECT subscribed FROM users WHERE phone = ?', [normalized], (err, user) => {
      res.json({
        success: true,
        token,
        expires_at: expiresAt,
        subscribed: user?.subscribed === 1
      });
    });
  });
});

/**
 * GET /api/plants
 * Headers: Authorization: Bearer <token>
 * 
 * Returns plant data with free info for all logged-in users.
 * Premium 500-char description only included for paid subscribers.
 */
app.get('/api/plants', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // TODO: Validate token and get user
  // For now, check 'subscribed' query param
  const subscribed = req.query.subscribed === 'true';
  
  const plants = [
    {
      id: 'monstera',
      name: 'Monstera Deliciosa',
      scientific: 'Monstera Deliciosa',
      img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=600&fit=crop',
      light: 'Medium Light',
      water: 'Weekly',
      humidity: 'High (60-80%)',
      temp: '18-27°C',
      tips: [
        'Prefers bright, indirect light — direct sun burns leaves',
        'Water when top 2-3cm of soil is dry',
        'Loves humidity — mist leaves or use a pebble tray',
        'Wipe dust off leaves monthly',
        'Feed monthly during spring and summer'
      ],
      problems: [
        'Yellow leaves = overwatering',
        'Brown tips = low humidity',
        'No fenestrations = needs more light'
      ],
      premium: subscribed ? 'Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical foliage plant native to the rainforests of Central America. This majestic plant is prized for its large, glossy, heart-shaped leaves that develop distinctive holes and splits as they mature — a process called fenestration. In its natural habitat, Monstera can climb up to 66 feet tall using aerial roots that anchor into tree bark. As a houseplant, it typically reaches 6-10 feet indoors with proper care. The plant thrives in bright, indirect light but tolerates lower light conditions. Water when the top 2-3 inches of soil feel dry, and maintain humidity above 60% for best results. During growing season (spring and summer), feed monthly with a balanced liquid fertilizer diluted to half strength. Monstera is mildly toxic to pets if ingested, causing mouth irritation and digestive discomfort.' : null
    },
    {
      id: 'snake',
      name: 'Snake Plant',
      scientific: 'Sansevieria Trifasciata',
      img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
      light: 'Low to Bright',
      water: 'Every 2-3 weeks',
      humidity: 'Low to Average',
      temp: '15-27°C',
      tips: [
        'Thrives on neglect — perfect for beginners',
        'Water only when soil is completely dry',
        'Tolerates low light but grows faster in bright light',
        'Avoid overwatering — root rot is the #1 killer',
        'Clean leaves with damp cloth occasionally'
      ],
      problems: [
        'Mushy leaves = overwatered',
        'Drooping = needs water',
        'Pale leaves = too much direct sun'
      ],
      premium: subscribed ? 'The Snake Plant, scientifically known as Sansevieria trifasciata, is one of the most tolerant houseplants on the planet. Native to West Africa, this architectural plant features stiff, sword-like leaves that grow vertically, making it perfect for tight spaces and modern interiors. The plant stores water in its thick, succulent-like leaves, allowing it to survive weeks without watering. Snake plants are exceptional air purifiers — NASA studies have shown they can remove toxins like formaldehyde and benzene from indoor air. They thrive in virtually any light condition, from dark corners to bright windows, though growth will be slower in low light. Water sparingly — every 2-3 weeks in summer and monthly in winter. The only real killer is overwatering, which leads to root rot. If you tend to forget to water your plants, the Snake Plant is your ideal companion.' : null
    },
    {
      id: 'pothos',
      name: 'Pothos',
      scientific: 'Epipremnum Aureum',
      img: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=800&h=600&fit=crop',
      light: 'Low to Medium',
      water: 'Weekly',
      humidity: 'Average to High',
      temp: '18-27°C',
      tips: [
        'Excellent trailing plant for shelves or hanging baskets',
        'Let soil dry between waterings',
        'Variegation fades in low light',
        'Propagates easily in water',
        'Trim vines to encourage bushier growth'
      ],
      problems: [
        'Leggy growth = needs more light',
        'Brown leaf tips = underwatering',
        'Yellow leaves = overwatering'
      ],
      premium: subscribed ? 'Pothos, officially known as Epipremnum aureum, is the ultimate trailing houseplant and one of the easiest plants to grow indoors. Originally from the Solomon Islands in the South Pacific, this versatile vine can trail up to 10 feet or more, making it perfect for hanging baskets, high shelves, or trained to climb a moss pole. The plant features heart-shaped leaves in various shades of green, with cultivars offering golden, marble, or neon variegation. Pothos is incredibly forgiving — it tolerates low light, irregular watering, and varying humidity levels without complaint. To propagate, simply cut a stem with 2-3 leaves and place in water; roots develop within 2-3 weeks. When watering, let the top inch of soil dry out completely. One of the best air-purifying plants, Pothos helps remove indoor air pollutants. The plant is toxic to pets if ingested, causing mouth and throat irritation.' : null
    },
    {
      id: 'fiddle',
      name: 'Fiddle Leaf Fig',
      scientific: 'Ficus Lyrata',
      img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=600&fit=crop',
      light: 'Bright Indirect',
      water: 'Weekly',
      humidity: 'High (50%+)',
      temp: '16-24°C',
      tips: [
        'Needs consistent bright indirect light',
        'Water when top inch of soil is dry',
        'Hates being moved — pick a spot',
        'Rotate quarterly for even growth',
        'Avoid cold drafts'
      ],
      problems: [
        'Brown spots = overwatering or fungal',
        'Dropping leaves = stress',
        'Red edges = too much direct sun'
      ],
      premium: subscribed ? 'The Fiddle Leaf Fig, or Ficus lyrata, is the diva of the houseplant world — stunning when thriving but notoriously finicky. Native to the tropical rainforests of Western Africa, this statement plant can grow up to 6 feet indoors, making it a dramatic focal point in living rooms and offices. Its large, violin-shaped leaves can reach 12-18 inches wide, creating an instant tropical atmosphere. Despite its reputation, the key to success is consistency: place it in bright indirect light (within 3 feet of a window), water when the top inch of soil is dry, and never move it once settled. The plant despises drafts, air conditioning vents, and radiators. Brown spots on leaves indicate overwatering or sudden temperature changes, while dropping leaves usually signal stress from relocation. Feed monthly during spring and summer with a liquid fertilizer. With patience and consistent care, the Fiddle Leaf Fig becomes a stunning, living piece of art.' : null
    },
    {
      id: 'peace',
      name: 'Peace Lily',
      scientific: 'Spathiphyllum',
      img: 'peace-lily.png',
      light: 'Low to Medium',
      water: 'Weekly',
      humidity: 'High',
      temp: '18-26°C',
      tips: [
        'Will dramatically droop when thirsty',
        'Keep soil consistently moist but not soggy',
        'Thrives in low light',
        'Wipe leaves to remove dust',
        'Flowers turn green as they age — normal'
      ],
      problems: [
        'Brown edges = dry air or fluoride',
        'Wilting despite moist soil = root rot',
        'No flowers = needs more light'
      ],
      premium: subscribed ? 'The Peace Lily, scientifically named Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes (often mistaken for petals) that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty — don\'t panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, though they\'ll bloom more readily with brighter indirect light. The plant is also an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Brown leaf tips often indicate fluoride sensitivity from tap water — use filtered water if possible. Peace Lilies are mildly toxic to pets and humans if ingested, causing mouth pain and digestive discomfort. With proper care, these plants can bloom multiple times per year, adding beauty to any space.' : null
    },
    {
      id: 'spider',
      name: 'Spider Plant',
      scientific: 'Chlorophytum Comosum',
      img: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=800&h=600&fit=crop',
      light: 'Medium to Bright',
      water: 'Weekly',
      humidity: 'Average',
      temp: '13-27°C',
      tips: [
        'Produces dangling "babies"',
        'Easy to propagate — just pot the babies',
        'Tolerates a range of conditions',
        'Brown tips from fluoride — use filtered water',
        'Great air purifier (NASA study)'
      ],
      problems: [
        'Brown tips = fluoride/chlorine',
        'Pale leaves = needs more light',
        'No babies = plant is too young'
      ],
      premium: subscribed ? 'The Spider Plant, Chlorophytum comosum, is a classic houseplant that has been gracing homes for generations. Native to South Africa, this resilient plant is named for its spider-like appearance, with long, arching leaves and dangling baby plantlets that resemble spiders on a web. The plant produces white star-shaped flowers in summer, followed by tiny plantlets that can be propagated to grow new plants — making it one of the easiest plants to multiply. Spider Plants are incredibly adaptable, thriving in temperatures between 13-27°C and tolerating various light conditions, though growth is more vigorous in brighter indirect light. They\'re excellent air purifiers, shown by NASA research to remove formaldehyde and benzene from indoor environments. The main issue to watch for is brown leaf tips, typically caused by fluoride or chlorine in tap water — switching to filtered or rainwater solves this. Spider Plants are non-toxic to pets, making them a pet-friendly choice. The plantlets, or "babies," can be placed in water until roots develop, then potted in well-draining soil to grow an entirely new plant.' : null
    }
  ];
  
  res.json({ plants, subscribed });
});

/**
 * POST /api/payment/webhook
 * Body: { phone: "+852XXXXXXXX", success: true }
 * 
 * Called when payment is confirmed. Adds user to OpenClaw allow list.
 */
app.post('/api/payment/webhook', async (req, res) => {
  const { phone, success } = req.body;
  const normalized = normalizePhone(phone);
  
  if (!success) {
    return res.json({ received: true });
  }
  
  // Update subscription status
  db.run('UPDATE users SET subscribed = 1, subscribed_at = ? WHERE phone = ?',
    [new Date().toISOString(), normalized], async (err) => {
    
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Add to OpenClaw allow list
    await addToAllowList(normalized);
    
    // Notify user via WhatsApp
    await sendWhatsAppMessage(normalized,
      `🎉 Congratulations! Your PlantGlow Premium subscription is now active!\n\n` +
      `You now have unlimited access to:\n` +
      `• 500+ character premium plant care guides\n` +
      `• Personalized plant advice via WhatsApp\n` +
      `• Watering and fertilizer reminders\n\n` +
      `Just message us here anytime with your plant questions! 🌿`
    );
    
    res.json({ success: true, message: 'Subscription activated and allow list updated' });
  });
});

/**
 * GET /api/user/:phone
 * Returns user status (for debugging)
 */
app.get('/api/user/:phone', (req, res) => {
  const normalized = normalizePhone(req.params.phone);
  db.get('SELECT phone, verified, subscribed, subscribed_at, created_at FROM users WHERE phone = ?',
    [normalized], (err, row) => {
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
});

/**
 * GET /api/me
 * Headers: Authorization: Bearer <token>
 * Returns current user info based on session token
 */
app.get('/api/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.slice(7); // Remove 'Bearer '
  
  // TODO: Validate token against stored sessions
  // For now, return mock data based on token presence
  // Real implementation: check sessions table, return user info
  
  res.json({ 
    authenticated: true,
    token,
    // TODO: Replace with actual user data from database
    subscribed: req.query.subscribed === 'true'
  });
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 PlantGlow backend running at http://localhost:${PORT}`);
  console.log(`📱 Test frontend at http://localhost:${PORT}/index.html\n`);
});
