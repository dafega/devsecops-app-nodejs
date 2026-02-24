const { getDb } = require('../database');

class Bicycle {
  constructor({ id = null, propietario = null, marca = null, tamano = null, color = null } = {}) {
    this.id = id;
    this.propietario = propietario;
    this.marca = marca;
    this.tamano = tamano;
    this.color = color;
  }

  toDict() {
    return {
      id: this.id,
      propietario: this.propietario,
      marca: this.marca,
      tamano: this.tamano,
      color: this.color,
    };
  }

  /**
   * Crea una nueva bicicleta.
   */
  static create(propietario, marca, tamano, color, dbPath = 'inventory.db') {
    const db = require('../database').getDb(dbPath);
    const stmt = db.prepare(
      'INSERT INTO bicycles (propietario, marca, tamano, color) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(propietario, marca, tamano, color);
    return Bicycle.getById(result.lastInsertRowid, dbPath);
  }

  /**
   * Obtiene todas las bicicletas.
   */
  static getAll(dbPath = 'inventory.db') {
    const db = require('../database').getDb(dbPath);
    const rows = db.prepare('SELECT * FROM bicycles ORDER BY id ASC').all();
    return rows.map((row) => new Bicycle(row).toDict());
  }

  /**
   * Obtiene una bicicleta por ID.
   */
  static getById(bicycleId, dbPath = 'inventory.db') {
    const db = require('../database').getDb(dbPath);
    const row = db.prepare('SELECT * FROM bicycles WHERE id = ?').get(bicycleId);
    if (!row) return null;
    return new Bicycle(row);
  }

  /**
   * Actualiza una bicicleta (solo campos enviados).
   */
  static update(bicycleId, { propietario, marca, tamano, color } = {}, dbPath = 'inventory.db') {
    const db = require('../database').getDb(dbPath);
    const updates = [];
    const params = [];

    if (propietario !== undefined) {
      updates.push('propietario = ?');
      params.push(propietario);
    }
    if (marca !== undefined) {
      updates.push('marca = ?');
      params.push(marca);
    }
    if (tamano !== undefined) {
      updates.push('tamano = ?');
      params.push(tamano);
    }
    if (color !== undefined) {
      updates.push('color = ?');
      params.push(color);
    }

    if (updates.length > 0) {
      params.push(bicycleId);
      db.prepare(`UPDATE bicycles SET ${updates.join(', ')} WHERE id = ?`).run(...params);
    }

    return Bicycle.getById(bicycleId, dbPath);
  }

  /**
   * Elimina una bicicleta por ID.
   */
  static delete(bicycleId, dbPath = 'inventory.db') {
    const db = require('../database').getDb(dbPath);
    const result = db.prepare('DELETE FROM bicycles WHERE id = ?').run(bicycleId);
    return result.changes > 0;
  }
}

module.exports = { Bicycle };
