const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Add responsive class to the brand text span
h = h.split(
  '<span class="font-bold text-base text-forest-800">PlantGlow</span>'
).join(
  '<span class="font-bold text-base text-forest-800 hidden-xs">PlantGlow</span>'
);

// Add CSS for hiding on very small screens
// Find the </style> tag and add media query before it
const styleEnd = h.indexOf('</style>');
if (styleEnd >= 0) {
  const responsiveCSS = `
    @media (max-width: 360px) {
      .hidden-xs { display: none !important; }
    }
  `;
  h = h.substring(0, styleEnd) + responsiveCSS + h.substring(styleEnd);
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Done - added responsive hide for brand text on very narrow screens');

// Verify
const h2 = fs.readFileSync('plantglow/index-zh.html', 'utf8');
console.log('Has hidden-xs class:', h2.includes('hidden-xs'));
console.log('Has responsive CSS:', h2.includes('@media (max-width: 360px)'));