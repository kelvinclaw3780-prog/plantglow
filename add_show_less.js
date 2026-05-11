const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// 1. Replace show-all-btn with show-less-btn and make it visible when showing all
const oldShowAllBtn = `<button onclick="showAllPlants()" id="show-all-btn" class="hidden items-center gap-2 bg-white border-2 border-gray-300 text-gray-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <i data-lucide="grid-3x3" class="w-4 h-4"></i>
          <span>Show All Plants</span>
        </button>`;

const newShowLessBtn = `<button onclick="handleShowLess()" id="show-less-btn" class="hidden items-center gap-2 bg-white border-2 border-gray-300 text-gray-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <i data-lucide="chevron-up" class="w-4 h-4"></i>
          <span>Show Less</span>
        </button>`;

c = c.replace(oldShowAllBtn, newShowLessBtn);
console.log('1. Replaced show-all-btn with show-less-btn');

// 2. Add handleShowLess function after handleBrowseAll
const handleBrowseAllEnd = c.indexOf('function handleBrowseAll()') + 150; // approximate
const afterBrowseAll = c.indexOf('function handleBrowseAll()');
const browseAllEndIdx = c.indexOf('// PLANT GRID', afterBrowseAll);
const insertPoint = browseAllEndIdx;

const showLessFunc = `

    function handleShowLess() {
      showingAll = false;
      var browseBtn = document.getElementById('browse-btn');
      var showLessBtn = document.getElementById('show-less-btn');
      if (browseBtn) {
        browseBtn.classList.remove('hidden');
        browseBtn.classList.add('inline-flex');
      }
      if (showLessBtn) {
        showLessBtn.classList.add('hidden');
        showLessBtn.classList.remove('flex');
      }
      renderPlants();
    }
`;

// Insert before // PLANT GRID
c = c.replace('// PLANT GRID', showLessFunc + '\n    // PLANT GRID');
console.log('2. Added handleShowLess function');

// 3. Update handleBrowseAll to show the Show Less button when clicking "Browse all"
const oldBrowseAll = `function handleBrowseAll() {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
      } else {
        showingAll = true;
        renderPlants();
      }
    }`;

const newBrowseAll = `function handleBrowseAll() {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
      } else {
        showingAll = true;
        var browseBtn = document.getElementById('browse-btn');
        var showLessBtn = document.getElementById('show-less-btn');
        if (browseBtn) {
          browseBtn.classList.add('hidden');
          browseBtn.classList.remove('inline-flex');
        }
        if (showLessBtn) {
          showLessBtn.classList.remove('hidden');
          showLessBtn.classList.add('flex');
        }
        renderPlants();
      }
    }`;

c = c.replace(oldBrowseAll, newBrowseAll);
console.log('3. Updated handleBrowseAll to show Show Less button');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');