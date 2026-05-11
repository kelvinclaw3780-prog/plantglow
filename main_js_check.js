<script>
    // ============================================================
    // INIT (wrapped in DOMContentLoaded to ensure plantData is defined first)
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
      lucide.createIcons();
      updateNav();
      showLoginToast();
      renderPlants();
    });
    // ============================================================
    // LOGIN STATE
    // ============================================================
    function isLoggedIn() {
      return !!localStorage.getItem('plantglow_token');
    }

    function logout() {
      localStorage.removeItem('plantglow_token');
      localStorage.removeItem('plantglow_subscribed');
      showingAll = false;
      updateNav();
      renderPlants();
      showToast('Logged out successfully', 'info');
    }

    function updateNav() {
      var loggedIn = isLoggedIn();
      document.getElementById('nav-logged-out').style.display = loggedIn ? 'none' : '';
      document.getElementById('nav-logged-in').style.display = loggedIn ? 'flex' : 'none';
      document.getElementById('mobile-nav-logged-out').style.display = loggedIn ? 'none' : '';
      document.getElementById('mobile-nav-logged-in').style.display = loggedIn ? '' : 'none';
      if (loggedIn) {
        document.getElementById('nav-user-status').textContent = 'Logged in';
      }
      lucide.createIcons();
    }

    function showLoginToast() {
      if (!isLoggedIn()) return;
      showToast('Welcome back!', 'success');
    }

    // ============================================================
    // PLANT GRID
    // ============================================================
    var VISIBLE_COUNT = 10;
    var showingAll = false;

    function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\'' + id + '\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }

    function renderPlants() {
      var grid = document.getElementById('plant-grid');
      var browseSection = document.getElementById('browse-all-section');
      var browseText = document.getElementById('browse-all-text');
      var loggedIn = isLoggedIn();
      var plantIds = Object.keys(plantData);
      var showCount = (loggedIn || showingAll) ? plantIds.length : VISIBLE_COUNT;
      var plantsToShow = plantIds.slice(0, showCount);
      grid.innerHTML = plantsToShow.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');
      if (loggedIn || showingAll) {
        browseSection.style.display = 'none';
      } else {
        browseSection.style.display = '';
        browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }
      lucide.createIcons();
    }

    function handleBrowseAll() {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
      } else {
        showingAll = true;
        renderPlants();
      }
    }

    // ============================================================
    // TOAST
    // ============================================================
    function showToast(message, type) {
      var toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-[200] px-6 py-3 rounded-xl shadow-lg text-white font-medium text-sm flex items-center gap-2 transition-all duration-300 ';
      toast.className += (type === 'success' ? 'bg-forest-600' : type === 'info' ? 'bg-blue-500' : 'bg-red-500');
      toast.innerHTML = '<span>' + (type === 'success' ? 'OK' : 'INFO') + '</span><span>' + message + '</span>';
      document.body.appendChild(toast);
      setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.marginTop = '-20px';
        setTimeout(function() { toast.remove(); }, 300);
      }, 3000);
    }

    // ============================================================
    // MOBILE MENU
    // ============================================================
    function toggleMenu() {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    }

    function closeMobileMenu() {
      document.getElementById('mobile-menu').classList.add('hidden');
    }

    function handleEmailSubmit(e) {
      e.preventDefault();
      var email = document.getElementById('email-input').value;
      showToast('Early access signed up: ' + email, 'success');
      document.getElementById('email-input').value = '';
    }

    // ============================================================
    // MODALS
    // ============================================================
    function openLoginRequiredModal() {
      document.getElementById('login-required-modal').classList.remove('hidden');
      document.getElementById('login-required-modal').classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeLoginRequiredModal() {
      document.getElementById('login-required-modal').classList.add('hidden');
      document.getElementById('login-required-modal').classList.remove('flex');
      document.body.style.overflow = '';
    }

    function openPlantModal(plantId) {
      var plant = plantData[plantId];
      if (!plant) return;
      var subscribed = isSubscribed();
      document.getElementById('plant-modal-img').src = plant.img;
      document.getElementById('plant-modal-name').textContent = plant.name;
      document.getElementById('plant-modal-scientific').textContent = plant.scientific;
      document.getElementById('plant-modal-light').textContent = plant.light;
      document.getElementById('plant-modal-water').textContent = plant.water;
      document.getElementById('plant-modal-humidity').textContent = plant.humidity;
      document.getElementById('plant-modal-temp').textContent = plant.temp;
      var tipsEl = document.getElementById('plant-modal-tips');
      tipsEl.innerHTML = '';
      plant.tips.forEach(function(tip) {
        var li = document.createElement('li');
        li.textContent = tip;
        tipsEl.appendChild(li);
      });
      var problemsEl = document.getElementById('plant-modal-problems');
      problemsEl.innerHTML = '';
      plant.problems.forEach(function(p) {
        var li = document.createElement('li');
        li.textContent = p;
        problemsEl.appendChild(li);
      });
      
      document.getElementById('plant-modal').classList.remove('hidden');
      document.getElementById('plant-modal').classList.add('flex');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    }

    function closePlantModal() {
      document.getElementById('plant-modal').classList.add('hidden');
      document.getElementById('plant-modal').classList.remove('flex');
      document.body.style.overflow = '';
    }

    function handlePlantClick(plantId) {
      openPlantModal(plantId);
    }

    // ============================================================
    // PLANT DATA (19 plants, all clean ASCII)
    // ============================================================
    var plantData = {
      monstera: {
        name: 'Monstera Deliciosa', scientific: 'Monstera Deliciosa',
        img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=600&fit=crop',
        light: 'Medium Light', water: 'Weekly', humidity: 'High (60-80%)', temp: '18-27C',
        tips: ['Prefers bright, indirect light - direct sun burns leaves', 'Water when top 2-3cm of soil is dry', 'Loves humidity - mist leaves or use a pebble tray', 'Feed monthly during spring and summer', 'Aerial roots are normal, not a problem'],
        problems: ['Yellow leaves = overwatering', 'No splits = needs more light', 'Brown edges = dry air or fluoride'],
      snake: {
        name: 'Snake Plant', scientific: 'Sansevieria Trifasciata',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Low to Bright', water: 'Every 2-3 weeks', humidity: 'Low to Average', temp: '15-27C',
        tips: ['Virtually indestructible - perfect for beginners', 'Let soil dry completely between waterings', 'Tolerates low light but grows faster in bright indirect light', 'Wipe leaves monthly to remove dust', 'Can survive months without watering'],
        problems: ['Mushy leaves = overwatering / root rot', 'Drooping = needs water', 'Brown tips = fluoride in water'],
      pothos: {
        name: 'Pothos', scientific: 'Epipremnum Aureum',
        img: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Weekly', humidity: 'Average to High', temp: '18-27C',
        tips: ['Heart-shaped leaves on trailing vines', 'Easy to propagate from stem cuttings', 'Tolerates low light better than most plants', 'Trim to encourage fuller, bushier growth', 'Great for hanging baskets or trained to climb'],
        problems: ['Yellow leaves = overwatering', 'Leggy stems = needs more light', 'Brown tips = underwatering or low humidity'],
      fiddle: {
        name: 'Fiddle Leaf Fig', scientific: 'Ficus Lyrata',
        img: 'https://images.unsplash.com/photo-1545241047-14f37f726f1c?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Weekly', humidity: 'High (50%+)', temp: '16-24C',
        tips: ['One of the most popular statement plants', 'Large violin-shaped leaves up to 12 inches wide', 'Hates being moved - pick the right spot and leave it', 'Wipe leaves monthly to remove dust', 'Dropping leaves usually means stress from relocation'],
        problems: ['Brown spots = overwatering or temperature changes', 'Dropping leaves = stress / drafty location', 'Red edges = too much direct sun'],
      peace: {
        name: 'Peace Lily', scientific: 'Spathiphyllum',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Weekly', humidity: 'High', temp: '18-26C',
        tips: ['Will dramatically droop when thirsty', 'Keep soil consistently moist but not soggy', 'Thrives in low light', 'Wipe leaves to remove dust', 'Flowers turn green as they age - normal'],
        problems: ['Brown edges = dry air or fluoride', 'Wilting despite moist soil = root rot', 'No flowers = needs more light'],
      spider: {
        name: 'Spider Plant', scientific: 'Chlorophytum Comosum',
        img: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=800&h=600&fit=crop',
        light: 'Medium to Bright', water: 'Weekly', humidity: 'Average', temp: '13-27C',
        tips: ['Produces dangling babies', 'Easy to propagate - just pot the babies', 'Tolerates a range of conditions', 'Brown tips from fluoride - use filtered water', 'Great air purifier (NASA study)'],
        problems: ['Brown tips = fluoride/chlorine', 'Pale leaves = needs more light', 'No babies = plant is too young'],
      zz: {
        name: 'ZZ Plant', scientific: 'Zamioculcas Zamiifolia',
        img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Monthly', humidity: 'Low', temp: '18-26C',
        tips: ['Extremely drought tolerant - err on the side of underwatering', 'Wipe leaves monthly to keep them shiny', 'Slow growing but virtually indestructible', 'Toxic if ingested - keep away from pets and children', 'Yellow leaves usually mean overwatering'],
        problems: ['Yellow leaves = overwatering', 'Drooping stems = root rot', 'Slow growth = normal, not a problem'],
      aloe: {
        name: 'Aloe Vera', scientific: 'Aloe Barbadensis',
        img: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=800&h=600&fit=crop',
        light: 'Bright Direct', water: 'Every 2-3 weeks', humidity: 'Low', temp: '13-27C',
        tips: ['Loves bright, direct sunlight - perfect for sunny windowsills', 'Let soil dry COMPLETELY between waterings', 'Gel inside leaves soothes burns and skin irritation', 'Produces pups (baby plants) that can be separated', 'Use terracotta pots for better drainage'],
        problems: ['Brown tips = too much direct sun or fluoride', 'Mushy leaves = overwatered', 'Flat, curled leaves = needs water'],
      jade: {
        name: 'Jade Plant', scientific: 'Crassula Ovata',
        img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Every 2-3 weeks', humidity: 'Low', temp: '18-24C',
        tips: ['Symbol of good luck and prosperity in many cultures', 'Can live for decades with proper care', 'Prune to maintain compact shape', 'Leaves should be firm and plump when healthy', 'Red edges develop with bright light exposure'],
        problems: ['Dropping leaves = overwatering or sudden cold', 'Soft mushy stem = root rot', 'Leggy growth = needs more light'],
      calathea: {
        name: 'Calathea', scientific: 'Calathea Ornata',
        img: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Keep moist', humidity: 'High (60%+)', temp: '18-26C',
        tips: ['Leaves move throughout the day following light', 'Use filtered or rainwater to avoid fluoride', 'Keep soil consistently moist but not soggy', 'Loves humidity - perfect for bathrooms', 'Leaves fold up at night'],
        problems: ['Brown crispy edges = low humidity or fluoride', 'Curling leaves = too dry or too cold', 'Faded patterns = too much direct light'],
      birdOfParadise: {
        name: 'Bird of Paradise', scientific: 'Strelitzia Reginae',
        img: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&h=600&fit=crop',
        light: 'Bright Direct', water: 'Weekly', humidity: 'Average', temp: '18-30C',
        tips: ['Needs several years before producing flowers', 'Split leaves are normal, not a problem', 'Grows large - needs space to spread', 'Outdoor plants can reach 6-10 feet', 'Feed monthly during growing season'],
        problems: ['No flowers = needs more light or is too young', 'Split leaves = natural, not preventable', 'Drooping = needs water'],
      rubberPlant: {
        name: 'Rubber Plant', scientific: 'Ficus Elastica',
        img: 'https://images.unsplash.com/photo-1597054750841-4b6d95f4c4e4?w=800&h=600&fit=crop',
        light: 'Medium to Bright', water: 'Weekly', humidity: 'Average', temp: '16-27C',
        tips: ['Wipe leaves regularly to keep them shiny', 'Start with dark green variety if new to plant care', 'Can grow 6-8 feet indoors with good care', 'Milky sap can irritate skin - wear gloves when pruning', 'Rotate quarterly for even growth'],
        problems: ['Yellow leaves = overwatering', 'Dropping leaves = sudden temperature change', 'Leggy growth = needs more light'],
      orchid: {
        name: 'Orchid', scientific: 'Phalaenopsis',
        img: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Weekly', humidity: 'Medium (50%)', temp: '18-26C',
        tips: ['Water with ice cubes for easy, measured watering', 'Roots turn silver when dry, green when moist', 'After flowers fall, cut stem above a node to rebloom', 'Transparent pots help you monitor root health', 'Never let water sit in the crown (center)'],
        problems: ['Yellow leaves = too much water or direct sun', 'Bud blast = sudden temperature or humidity change', 'No rebloom = needs more light or a rest period'],
      fern: {
        name: 'Boston Fern', scientific: 'Nephrolepis Exaltata',
        img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop',
        light: 'Medium Indirect', water: 'Keep moist', humidity: 'High (60%+)', temp: '16-24C',
        tips: ['Loves bathrooms where humidity is naturally high', 'Mist daily or use a pebble tray with water', 'Never let soil dry out completely', 'Dropping leaves usually means low humidity', 'Perfect for hanging baskets'],
        problems: ['Brown crispy fronds = dry air or inconsistent watering', 'Yellow leaves = overwatering', 'Pale fronds = needs more light'],
      philodendron: {
        name: 'Philodendron', scientific: 'Philodendron Hederaceum',
        img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Weekly', humidity: 'Average', temp: '18-27C',
        tips: ['Heart-shaped leaves on trailing vines', 'Easy to propagate from stem cuttings', 'Tolerates low light better than most plants', 'Trim to encourage fuller, bushier growth', 'Aerial roots are normal, not a problem'],
        problems: ['Yellow leaves = overwatering', 'Leggy stems = needs more light', 'Brown tips = underwatering or low humidity'],
      chineseEvergreen: {
        name: 'Chinese Evergreen', scientific: 'Aglaonema',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Every 1-2 weeks', humidity: 'Average', temp: '18-26C',
        tips: ['One of the best low-light plants available', 'Allow soil to dry between waterings', 'Variegated types need more light', 'Excellent air purifier (NASA study)', 'Slow growing but very long-lived'],
        problems: ['Yellow leaves = overwatering', 'Brown tips = dry air or fluoride', 'Drooping = needs water'],
      dracaena: {
        name: 'Dracaena', scientific: 'Dracaena Marginata',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Medium to Bright', water: 'Every 1-2 weeks', humidity: 'Average', temp: '18-26C',
        tips: ['Tall, dramatic plant with spiky leaves', 'Sensitive to fluoride - use filtered water', 'Brown tips are common and usually harmless', 'Can grow 6 feet or more indoors', 'Leaves have red or pink margins on some varieties'],
        problems: ['Brown tips = fluoride in tap water', 'Yellow leaves = overwatering', 'Soft lower stems = root rot'],
      mint: {
        name: 'Mint', scientific: 'Mentha',
        img: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Keep moist', humidity: 'Average', temp: '13-24C',
        tips: ['Grows vigorously - great for beginners', 'Harvest regularly to prevent flowering', 'Loves moist soil but hates waterlogged roots', 'Can be grown in water alone indefinitely', 'Spearmint and peppermint are easiest varieties'],
        problems: ['Flowering = harvest time, flavor changes', 'Leggy growth = needs more light', 'Yellow leaves = overwatering'],
      basil: {
        name: 'Basil', scientific: 'Ocimum Basilicum',
        img: 'https://images.unsplash.com/photo-1618375531916-83646dbc5591?w=800&h=600&fit=crop',
        light: 'Bright Direct', water: 'Daily', humidity: 'Average', temp: '20-30C',
        tips: ['Needs at least 6 hours of direct sunlight', 'Pinch off flowers to keep leaves growing', 'Harvest from the top to encourage bushiness', 'Loves heat - wait until nights are warm to transplant', 'Genovese basil is best for pesto'],
        problems: ['Wilting = needs water immediately', 'Flowering = leaves turn bitter', 'Black spots = cold damage or disease'],
        premium: "Basil is the king of culinary herbs and the crown jewel of any kitchen garden, prized for its aromatic, flavorful leaves essential in Italian cuisine, Thai dishes, and more. Whether you are growing classic Sweet Basil, spicy Thai Basil, or aromatic Genovese for authentic pesto, this warm-season annual demands bright, direct sunlight - at least 6 hours daily - and consistent warmth to thrive. Water your basil daily during hot weather, keeping the soil consistently moist but not waterlogged. The secret to a productive basil plant is regular harvesting - pinch or cut stems from the top, always above a pair of leaves, to encourage branching and prevent flowering. Once basil flowers, the leaves lose their sweet flavor and become bitter. With its lush, fragrant foliage and versatility in the kitchen, basil rewards you all summer long."
      }
    };


