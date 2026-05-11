const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Fix the duplicate nav-user-badge content
const bad = `</div>t-forest-700 font-medium">Logged in</span>
          </div>
          <button onclick="logout()"`;

const good = `</div>
          <button onclick="logout()"`;

c = c.replace(bad, good);
console.log('Fixed duplicate nav content');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');