const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Fix openPlantModal - remove premium references and add updateModalFavoriteBtn
const oldOpenPlantModal = `function openPlantModal(plantId) {
      var plant = plantData[plantId];
      if (!plant) return;
      currentModalPlantId = plantId;
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
      var premiumTextEl = document.getElementById('plant-modal-premium-text');
      if (subscribed) {
        premiumTextEl.textContent = plant.premium;
        premiumEl.classList.remove('hidden');
      } else {
        premiumEl.classList.add('hidden');
      }
      document.getElementById('plant-modal').classList.remove('hidden');
      document.getElementById('plant-modal').classList.add('flex');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    }`;

const newOpenPlantModal = `function openPlantModal(plantId) {
      var plant = plantData[plantId];
      if (!plant) return;
      currentModalPlantId = plantId;
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
      // Update favorite button
      updateModalFavoriteBtn();
      document.getElementById('plant-modal').classList.remove('hidden');
      document.getElementById('plant-modal').classList.add('flex');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    }`;

c = c.replace(oldOpenPlantModal, newOpenPlantModal);
console.log('Fixed openPlantModal - removed premium references, added updateModalFavoriteBtn');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');