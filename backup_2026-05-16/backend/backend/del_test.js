const {Database} = require('sqlite3');
const db = new Database('./plantglow.db');
db.run("DELETE FROM users WHERE email LIKE '%@test.com'", function(err) {
  if(err) console.log('Error:', err.message);
  else console.log('Deleted', this.changes, 'test user(s)');
  process.exit(0);
});