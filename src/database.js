const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let dbInstance = null;

/**
 * Obtiene una conexión a la base de datos.
 * @param {string} dbPath - Ruta al archivo SQLite (ej: 'inventory.db')
 * @returns {import('better-sqlite3').Database}
 */
function getDb(dbPath) {
  if (!dbInstance) {
    const resolved = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);
    const dir = path.dirname(resolved);
    if (dir !== '.') {
      fs.mkdirSync(dir, { recursive: true });
    }
    dbInstance = new Database(resolved);
  }
  return dbInstance;
}

/**
 * Inicializa la base de datos y crea la tabla bicycles si no existe.
 * @param {string} dbPath - Ruta al archivo SQLite
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
 * Cierra la conexión (útil para tests).
 */
function closeDb() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

/**
 * Reemplaza la instancia de DB (solo para tests con DB temporal).
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
