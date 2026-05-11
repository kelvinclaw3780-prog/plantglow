const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./plantglow.db');

db.run("DELETE FROM users WHERE email LIKE '%@test.com'", function(err) {
  if (err) console.error('users error:', err.message);
  else console.log('Deleted', this.changes, 'from users');
  
  db.run("DELETE FROM early_access_emails", function(err2) {
    if (err2) console.error('emails error:', err2.message);
    else console.log('Deleted', this.changes, 'from early_access_emails');
    process.exit(0);
  });
});