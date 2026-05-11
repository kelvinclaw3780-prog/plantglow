const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File length:', c.length);

// Features section
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

const idx = c.indexOf(featuresOld);
if (idx !== -1) {
  c = c.substring(0, idx) + featuresNew + c.substring(idx + featuresOld.length);
  console.log('Features replaced!');
} else {
  console.log('Features pattern NOT found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow\index.html', c, 'utf8');
console.log('Done!');