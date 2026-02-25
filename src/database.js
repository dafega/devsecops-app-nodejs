const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let dbInstance = null;

/**
 * Get a connection to the database.
 * @param {string} dbPath - SQLite file path (e.g. 'inventory.db')
 * @returns {import('better-sqlite3').Database}
 */
function getDb(dbPath) {
  if (!dbInstance) {
    const resolved =
      path.isAbsolute(dbPath) || dbPath === ':memory:'
        ? dbPath
        : path.join(process.cwd(), dbPath);
    const dir = path.dirname(resolved);
    if (dir !== '.' && resolved !== ':memory:') {
      fs.mkdirSync(dir, { recursive: true });
    }
    dbInstance = new Database(resolved);
  }
  return dbInstance;
}

/**
 * Initialize the database and create the bicycles table if it doesn't exist.
 * @param {string} dbPath - SQLite file path (e.g. 'inventory.db')
 */
function initDb(dbPath) {
  const db = getDb(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS bicycles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      propietario TEXT NOT NULL,
      marca TEXT NOT NULL,
      tamano TEXT NOT NULL,
      color TEXT NOT NULL
    )
  `);
}

/**
 * Close the connection (useful for tests).
 */
function closeDb() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

/**
 * Replace the DB instance (only for tests with temporary DB).
 * @param {import('better-sqlite3').Database|null} instance
 */
function setDbInstance(instance) {
  if (dbInstance) dbInstance.close();
  dbInstance = instance;
}

module.exports = {
  getDb,
  initDb,
  closeDb,
  setDbInstance,
};
