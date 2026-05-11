const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';

const html = fs.readFileSync(path, 'utf8');

// We need to rebuild the file with ONE script block.
// Structure:
// - Everything BEFORE script 3 (up to </footer> at ~17500)
// - One clean <script> with all the JS
// - Everything AFTER script 4's closing </script> (the modals and rest of HTML)

// Find where the old scripts are
// Script 3 (broken plantData): 17503 to 55448
// Script 4 (new plantData + funcs): 55462 to 91666
// We want to keep: script 3's start through the clean JS (script 4's content)
// But remove script 3's content and script 4's wrapper, replacing with a single clean script

const beforeScript3 = html.substring(0, 17503); // Everything up to <script> of script 3
const afterScript4Close = html.substring(91666 + 9); // Everything after </script> of script 4

// Now build one clean script from scratch
const cleanScript = `<script>
    // ============================================================
    // INIT
    // ============================================================
    lucide.createIcons();
    updateNav();
    showLoginToast();
    renderPlants();

    // ============================================================
    // LOGIN STATE
    // ============================================================
    function isLoggedIn() {
      return !!localStorage.getItem('plantglow_token');
    }

    function isSubscribed() {
      return localStorage.getItem('plantglow_subscribed') === 'true';
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
      var subscribed = isSubscribed();
      document.getElementById('nav-logged-out').style.display = loggedIn ? 'none' : '';
      document.getElementById('nav-logged-in').style.display = loggedIn ? 'flex' : 'none';
      document.getElementById('mobile-nav-logged-out').style.display = loggedIn ? 'none' : '';
      document.getElementById('mobile-nav-logged-in').style.display = loggedIn ? '' : 'none';
      if (loggedIn) {
        document.getElementById('nav-user-status').textContent = subscribed ? 'Premium *' : 'Free Plan';
      }
      lucide.createIcons();
    }

    function showLoginToast() {
      if (!isLoggedIn()) return;
      var subscribed = isSubscribed();
      var msg = subscribed
        ? 'Welcome back! You have Premium access *'
        : 'Welcome back! Upgrade to Premium for 500-char guides';
      showToast(msg, 'success');
    }

    // ============================================================
    // PLANT GRID
    // ============================================================
    var VISIBLE_COUNT = 10;
    var showingAll = false;

    function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\\'' + id + '\\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
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
      var premiumEl = document.getElementById('plant-modal-premium');
      if (subscribed) {
        premiumEl.textContent = plant.premium;
        premiumEl.classList.remove('hidden');
      } else {
        premiumEl.classList.add('hidden');
      }
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
      if (!isLoggedIn()) {
        openLoginRequiredModal();
        return;
      }
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
        premium: "Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical foliage plant native to the rainforests of Central America. This majestic plant is prized for its large, glossy, heart-shaped leaves that develop distinctive holes and splits as they mature - a process called fenestration. In its natural habitat, Monstera can climb up to 66 feet tall using aerial roots. As a houseplant, it typically reaches 6-10 feet indoors with proper care. The plant thrives in bright, indirect light but tolerates lower light conditions. Water when the top 2-3 inches of soil feel dry, and maintain humidity above 60% for best results. During growing season (spring and summer), feed monthly with a balanced liquid fertilizer diluted to half strength. Monstera is mildly toxic to pets if ingested, causing mouth irritation and digestive discomfort."
      },
      snake: {
        name: 'Snake Plant', scientific: 'Sansevieria Trifasciata',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Low to Bright', water: 'Every 2-3 weeks', humidity: 'Low to Average', temp: '15-27C',
        tips: ['Virtually indestructible - perfect for beginners', 'Let soil dry completely between waterings', 'Tolerates low light but grows faster in bright indirect light', 'Wipe leaves monthly to remove dust', 'Can survive months without watering'],
        problems: ['Mushy leaves = overwatering / root rot', 'Drooping = needs water', 'Brown tips = fluoride in water'],
        premium: "The Snake Plant, Sansevieria trifasciata, is one of the most tolerant houseplants you can grow. Native to West Africa, this architectural plant features stiff, upright leaves that can reach 2-4 feet tall, with striking green-yellow variegated patterns. Snake Plants store water in their thick rhizomes, making them extremely drought-tolerant - they can survive weeks or even months without watering. Place in any light condition from full shade to bright indirect light. Water only when the soil is completely dry, and reduce watering to once a month in winter. Overwatering is the #1 killer of Snake Plants and causes root rot quickly. Snake Plants are also excellent air purifiers, removing formaldehyde and other toxins from indoor air."
      },
      pothos: {
        name: 'Pothos', scientific: 'Epipremnum Aureum',
        img: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Weekly', humidity: 'Average to High', temp: '18-27C',
        tips: ['Heart-shaped leaves on trailing vines', 'Easy to propagate from stem cuttings', 'Tolerates low light better than most plants', 'Trim to encourage fuller, bushier growth', 'Great for hanging baskets or trained to climb'],
        problems: ['Yellow leaves = overwatering', 'Leggy stems = needs more light', 'Brown tips = underwatering or low humidity'],
        premium: "Pothos, Epipremnum aureum, is the ultimate workhorse houseplant - endlessly adaptable, incredibly easy to grow, and available in dozens of stunning varieties from classic golden to jade, marble, and neon. Native to the rainforests of French Polynesia and Southeast Asia, Pothos thrives as a trailing or climbing plant, with heart-shaped leaves that can cascade from shelves or climb moss poles up to 10 feet or longer. It tolerates low light remarkably well, though its variegation stays more vibrant with brighter indirect light. Water when the top inch of soil feels dry. To propagate, simply cut a stem with 2-3 leaves and place in water; roots develop within 2-3 weeks. Regular pruning encourages bushier growth. Pothos is toxic to pets if ingested."
      },
      fiddle: {
        name: 'Fiddle Leaf Fig', scientific: 'Ficus Lyrata',
        img: 'https://images.unsplash.com/photo-1545241047-14f37f726f1c?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Weekly', humidity: 'High (50%+)', temp: '16-24C',
        tips: ['One of the most popular statement plants', 'Large violin-shaped leaves up to 12 inches wide', 'Hates being moved - pick the right spot and leave it', 'Wipe leaves monthly to remove dust', 'Dropping leaves usually means stress from relocation'],
        problems: ['Brown spots = overwatering or temperature changes', 'Dropping leaves = stress / drafty location', 'Red edges = too much direct sun'],
        premium: "The Fiddle Leaf Fig, Ficus lyrata, is the diva of the houseplant world - stunning when thriving but notoriously finicky. Native to the tropical rainforests of Western Africa, this statement plant can grow up to 6 feet indoors, making it a dramatic focal point. Its large, violin-shaped leaves can reach 12-18 inches wide, creating an instant tropical atmosphere. Despite its reputation, the key to success is consistency: place it in bright indirect light (within 3 feet of a window), water when the top inch of soil is dry, and never move it once settled. The plant despises drafts, air conditioning vents, and radiators. Feed monthly during spring and summer with a liquid fertilizer."
      },
      peace: {
        name: 'Peace Lily', scientific: 'Spathiphyllum',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Weekly', humidity: 'High', temp: '18-26C',
        tips: ['Will dramatically droop when thirsty', 'Keep soil consistently moist but not soggy', 'Thrives in low light', 'Wipe leaves to remove dust', 'Flowers turn green as they age - normal'],
        problems: ['Brown edges = dry air or fluoride', 'Wilting despite moist soil = root rot', 'No flowers = needs more light'],
        premium: "The Peace Lily, Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty - do not panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, and bloom more readily with brighter indirect light. The plant is an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Peace Lilies are mildly toxic to pets if ingested."
      },
      spider: {
        name: 'Spider Plant', scientific: 'Chlorophytum Comosum',
        img: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=800&h=600&fit=crop',
        light: 'Medium to Bright', water: 'Weekly', humidity: 'Average', temp: '13-27C',
        tips: ['Produces dangling babies', 'Easy to propagate - just pot the babies', 'Tolerates a range of conditions', 'Brown tips from fluoride - use filtered water', 'Great air purifier (NASA study)'],
        problems: ['Brown tips = fluoride/chlorine', 'Pale leaves = needs more light', 'No babies = plant is too young'],
        premium: "The Spider Plant, Chlorophytum comosum, is a classic houseplant that has been gracing homes for generations. Native to South Africa, this resilient plant is named for its spider-like appearance, with long, arching leaves and dangling baby plantlets. The plant produces white star-shaped flowers in summer, followed by tiny plantlets that can be propagated to grow new plants - making it one of the easiest plants to multiply. Spider Plants are incredibly adaptable, thriving in temperatures between 13-27C and tolerating various light conditions. They are excellent air purifiers, shown by NASA research to remove formaldehyde and benzene from indoor environments. Spider Plants are non-toxic to pets."
      },
      zz: {
        name: 'ZZ Plant', scientific: 'Zamioculcas Zamiifolia',
        img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Monthly', humidity: 'Low', temp: '18-26C',
        tips: ['Extremely drought tolerant - err on the side of underwatering', 'Wipe leaves monthly to keep them shiny', 'Slow growing but virtually indestructible', 'Toxic if ingested - keep away from pets and children', 'Yellow leaves usually mean overwatering'],
        problems: ['Yellow leaves = overwatering', 'Drooping stems = root rot', 'Slow growth = normal, not a problem'],
        premium: "The ZZ Plant, Zamioculcas zamiifolia, is arguably the most bulletproof houseplant you can grow. Native to Eastern Africa, this plant has evolved to survive long droughts and low-light conditions, making it perfect for neglectful plant parents or office environments. Its glossy, dark green leaves grow in elegant, arching stems that add a touch of modern sophistication to any space. The plant stores water in its thick rhizomes, allowing it to survive weeks or even months without watering. The only thing that truly kills a ZZ Plant is overwatering - always let the soil dry out completely between waterings. All parts of the ZZ Plant are toxic if ingested."
      },
      aloe: {
        name: 'Aloe Vera', scientific: 'Aloe Barbadensis',
        img: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=800&h=600&fit=crop',
        light: 'Bright Direct', water: 'Every 2-3 weeks', humidity: 'Low', temp: '13-27C',
        tips: ['Loves bright, direct sunlight - perfect for sunny windowsills', 'Let soil dry COMPLETELY between waterings', 'Gel inside leaves soothes burns and skin irritation', 'Produces pups (baby plants) that can be separated', 'Use terracotta pots for better drainage'],
        problems: ['Brown tips = too much direct sun or fluoride', 'Mushy leaves = overwatered', 'Flat, curled leaves = needs water'],
        premium: "Aloe Vera is both a beautiful succulent and a practical medicinal plant, making it one of the most useful houseplants you can own. Native to the Arabian Peninsula, this plant has been used for thousands of years for its healing properties - the clear gel inside its thick, fleshy leaves soothes burns, cuts, and skin irritations when applied topically. For best results, grow Aloe in a terracotta pot with well-draining cactus soil, and place it in a sunny window where it receives at least 6 hours of bright, direct light. Water deeply but infrequently - when the soil is completely dry and the leaves show slight wrinkling. Overwatering is the most common mistake and leads to root rot, which is often fatal."
      },
      jade: {
        name: 'Jade Plant', scientific: 'Crassula Ovata',
        img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Every 2-3 weeks', humidity: 'Low', temp: '18-24C',
        tips: ['Symbol of good luck and prosperity in many cultures', 'Can live for decades with proper care', 'Prune to maintain compact shape', 'Leaves should be firm and plump when healthy', 'Red edges develop with bright light exposure'],
        problems: ['Dropping leaves = overwatering or sudden cold', 'Soft mushy stem = root rot', 'Leggy growth = needs more light'],
        premium: "The Jade Plant, Crassula ovata, is a timeless classic often called the Money Tree or Lucky Plant, believed to bring good fortune and prosperity. Native to South Africa, Jade Plants develop thick, woody stems and plump, oval-shaped leaves that store water, making them extremely drought-tolerant. With bright light and minimal watering, a Jade Plant can live for decades and grow into a small tree-like specimen up to 3 feet tall indoors. The secret to a healthy Jade is letting the soil dry completely between waterings, and providing at least 4-6 hours of bright, indirect light daily. Prune regularly to encourage bushier growth. Jade Plants are mildly toxic to pets if ingested."
      },
      calathea: {
        name: 'Calathea', scientific: 'Calathea Ornata',
        img: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Keep moist', humidity: 'High (60%+)', temp: '18-26C',
        tips: ['Leaves move throughout the day following light', 'Use filtered or rainwater to avoid fluoride', 'Keep soil consistently moist but not soggy', 'Loves humidity - perfect for bathrooms', 'Leaves fold up at night'],
        problems: ['Brown crispy edges = low humidity or fluoride', 'Curling leaves = too dry or too cold', 'Faded patterns = too much direct light'],
        premium: "Calathea, often called the Prayer Plant because its leaves fold upward in the evening like hands in prayer, is a stunning tropical plant known for its intricately patterned foliage. Native to the rainforests of Brazil, Calathea thrives in warm, humid, filtered light. The key to success is humidity - these plants crave moisture in the air and develop brown, crispy leaf edges if the air is too dry. Using filtered or distilled water is essential, as Calathea is extremely sensitive to fluoride and chlorine found in tap water. Keep the soil consistently moist but never waterlogged, and place your Calathea in a bathroom or near a humidifier. Avoid direct sunlight, which will fade its beautiful striped or patterned leaves."
      },
      birdOfParadise: {
        name: 'Bird of Paradise', scientific: 'Strelitzia Reginae',
        img: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&h=600&fit=crop',
        light: 'Bright Direct', water: 'Weekly', humidity: 'Average', temp: '18-30C',
        tips: ['Needs several years before producing flowers', 'Split leaves are normal, not a problem', 'Grows large - needs space to spread', 'Outdoor plants can reach 6-10 feet', 'Feed monthly during growing season'],
        problems: ['No flowers = needs more light or is too young', 'Split leaves = natural, not preventable', 'Drooping = needs water'],
        premium: "The Bird of Paradise, Strelitzia reginae, is one of the most dramatic and exotic houseplants you can grow. Named for its stunning orange and blue flowers that resemble a bird in flight, this plant is native to South Africa. As a houseplant, it features large, paddle-shaped leaves that can reach 12-18 inches long, creating a bold architectural statement. Bird of Paradise requires bright, direct sunlight to thrive and will even bloom indoors if given enough light. Water weekly during the growing season, allowing the top inch of soil to dry between waterings. Reduce watering in winter. This is a fast-growing plant that needs room. With patience, your Bird of Paradise will reward you with its spectacular crane-like flowers."
      },
      rubberPlant: {
        name: 'Rubber Plant', scientific: 'Ficus Elastica',
        img: 'https://images.unsplash.com/photo-1597054750841-4b6d95f4c4e4?w=800&h=600&fit=crop',
        light: 'Medium to Bright', water: 'Weekly', humidity: 'Average', temp: '16-27C',
        tips: ['Wipe leaves regularly to keep them shiny', 'Start with dark green variety if new to plant care', 'Can grow 6-8 feet indoors with good care', 'Milky sap can irritate skin - wear gloves when pruning', 'Rotate quarterly for even growth'],
        problems: ['Yellow leaves = overwatering', 'Dropping leaves = sudden temperature change', 'Leggy growth = needs more light'],
        premium: "The Rubber Plant, Ficus elastica, is a bold and statuesque houseplant that makes an instant impact in any room. Native to Southeast Asia where it grows as a towering tree, the Rubber Plant has been cultivated for its handsome, glossy leaves that can be dark green, burgundy, or variegated. Despite its tropical origins, it adapts well to indoor conditions and can grow 6-8 feet tall. The key to keeping a Rubber Plant happy is consistent, bright, indirect light and regular watering when the top inch of soil dries out. Its large, waxy leaves accumulate dust easily - wipe them monthly with a damp cloth. When pruning, be aware that the plant exudes a milky white sap that can irritate skin, so wear gloves."
      },
      orchid: {
        name: 'Orchid', scientific: 'Phalaenopsis',
        img: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Weekly', humidity: 'Medium (50%)', temp: '18-26C',
        tips: ['Water with ice cubes for easy, measured watering', 'Roots turn silver when dry, green when moist', 'After flowers fall, cut stem above a node to rebloom', 'Transparent pots help you monitor root health', 'Never let water sit in the crown (center)'],
        problems: ['Yellow leaves = too much water or direct sun', 'Bud blast = sudden temperature or humidity change', 'No rebloom = needs more light or a rest period'],
        premium: "Orchids, particularly the Phalaenopsis or Moth Orchid, are the most popular flowering houseplants, beloved for their elegant, long-lasting blooms that can persist for months. Despite their delicate appearance, Phalaenopsis orchids are surprisingly adaptable and make excellent houseplants for beginners. The secret to orchid success is proper watering - place 3 ice cubes on the potting medium weekly, allowing the water to melt slowly and soak in without drowning the roots. Orchids prefer bright, indirect light. After your orchid finishes flowering, do not discard it - cut the flower spike just above a node, and with proper care, it will produce new blooms within months. With their exotic beauty and surprisingly approachable care requirements, orchids bring elegance and color to any space."
      },
      fern: {
        name: 'Boston Fern', scientific: 'Nephrolepis Exaltata',
        img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop',
        light: 'Medium Indirect', water: 'Keep moist', humidity: 'High (60%+)', temp: '16-24C',
        tips: ['Loves bathrooms where humidity is naturally high', 'Mist daily or use a pebble tray with water', 'Never let soil dry out completely', 'Dropping leaves usually means low humidity', 'Perfect for hanging baskets'],
        problems: ['Brown crispy fronds = dry air or inconsistent watering', 'Yellow leaves = overwatering', 'Pale fronds = needs more light'],
        premium: "The Boston Fern, Nephrolepis exaltata, is the quintessential Victorian-era houseplant that has never gone out of style. Native to tropical regions worldwide, this lush, arching fern produces delicate fronds that can cascade up to 3 feet, making it absolutely stunning in hanging baskets or on plant stands. While beautiful, Boston Ferns are notoriously particular about their environment - they crave high humidity and consistent moisture, thriving in bathrooms, kitchens, or anywhere with naturally humid air. Daily misting is essential, or place the pot on a pebble tray filled with water. Never allow the soil to dry out completely, but also avoid waterlogging. Bright, indirect light keeps the fronds a healthy deep green. If your fern is dropping leaves, it is usually a sign the air is too dry."
      },
      philodendron: {
        name: 'Philodendron', scientific: 'Philodendron Hederaceum',
        img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Weekly', humidity: 'Average', temp: '18-27C',
        tips: ['Heart-shaped leaves on trailing vines', 'Easy to propagate from stem cuttings', 'Tolerates low light better than most plants', 'Trim to encourage fuller, bushier growth', 'Aerial roots are normal, not a problem'],
        problems: ['Yellow leaves = overwatering', 'Leggy stems = needs more light', 'Brown tips = underwatering or low humidity'],
        premium: "Philodendrons are the workhorses of the houseplant world - endlessly adaptable, incredibly easy to grow, and available in hundreds of varieties. The classic Heartleaf Philodendron features beautiful heart-shaped leaves on trailing vines that can grow 10 feet or longer, making it perfect for high shelves or trained to climb a moss pole. Native to the rainforests of Central and South America, Philodendrons thrive in warm, humid conditions where they receive dappled light. They tolerate low light remarkably well, though growth will be faster with bright, indirect light. Water when the top inch of soil feels dry. To propagate, simply cut a stem with 2-3 leaves and place in water; roots develop within 2-3 weeks. Regular pruning encourages bushier growth. Philodendrons are toxic to pets if ingested."
      },
      chineseEvergreen: {
        name: 'Chinese Evergreen', scientific: 'Aglaonema',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Every 1-2 weeks', humidity: 'Average', temp: '18-26C',
        tips: ['One of the best low-light plants available', 'Allow soil to dry between waterings', 'Variegated types need more light', 'Excellent air purifier (NASA study)', 'Slow growing but very long-lived'],
        problems: ['Yellow leaves = overwatering', 'Brown tips = dry air or fluoride', 'Drooping = needs water'],
        premium: "Chinese Evergreen, Aglaonema, is the ultimate low-maintenance houseplant for anyone who wants beautiful foliage without the fuss. Native to the tropical forests of Asia, this plant has been cultivated into dozens of stunning varieties featuring leaves in shades of green, silver, pink, red, and cream. Chinese Evergreen is famously tolerant of low light, irregular watering, and varying humidity levels, making it ideal for offices, bedrooms, or dimly lit corners. Despite its resilience, it does appreciate consistent watering when the top inch of soil dries out and occasional feeding during the growing season. Its slow-growing nature means it rarely needs repotting and maintains its compact shape for years. NASA studies have confirmed Chinese Evergreen is an excellent air purifier, removing toxins like benzene and formaldehyde from indoor air."
      },
      dracaena: {
        name: 'Dracaena', scientific: 'Dracaena Marginata',
        img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Medium to Bright', water: 'Every 1-2 weeks', humidity: 'Average', temp: '18-26C',
        tips: ['Tall, dramatic plant with spiky leaves', 'Sensitive to fluoride - use filtered water', 'Brown tips are common and usually harmless', 'Can grow 6 feet or more indoors', 'Leaves have red or pink margins on some varieties'],
        problems: ['Brown tips = fluoride in tap water', 'Yellow leaves = overwatering', 'Soft lower stems = root rot'],
        premium: "Dracaena, particularly the Dragon Tree variety with its spiky, red-edged leaves, is a striking architectural plant that adds drama and vertical interest to any space. Native to Madagascar and other tropical regions, Dracaena can grow 6 feet or more indoors, making it a fantastic floor plant for corners, entryways, or rooms with high ceilings. Despite its exotic appearance, Dracaena is remarkably adaptable and tolerates low light, irregular watering, and average humidity. The main issue is fluoride sensitivity - this plant is particularly sensitive to chemicals in tap water, which cause brown leaf tips. Using filtered or distilled water solves this problem. Water thoroughly when the top half of soil is dry. Dracaena is effective at removing indoor air pollutants including formaldehyde, xylene, and toluene."
      },
      mint: {
        name: 'Mint', scientific: 'Mentha',
        img: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&h=600&fit=crop',
        light: 'Bright Indirect', water: 'Keep moist', humidity: 'Average', temp: '13-24C',
        tips: ['Grows vigorously - great for beginners', 'Harvest regularly to prevent flowering', 'Loves moist soil but hates waterlogged roots', 'Can be grown in water alone indefinitely', 'Spearmint and peppermint are easiest varieties'],
        problems: ['Flowering = harvest time, flavor changes', 'Leggy growth = needs more light', 'Yellow leaves = overwatering'],
        premium: "Mint is the ultimate culinary herb and one of the easiest plants to grow, perfect for beginners who want both beauty and utility. Whether you grow classic Spearmint, invigorating Peppermint, or exotic Chocolate Mint, this vigorous herb spreads rapidly and produces abundantly, giving you fresh leaves for teas, cocktails, salads, and more year-round. Mint thrives in bright, indirect light and prefers consistently moist soil - never let it dry out completely. Keep the soil damp like a wrung-out sponge. Harvest mint regularly by cutting stems above a pair of leaves; this encourages bushier growth and prevents the plant from flowering. Once mint flowers, the leaves lose their sweet flavor and become bitter. Mint can be grown in containers to control its spreading habit."
      },
      basil: {
        name: 'Basil', scientific: 'Ocimum Basilicum',
        img: 'https://images.unsplash.com/photo-1618375531916-83646dbc5591?w=800&h=600&fit=crop',
        light: 'Bright Direct', water: 'Daily', humidity: 'Average', temp: '20-30C',
        tips: ['Needs at least 6 hours of direct sunlight', 'Pinch off flowers to keep leaves growing', 'Harvest from the top to encourage bushiness', 'Loves heat - wait until nights are warm to transplant', 'Genovese basil is best for pesto'],
        problems: ['Wilting = needs water immediately', 'Flowering = leaves turn bitter', 'Black spots = cold damage or disease'],
        premium: "Basil is the king of culinary herbs and the crown jewel of any kitchen garden, prized for its aromatic, flavorful leaves essential in Italian cuisine, Thai dishes, and more. Whether you are growing classic Sweet Basil, spicy Thai Basil, or aromatic Genovese for authentic pesto, this warm-season annual demands bright, direct sunlight - at least 6 hours daily - and consistent warmth to thrive. Water your basil daily during hot weather, keeping the soil consistently moist but not waterlogged. The secret to a productive basil plant is regular harvesting - pinch or cut stems from the top, always above a pair of leaves, to encourage branching and prevent flowering. Once basil flowers, the leaves lose their sweet flavor and become bitter. With its lush, fragrant foliage and versatility in the kitchen, basil rewards you all summer long."
      }
    };
</script>`;

// Rebuild the file
const result = beforeScript3 + '\n' + cleanScript + '\n' + afterScript4Close;
fs.writeFileSync(path, result, 'utf8');
console.log('Done!');
console.log('Before:', beforeScript3.length, 'Clean script:', cleanScript.length, 'After:', afterScript4Close.length);
console.log('Total:', result.length);