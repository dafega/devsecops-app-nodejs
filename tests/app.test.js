const { describe, it } = require('node:test');
const assert = require('node:assert');
const { createApp } = require('../src/app');
const request = require('supertest');

describe('API Bicycles', () => {
  const app = createApp({ database: ':memory:' });

  it('GET /api/bicycles/health responde 200 y status healthy', async () => {
    const res = await request(app).get('/api/bicycles/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body?.status, 'healthy');
    assert.strictEqual(res.body?.service, 'bicycles-inventory-api');
  });

  it('GET /api/bicycles lista bicicletas (vacío al inicio)', async () => {
    const res = await request(app).get('/api/bicycles');
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body?.bicycles));
    assert.strictEqual(res.body?.count, 0);
  });

  it('POST /api/bicycles crea bicicleta', async () => {
    const res = await request(app)
      .post('/api/bicycles')
      .send({ propietario: 'Test', marca: 'Marca', tamano: 'M', color: 'Rojo' });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body?.propietario, 'Test');
    assert.strictEqual(res.body?.marca, 'Marca');
    assert.ok(typeof res.body?.id === 'number');
  });

  it('POST /api/bicycles sin propietario responde 400', async () => {
    const res = await request(app)
      .post('/api/bicycles')
      .send({ marca: 'M', tamano: 'M', color: 'R' });
    assert.strictEqual(res.status, 400);
  });

  it('GET /api/bicycles/:id obtiene bicicleta', async () => {
    const res = await request(app).get('/api/bicycles/1');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body?.id, 1);
    assert.strictEqual(res.body?.propietario, 'Test');
  });

  it('GET /api/bicycles/:id inexistente responde 404', async () => {
    const res = await request(app).get('/api/bicycles/999');
    assert.strictEqual(res.status, 404);
  });

  it('PUT /api/bicycles/:id actualiza bicicleta', async () => {
    const res = await request(app)
      .put('/api/bicycles/1')
      .send({ color: 'Azul' });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body?.color, 'Azul');
  });

  it('DELETE /api/bicycles/:id elimina bicicleta', async () => {
    const res = await request(app).delete('/api/bicycles/1');
    assert.strictEqual(res.status, 200);
  });

  it('DELETE /api/bicycles/:id inexistente responde 404', async () => {
    const res = await request(app).delete('/api/bicycles/999');
    assert.strictEqual(res.status, 404);
  });
});
