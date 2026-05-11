const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File length:', c.length);

// Only do HERO edit
const heroOld = `<section class="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 bg-gradient-to-b from-forest-50 to-white">
    <div class="float mt-8 sm:mt-12">
      <img src="kelvin_logo_transparent.png" alt="PlantGlow" class="w-48 h-48 sm:w-72 sm:h-72 lg:w-[432px] lg:h-[432px] object-contain glow-leaf mx-auto">
    </div>
    <h1 class="fade-up mt-6 text-4xl sm:text-5xl font-extrabold text-forest-900 leading-tight">
      Your Personal<br class="sm:hidden"> Plant Advisor
    </h1>
    <p class="fade-up delay-100 mt-4 text-lg text-gray-600 max-w-sm">
      Get plant care tips, identify species, and watering reminders — all through WhatsApp.
    </p>
    <a href="#pricing" class="fade-up delay-200 btn-primary mt-4 inline-flex items-center gap-2 bg-forest-600 text-white font-semibold px-7 py-4 rounded-2xl shadow-lg shadow-forest-200/60 hover:bg-forest-700">
      <i data-lucide="message-circle" class="w-5 h-5"></i>
      Get Started
    </a>
    <p class="fade-up delay-300 mt-2 text-sm text-gray-400">No credit card required to start</p>
  </section>`;

const heroNew = `<section class="flex flex-col items-center text-center px-4 pt-14 pb-4 bg-gradient-to-b from-forest-50 to-white">
    <div class="float">
      <img src="kelvin_logo_transparent.png" alt="PlantGlow" class="w-80 sm:w-96 lg:w-[640px] object-contain mx-auto">
    </div>
    <h1 class="-mt-8 text-4xl sm:text-5xl font-extrabold text-forest-900">
      PlantGlow<br class="sm:hidden"> — Plant Growing Made Simple
    </h1>
    <p class="mt-1 text-base text-gray-600 max-w-md">
      One database for all your plant care needs. Save time, grow better, and enjoy indoor planting without the hassle.
    </p>
    <div id="hero-cta" class="mt-2">
      <a href="login.html" class="btn-primary inline-flex items-center gap-2 bg-forest-600 text-white font-semibold px-7 py-4 rounded-2xl shadow-lg shadow-forest-200/60 hover:bg-forest-700">
        <i data-lucide="user-plus" class="w-5 h-5"></i>
        Get Started
      </a>
      <p class="mt-1 text-sm text-gray-400">Free plant database access</p>
    </div>
  </section>`;

const idx = c.indexOf(heroOld);
if (idx !== -1) {
  c = c.substring(0, idx) + heroNew + c.substring(idx + heroOld.length);
  console.log('Hero replaced!');
} else {
  console.log('Hero pattern NOT found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');