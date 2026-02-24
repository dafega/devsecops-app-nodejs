const express = require('express');
const { initDb } = require('./database');
const bicyclesRouter = require('./routes/bicycles');

const DEFAULT_DATABASE = 'inventory.db';

/**
 * Crea y configura la aplicación Express.
 * @param {Object} [options]
 * @param {string} [options.database] - Ruta al archivo SQLite
 * @returns {import('express').Application}
 */
function createApp(options = {}) {
  const database = options.database || process.env.DATABASE || DEFAULT_DATABASE;

  initDb(database);

  const app = express();
  app.set('database', database);
  app.set('env', process.env.NODE_ENV || 'development');

  app.use(express.json());

  app.use('/api/bicycles', bicyclesRouter);

  return app;
}

module.exports = { createApp };
