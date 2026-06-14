const sqlite3 = require('sqlite3');
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'plantglow.db'));
db.run('DELETE FROM users', function(err) {
  if (err) console.error('Error:', err.message);
  else console.log('Deleted ' + this.changes + ' users from users table');
  db.run('DELETE FROM early_access_emails', function(err2) {
    if (err2) console.error('Error:', err2.message);
    else console.log('Deleted ' + this.changes + ' emails from early_access_emails');
    db.close();
    console.log('Done!');
  });
});