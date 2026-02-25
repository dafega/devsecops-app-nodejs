const { describe, it } = require('node:test');
const assert = require('node:assert');
const { Bicycle } = require('../../src/models/bicycle');
const { initDb, closeDb } = require('../../src/database');

describe('Model Bicycle', () => {
  const dbPath = ':memory:';

  it('Bicycle.create y getById', () => {
    closeDb();
    initDb(dbPath);
    const b = Bicycle.create('Ana', 'Trek', 'M', 'Rojo', dbPath);
    assert.ok(b);
    assert.strictEqual(b.propietario, 'Ana');
    assert.strictEqual(b.marca, 'Trek');
    assert.strictEqual(b.tamano, 'M');
    assert.strictEqual(b.color, 'Rojo');
    assert.ok(typeof b.id === 'number');
    const found = Bicycle.getById(b.id, dbPath);
    assert.strictEqual(found?.propietario, 'Ana');
    closeDb();
  });

  it('Bicycle.getAll', () => {
    closeDb();
    initDb(dbPath);
    Bicycle.create('A', 'M1', 'S', 'R', dbPath);
    Bicycle.create('B', 'M2', 'L', 'B', dbPath);
    const all = Bicycle.getAll(dbPath);
    assert.strictEqual(all.length, 2);
    assert.strictEqual(all[0].propietario, 'A');
    assert.strictEqual(all[1].propietario, 'B');
    closeDb();
  });

  it('Bicycle.update', () => {
    closeDb();
    initDb(dbPath);
    const b = Bicycle.create('X', 'M', 'M', 'R', dbPath);
    const updated = Bicycle.update(b.id, { color: 'Verde', tamano: 'L' }, dbPath);
    assert.strictEqual(updated.color, 'Verde');
    assert.strictEqual(updated.tamano, 'L');
    assert.strictEqual(updated.propietario, 'X');
    closeDb();
  });

  it('Bicycle.delete', () => {
    closeDb();
    initDb(dbPath);
    const b = Bicycle.create('Z', 'M', 'M', 'R', dbPath);
    const deleted = Bicycle.delete(b.id, dbPath);
    assert.strictEqual(deleted, true);
    assert.strictEqual(Bicycle.getById(b.id, dbPath), null);
    closeDb();
  });

  it('toDict', () => {
    closeDb();
    initDb(dbPath);
    const b = Bicycle.create('D', 'M', 'M', 'R', dbPath);
    const d = b.toDict();
    assert.strictEqual(d.propietario, 'D');
    assert.strictEqual(d.id, b.id);
    closeDb();
  });
});
