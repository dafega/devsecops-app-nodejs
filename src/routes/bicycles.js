const express = require('express');
const { Bicycle } = require('../models/bicycle');

const router = express.Router({ mergeParams: true });

function getDbPath(req) {
  return req.app.get('database') || 'inventory.db';
}

/** GET /api/bicycles - Listar todas las bicicletas */
router.get('/', (req, res) => {
  try {
    const bicycles = Bicycle.getAll(getDbPath(req));
    res.status(200).json({ bicycles, count: bicycles.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** GET /api/bicycles/health - Health check */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'bicycles-inventory-api' });
});

/** GET /api/bicycles/:id - Obtener una bicicleta por ID */
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const bicycle = Bicycle.getById(id, getDbPath(req));
    if (!bicycle) {
      return res.status(404).json({ error: 'Bicicleta no encontrada' });
    }
    res.status(200).json(bicycle.toDict());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** POST /api/bicycles - Crear bicicleta */
router.post('/', (req, res) => {
  try {
    const data = req.body || {};
    const propietario = typeof data.propietario === 'string' ? data.propietario.trim() : '';
    const marca = typeof data.marca === 'string' ? data.marca.trim() : '';
    const tamano = typeof data.tamano === 'string' ? data.tamano.trim() : '';
    const color = typeof data.color === 'string' ? data.color.trim() : '';

    if (!propietario) {
      return res.status(400).json({ error: 'El propietario es requerido' });
    }
    if (!marca) {
      return res.status(400).json({ error: 'La marca es requerida' });
    }
    if (!tamano) {
      return res.status(400).json({ error: 'El tamaño es requerido' });
    }
    if (!color) {
      return res.status(400).json({ error: 'El color es requerido' });
    }

    const bicycle = Bicycle.create(propietario, marca, tamano, color, getDbPath(req));
    res.status(201).json(bicycle.toDict());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** PUT /api/bicycles/:id - Actualizar bicicleta */
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const bicycle = Bicycle.getById(id, getDbPath(req));
    if (!bicycle) {
      return res.status(404).json({ error: 'Bicicleta no encontrada' });
    }
    const data = req.body || {};
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron datos' });
    }

    const updates = {};
    if (data.propietario !== undefined) updates.propietario = String(data.propietario).trim();
    if (data.marca !== undefined) updates.marca = String(data.marca).trim();
    if (data.tamano !== undefined) updates.tamano = String(data.tamano).trim();
    if (data.color !== undefined) updates.color = String(data.color).trim();

    const updated = Bicycle.update(id, updates, getDbPath(req));
    res.status(200).json(updated.toDict());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** DELETE /api/bicycles/:id - Eliminar bicicleta */
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const deleted = Bicycle.delete(id, getDbPath(req));
    if (!deleted) {
      return res.status(404).json({ error: 'Bicicleta no encontrada' });
    }
    res.status(200).json({ message: 'Bicicleta eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
