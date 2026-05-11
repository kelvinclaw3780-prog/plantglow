const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';

// Read the existing file
let content = fs.readFileSync(path, 'utf8');

// Find the plantData section bounds
const start = content.indexOf('// Plant data (free info for all, premium for subscribers)');
const endMarker = '// --- Login Check ---';
const end = content.indexOf(endMarker, start);

console.log('plantData starts at', start, 'ends at', end);

// Extract the clean prefix and suffix
const prefix = content.substring(0, start + '// Plant data (free info for all, premium for subscribers)\n'.length);
const suffix = content.substring(end);

console.log('Prefix length:', prefix.length, 'Suffix length:', suffix.length);

// Clean plantData - all ASCII-safe, using double quotes for premium strings
const plantData = `const plantData = {
  monstera: {
    name: 'Monstera Deliciosa', scientific: 'Monstera Deliciosa',
    img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=600&fit=crop',
    light: 'Medium Light', water: 'Weekly', humidity: 'High (60-80%)', temp: '18-27C',
    tips: ['Prefers bright, indirect light - direct sun burns leaves', 'Water when top 2-3cm of soil is dry', 'Loves humidity - mist leaves or use a pebble tray', 'Feed monthly during spring and summer', 'Aerial roots are normal, not a problem'],
    problems: ['Yellow leaves = overwatering', 'No splits = needs more light', 'Brown edges = dry air or fluoride'],
    premium: "Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical foliage plant native to the rainforests of Central America. This majestic plant is prized for its large, glossy, heart-shaped leaves that develop distinctive holes and splits as they mature - a process called fenestration. In its natural habitat, Monstera can climb up to 66 feet tall using aerial roots that anchor into tree bark. As a houseplant, it typically reaches 6-10 feet indoors with proper care. The plant thrives in bright, indirect light but tolerates lower light conditions. Water when the top 2-3 inches of soil feel dry, and maintain humidity above 60% for best results. During growing season (spring and summer), feed monthly with a balanced liquid fertilizer diluted to half strength. Monstera is mildly toxic to pets if ingested, causing mouth irritation and digestive discomfort."
  },
  snake: {
    name: 'Snake Plant', scientific: 'Sansevieria Trifasciata',
    img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
    light: 'Low to Bright', water: 'Every 2-3 weeks', humidity: 'Low to Average', temp: '15-27C',
    tips: ['Virtually indestructible - perfect for beginners', 'Let soil dry completely between waterings', 'Tolerates low light but grows faster in bright indirect light', 'Wipe leaves monthly to remove dust', 'Can survive months without watering'],
    problems: ['Mushy leaves = overwatering / root rot', 'Drooping = needs water', 'Brown tips = fluoride in water'],
    premium: "The Snake Plant, Sansevieria trifasciata, is one of the most tolerant houseplants you can grow. Native to West Africa, this architectural plant features stiff, upright leaves that can reach 2-4 feet tall, with striking green-yellow variegated patterns that add modern flair to any space. Snake Plants store water in their thick rhizomes, making them extremely drought-tolerant - they can survive weeks or even months without watering. Place in any light condition from full shade to bright indirect light, though growth will be faster and more vibrant with more light. Water only when the soil is completely dry, and reduce watering to once a month in winter. Overwatering is the #1 killer of Snake Plants and causes root rot quickly. Snake Plants are also excellent air purifiers, removing formaldehyde and other toxins from indoor air. With its sculptural form and near-indestructible nature, the Snake Plant is perfect for offices, bedrooms, or anyone who forgets to water their plants."
  },
  pothos: {
    name: 'Pothos', scientific: 'Epipremnum Aureum',
    img: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=800&h=600&fit=crop',
    light: 'Low to Medium', water: 'Weekly', humidity: 'Average to High', temp: '18-27C',
    tips: ['Heart-shaped leaves on trailing vines', 'Easy to propagate from stem cuttings', 'Tolerates low light better than most plants', 'Trim to encourage fuller, bushier growth', 'Great for hanging baskets or trained to climb'],
    problems: ['Yellow leaves = overwatering', 'Leggy stems = needs more light', 'Brown tips = underwatering or low humidity'],
    premium: "Pothos, Epipremnum aureum, is the ultimate workhorse houseplant - endlessly adaptable, incredibly easy to grow, and available in dozens of stunning varieties from classic golden to jade, marble, and neon. Native to the rainforests of French Polynesia and Southeast Asia, Pothos thrives as a trailing or climbing plant, with heart-shaped leaves that can cascade from shelves or climb moss poles up to 10 feet or longer. It tolerates low light remarkably well, though its variegation stays more vibrant with brighter indirect light. Water when the top inch of soil feels dry - Pothos signals thirst by drooping slightly, then perks right back up after watering. To propagate, simply cut a stem with 2-3 leaves and place in water; roots develop within 2-3 weeks. Regular pruning encourages bushier growth rather than long, leggy vines. Pothos is toxic to pets if ingested, causing mouth irritation and difficulty swallowing, so place it out of reach of curious cats and dogs."
  },
  fiddle: {
    name: 'Fiddle Leaf Fig', scientific: 'Ficus Lyrata',
    img: 'https://images.unsplash.com/photo-1545241047-14f37f726f1c?w=800&h=600&fit=crop',
    light: 'Bright Indirect', water: 'Weekly', humidity: 'High (50%+)', temp: '16-24C',
    tips: ['One of the most popular statement plants', 'Large violin-shaped leaves up to 12 inches wide', 'Hates being moved - pick the right spot and leave it', 'Wipe leaves monthly to remove dust', 'Dropping leaves usually means stress from relocation'],
    problems: ['Brown spots = overwatering or temperature changes', 'Dropping leaves = stress / drafty location', 'Red edges = too much direct sun'],
    premium: "The Fiddle Leaf Fig, Ficus lyrata, is the diva of the houseplant world - stunning when thriving but notoriously finicky. Native to the tropical rainforests of Western Africa, this statement plant can grow up to 6 feet indoors, making it a dramatic focal point in living rooms and offices. Its large, violin-shaped leaves can reach 12-18 inches wide, creating an instant tropical atmosphere. Despite its reputation, the key to success is consistency: place it in bright indirect light (within 3 feet of a window), water when the top inch of soil is dry, and never move it once settled. The plant despises drafts, air conditioning vents, and radiators. Brown spots on leaves indicate overwatering or sudden temperature changes, while dropping leaves usually signal stress from relocation. Feed monthly during spring and summer with a liquid fertilizer. With patience and consistent care, the Fiddle Leaf Fig becomes a stunning, living piece of art."
  },
  peace: {
    name: 'Peace Lily', scientific: 'Spathiphyllum',
    img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
    light: 'Low to Medium', water: 'Weekly', humidity: 'High', temp: '18-26C',
    tips: ['Will dramatically droop when thirsty', 'Keep soil consistently moist but not soggy', 'Thrives in low light', 'Wipe leaves to remove dust', 'Flowers turn green as they age - normal'],
    problems: ['Brown edges = dry air or fluoride', 'Wilting despite moist soil = root rot', 'No flowers = needs more light'],
    premium: "The Peace Lily, Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty - do not panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, and bloom more readily with brighter indirect light. The plant is an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Brown leaf tips indicate fluoride sensitivity - use filtered water if possible. Peace Lilies are mildly toxic to pets if ingested. With proper care, these plants bloom multiple times per year, adding beauty to any space."
  },
  spider: {
    name: 'Spider Plant', scientific: 'Chlorophytum Comosum',
    img: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=800&h=600&fit=crop',
    light: 'Medium to Bright', water: 'Weekly', humidity: 'Average', temp: '13-27C',
    tips: ['Produces dangling babies', 'Easy to propagate - just pot the babies', 'Tolerates a range of conditions', 'Brown tips from fluoride - use filtered water', 'Great air purifier (NASA study)'],
    problems: ['Brown tips = fluoride/chlorine', 'Pale leaves = needs more light', 'No babies = plant is too young'],
    premium: "The Spider Plant, Chlorophytum comosum, is a classic houseplant that has been gracing homes for generations. Native to South Africa, this resilient plant is named for its spider-like appearance, with long, arching leaves and dangling baby plantlets that resemble spiders on a web. The plant produces white star-shaped flowers in summer, followed by tiny plantlets that can be propagated to grow new plants - making it one of the easiest plants to multiply. Spider Plants are incredibly adaptable, thriving in temperatures between 13-27C and tolerating various light conditions. They are excellent air purifiers, shown by NASA research to remove formaldehyde and benzene from indoor environments. The main issue is brown leaf tips, typically caused by fluoride or chlorine in tap water - switching to filtered or rainwater solves this. Spider Plants are non-toxic to pets. The plantlets can be placed in water until roots develop, then potted in well-draining soil."
  },
  zz: {
    name: 'ZZ Plant', scientific: 'Zamioculcas Zamiifolia',
    img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&h=600&fit=crop',
    light: 'Low to Medium', water: 'Monthly', humidity: 'Low', temp: '18-26C',
    tips: ['Extremely drought tolerant - err on the side of underwatering', 'Wipe leaves monthly to keep them shiny', 'Slow growing but virtually indestructible', 'Toxic if ingested - keep away from pets and children', 'Yellow leaves usually mean overwatering'],
    problems: ['Yellow leaves = overwatering', 'Drooping stems = root rot', 'Slow growth = normal, not a problem'],
    premium: "The ZZ Plant, Zamioculcas zamiifolia, is arguably the most bulletproof houseplant you can grow. Native to Eastern Africa, this plant has evolved to survive long droughts and low-light conditions, making it perfect for neglectful plant parents or office environments. Its glossy, dark green leaves grow in elegant, arching stems that add a touch of modern sophistication to any space. The plant stores water in its thick rhizomes, allowing it to survive weeks or even months without watering. It tolerates low light, drought, and average humidity with ease. The only thing that truly kills a ZZ Plant is overwatering - always let the soil dry out completely between waterings. Feed sparingly with a general houseplant fertilizer once or twice during the growing season. While beautiful, all parts of the ZZ Plant are toxic if ingested, so placement is important in homes with pets or curious children."
  },
  aloe: {
    name: 'Aloe Vera', scientific: 'Aloe Barbadensis',
    img: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=800&h=600&fit=crop',
    light: 'Bright Direct', water: 'Every 2-3 weeks', humidity: 'Low', temp: '13-27C',
    tips: ['Loves bright, direct sunlight - perfect for sunny windowsills', 'Let soil dry COMPLETELY between waterings', 'Gel inside leaves soothes burns and skin irritation', 'Produces pups (baby plants) that can be separated', 'Use terracotta pots for better drainage'],
    problems: ['Brown tips = too much direct sun or fluoride', 'Mushy leaves = overwatered', 'Flat, curled leaves = needs water'],
    premium: "Aloe Vera is both a beautiful succulent and a practical medicinal plant, making it one of the most useful houseplants you can own. Native to the Arabian Peninsula, this plant has been used for thousands of years for its healing properties - the clear gel inside its thick, fleshy leaves soothes burns, cuts, and skin irritations when applied topically. For best results, grow Aloe in a terracotta pot with well-draining cactus soil, and place it in a sunny window where it receives at least 6 hours of bright, direct light. Water deeply but infrequently - when the soil is completely dry and the leaves show slight wrinkling. Overwatering is the most common mistake and leads to root rot, which is often fatal. In spring and summer, your Aloe may produce pups - small baby plants at its base - which can be carefully separated and potted individually. With proper care, your Aloe Vera will thrive for years."
  },
  jade: {
    name: 'Jade Plant', scientific: 'Crassula Ovata',
    img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=600&fit=crop',
    light: 'Bright Indirect', water: 'Every 2-3 weeks', humidity: 'Low', temp: '18-24C',
    tips: ['Symbol of good luck and prosperity in many cultures', 'Can live for decades with proper care', 'Prune to maintain compact shape', 'Leaves should be firm and plump when healthy', 'Red edges develop with bright light exposure'],
    problems: ['Dropping leaves = overwatering or sudden cold', 'Soft mushy stem = root rot', 'Leggy growth = needs more light'],
    premium: "The Jade Plant, Crassula ovata, is a timeless classic often called the Money Tree or Lucky Plant, believed to bring good fortune and prosperity. Native to South Africa, Jade Plants develop thick, woody stems and plump, oval-shaped leaves that store water, making them extremely drought-tolerant. With bright light and minimal watering, a Jade Plant can live for decades and grow into a small tree-like specimen up to 3 feet tall indoors. The secret to a healthy Jade is letting the soil dry completely between waterings, and providing at least 4-6 hours of bright, indirect light daily. If your Jade develops red edges on its leaves, that is a sign it is receiving plenty of light. Prune regularly to encourage bushier growth and prevent the plant from becoming leggy. Jade Plants are mildly toxic to pets if ingested."
  },
  calathea: {
    name: 'Calathea', scientific: 'Calathea Ornata',
    img: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=800&h=600&fit=crop',
    light: 'Low to Medium', water: 'Keep moist', humidity: 'High (60%+)', temp: '18-26C',
    tips: ['Leaves move throughout the day following light', 'Use filtered or rainwater to avoid fluoride', 'Keep soil consistently moist but not soggy', 'Loves humidity - perfect for bathrooms', 'Leaves fold up at night'],
    problems: ['Brown crispy edges = low humidity or fluoride', 'Curling leaves = too dry or too cold', 'Faded patterns = too much direct light'],
    premium: "Calathea, often called the Prayer Plant because its leaves fold upward in the evening like hands in prayer, is a stunning tropical plant known for its intricately patterned foliage. Native to the rainforests of Brazil, Calathea thrives in warm, humid, filtered light found on the forest floor. The key to success is humidity - these plants crave moisture in the air and develop brown, crispy leaf edges if the air is too dry. Using filtered or distilled water is essential, as Calathea is extremely sensitive to fluoride and chlorine found in tap water. Keep the soil consistently moist but never waterlogged, and place your Calathea in a bathroom or near a humidifier. Avoid direct sunlight, which will fade its beautiful striped or patterned leaves. With the right conditions, Calathea rewards you with leaves that display intricate geometric patterns in shades of green, pink, and white."
  },
  birdOfParadise: {
    name: 'Bird of Paradise', scientific: 'Strelitzia Reginae',
    img: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&h=600&fit=crop',
    light: 'Bright Direct', water: 'Weekly', humidity: 'Average', temp: '18-30C',
    tips: ['Needs several years before producing flowers', 'Split leaves are normal, not a problem', 'Grows large - needs space to spread', 'Outdoor plants can reach 6-10 feet', 'Feed monthly during growing season'],
    problems: ['No flowers = needs more light or is too young', 'Split leaves = natural, not preventable', 'Drooping = needs water'],
    premium: "The Bird of Paradise, Strelitzia reginae, is one of the most dramatic and exotic houseplants you can grow. Named for its stunning orange and blue flowers that resemble a bird in flight, this plant is native to South Africa. As a houseplant, it features large, paddle-shaped leaves that can reach 12-18 inches long, creating a bold architectural statement. Bird of Paradise requires bright, direct sunlight to thrive and will even bloom indoors if given enough light. Water weekly during the growing season, allowing the top inch of soil to dry between waterings. Reduce watering in winter. This is a fast-growing plant that needs room - do not be surprised if it outgrows its pot within a few years. Its distinctive leaf splits are completely natural. With patience and the right conditions, your Bird of Paradise will reward you with its spectacular crane-like flowers."
  },
  rubberPlant: {
    name: 'Rubber Plant', scientific: 'Ficus Elastica',
    img: 'https://images.unsplash.com/photo-1597054750841-4b6d95f4c4e4?w=800&h=600&fit=crop',
    light: 'Medium to Bright', water: 'Weekly', humidity: 'Average', temp: '16-27C',
    tips: ['Wipe leaves regularly to keep them shiny', 'Start with dark green variety if new to plant care', 'Can grow 6-8 feet indoors with good care', 'Milky sap can irritate skin - wear gloves when pruning', 'Rotate quarterly for even growth'],
    problems: ['Yellow leaves = overwatering', 'Dropping leaves = sudden temperature change', 'Leggy growth = needs more light'],
    premium: "The Rubber Plant, Ficus elastica, is a bold and statuesque houseplant that makes an instant impact in any room. Native to Southeast Asia where it grows as a towering tree, the Rubber Plant has been cultivated for its handsome, glossy leaves that can be dark green, burgundy, or variegated depending on the variety. Despite its tropical origins, it adapts well to indoor conditions and can grow 6-8 feet tall as a houseplant. The key to keeping a Rubber Plant happy is consistent, bright, indirect light and regular watering when the top inch of soil dries out. Its large, waxy leaves accumulate dust easily - wipe them monthly with a damp cloth to keep them looking their glossy best. When pruning or propagating, be aware that the plant exudes a milky white sap that can irritate skin, so wear gloves. With its dramatic presence and relatively forgiving nature, the Rubber Plant is an excellent choice."
  },
  orchid: {
    name: 'Orchid', scientific: 'Phalaenopsis',
    img: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=800&h=600&fit=crop',
    light: 'Bright Indirect', water: 'Weekly', humidity: 'Medium (50%)', temp: '18-26C',
    tips: ['Water with ice cubes for easy, measured watering', 'Roots turn silver when dry, green when moist', 'After flowers fall, cut stem above a node to rebloom', 'Transparent pots help you monitor root health', 'Never let water sit in the crown (center)'],
    problems: ['Yellow leaves = too much water or direct sun', 'Bud blast = sudden temperature or humidity change', 'No rebloom = needs more light or a rest period'],
    premium: "Orchids, particularly the Phalaenopsis or Moth Orchid, are the most popular flowering houseplants, beloved for their elegant, long-lasting blooms that can persist for months. Despite their delicate appearance, Phalaenopsis orchids are surprisingly adaptable and make excellent houseplants for beginners. The secret to orchid success is proper watering - place 3 ice cubes on the potting medium weekly, allowing the water to melt slowly and soak in without drowning the roots. Orchids prefer bright, indirect light - direct afternoon sun will burn their leaves. After your orchid finishes flowering, do not discard it - cut the flower spike just above a node, and with proper care, it will produce new blooms within months. With their exotic beauty and surprisingly approachable care requirements, orchids bring elegance and color to any space."
  },
  fern: {
    name: 'Boston Fern', scientific: 'Nephrolepis Exaltata',
    img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop',
    light: 'Medium Indirect', water: 'Keep moist', humidity: 'High (60%+)', temp: '16-24C',
    tips: ['Loves bathrooms where humidity is naturally high', 'Mist daily or use a pebble tray with water', 'Never let soil dry out completely', 'Dropping leaves usually means low humidity', 'Perfect for hanging baskets'],
    problems: ['Brown crispy fronds = dry air or inconsistent watering', 'Yellow leaves = overwatering', 'Pale fronds = needs more light'],
    premium: "The Boston Fern, Nephrolepis exaltata, is the quintessential Victorian-era houseplant that has never gone out of style. Native to tropical regions worldwide, this lush, arching fern produces delicate fronds that can cascade up to 3 feet, making it absolutely stunning in hanging baskets or on plant stands. While beautiful, Boston Ferns are notoriously particular about their environment - they crave high humidity and consistent moisture, thriving in bathrooms, kitchens, or anywhere with naturally humid air. Daily misting is essential, or place the pot on a pebble tray filled with water. Never allow the soil to dry out completely, but also avoid waterlogging. Bright, indirect light keeps the fronds a healthy deep green. If your fern is dropping leaves, it is usually a sign the air is too dry. With the right humidity and consistent care, a Boston Fern can be a showstopping specimen."
  },
  philodendron: {
    name: 'Philodendron', scientific: 'Philodendron Hederaceum',
    img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=600&fit=crop',
    light: 'Low to Medium', water: 'Weekly', humidity: 'Average', temp: '18-27C',
    tips: ['Heart-shaped leaves on trailing vines', 'Easy to propagate from stem cuttings', 'Tolerates low light better than most plants', 'Trim to encourage fuller, bushier growth', 'Aerial roots are normal, not a problem'],
    problems: ['Yellow leaves = overwatering', 'Leggy stems = needs more light', 'Brown tips = underwatering or low humidity'],
    premium: "Philodendrons are the workhorses of the houseplant world - endlessly adaptable, incredibly easy to grow, and available in hundreds of varieties to suit any style. The classic Heartleaf Philodendron, Philodendron hederaceum, features beautiful heart-shaped leaves on trailing vines that can grow 10 feet or longer, making it perfect for high shelves or trained to climb a moss pole. Native to the rainforests of Central and South America, Philodendrons thrive in warm, humid conditions where they receive dappled light. They tolerate low light remarkably well, though growth will be faster with bright, indirect light. Water when the top inch of soil feels dry. To propagate, simply cut a stem with 2-3 leaves and place in water; roots develop within 2-3 weeks. Regular pruning encourages bushier growth rather than long, leggy vines. Philodendrons are toxic to pets if ingested."
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
    premium: "Basil is the king of culinary herbs and the crown jewel of any kitchen garden, prized for its aromatic, flavorful leaves essential in Italian cuisine, Thai dishes, and more. Whether you are growing classic Sweet Basil, spicy Thai Basil, or aromatic Genovese for authentic pesto, this warm-season annual demands bright, direct sunlight - at least 6 hours daily - and consistent warmth to thrive. Water your basil daily during hot weather, keeping the soil consistently moist but not waterlogged. The secret to a productive basil plant is regular harvesting - pinch or cut stems from the top, always above a pair of leaves, to encourage branching and prevent flowering. Once basil flowers, the leaves lose their sweet flavor and become bitter, so harvest before you see any flower buds. With its lush, fragrant foliage and versatility in the kitchen, basil rewards you all summer long."
  }
};`;

// Combine and write
const result = prefix + '\n' + plantData + '\n\n' + suffix;
fs.writeFileSync(path, result, 'utf8');
console.log('Done! Plant data rebuilt.');