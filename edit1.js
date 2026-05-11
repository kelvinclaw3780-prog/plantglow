const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File length:', c.length, 'bytes');
console.log('File loaded. Starting edits...');

// ===== EDIT 1: Hero section =====
const heroOld = `  <!-- HERO -->
  <section class="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 bg-gradient-to-b from-forest-50 to-white">
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

const heroNew = `  <!-- HERO -->
  <section class="flex flex-col items-center text-center px-4 pt-14 pb-4 bg-gradient-to-b from-forest-50 to-white">
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

const idx1 = c.indexOf(heroOld);
if (idx1 !== -1) {
  c = c.substring(0, idx1) + heroNew + c.substring(idx1 + heroOld.length);
  console.log('Edit 1 (Hero): OK, replaced at', idx1);
} else {
  console.log('Edit 1 (Hero): FAILED - pattern not found');
}

// ===== EDIT 2: Features section (replace Card 2, Card 3, Card 4) =====
const featuresOld = `        <!-- Card 2 -->
        <div class="feature-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="home" class="w-6 h-6 text-forest-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-1">Space Checker</h3>
          <p class="text-sm text-gray-500 leading-relaxed">Not sure if your space suits a plant? We'll tell you what thrives there.</p>
        </div>

        <!-- Card 3 -->
        <div class="feature-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="message-circle" class="w-6 h-6 text-forest-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-1">WhatsApp Advisor</h3>
          <p class="text-sm text-gray-500 leading-relaxed">Ask anything about your plants via WhatsApp. Instant, personal replies.</p>
        </div>

        <!-- Card 4 -->
        <div class="feature-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="bell" class="w-6 h-6 text-forest-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-1">Reminders</h3>
          <p class="text-sm text-gray-500 leading-relaxed">Never forget to water or fertilize. We send you timed reminders.</p>
        </div>`;

const featuresNew = `        <!-- Card 2 -->
        <div class="feature-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="bookmark" class="w-6 h-6 text-forest-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-1">Save Favorites</h3>
          <p class="text-sm text-gray-500 leading-relaxed">Create a free account to save your favorite plants and track your collection.</p>
        </div>

        <!-- Card 3 -->
        <div class="feature-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="search" class="w-6 h-6 text-forest-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-1">Plant Search</h3>
          <p class="text-sm text-gray-500 leading-relaxed">Search and browse plants by name, care needs, or environment.</p>
        </div>

        <!-- Card 4 -->
        <div class="feature-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="book-open" class="w-6 h-6 text-forest-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-1">Care Guides</h3>
          <p class="text-sm text-gray-500 leading-relaxed">Detailed care info for every plant — light, water, humidity, and more.</p>
        </div>`;

const idx2 = c.indexOf(featuresOld);
if (idx2 !== -1) {
  c = c.substring(0, idx2) + featuresNew + c.substring(idx2 + featuresOld.length);
  console.log('Edit 2 (Features): OK, replaced at', idx2);
} else {
  console.log('Edit 2 (Features): FAILED - pattern not found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Part 1 done!');