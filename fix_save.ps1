$f = "C:\Users\kelvi\.openclaw\workspace-appcreator\plantglow\index.html"
$c = Get-Content $f -Raw

$old = @"
    function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick('' + id + '')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }
"@

$new = @"
    function renderPlantCard(id, plant) {
      var saved = getSavedPlants();
      var isSaved = saved.includes(id);
      var heartClass = isSaved ? 'text-red-500 fill-red-500' : 'text-gray-400';
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">' +
        '<div onclick="handlePlantClick('' + id + '')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>' +
        '<button onclick="handleToggleSave('' + id + '')" class="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition">' +
        '<i data-lucide="heart" class="w-4 h-4 ' + heartClass + '"></i></button></div>';
    }

    function getSavedPlants() {
      try {
        return JSON.parse(localStorage.getItem('plantglow_saved') || '[]');
      } catch(e) { return []; }
    }

    function savePlant(id) {
      var saved = getSavedPlants();
      if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem('plantglow_saved', JSON.stringify(saved));
      }
    }

    function unsavePlant(id) {
      var saved = getSavedPlants();
      saved = saved.filter(function(pid) { return pid !== id; });
      localStorage.setItem('plantglow_saved', JSON.stringify(saved));
    }

    function handleToggleSave(plantId) {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
        return;
      }
      var saved = getSavedPlants();
      if (saved.includes(plantId)) {
        unsavePlant(plantId);
        showToast('Removed from favorites', 'info');
      } else {
        savePlant(plantId);
        showToast('Saved to favorites!', 'success');
      }
      renderPlants();
    }
"@

$c = $c.Replace($old, $new)
[System.IO.File]::WriteAllText($f, $c, [System.Text.Encoding]::UTF8)
Write-Output "Done"