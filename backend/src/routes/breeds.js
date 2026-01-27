const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all breeds
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM razas ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get breed by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM razas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Raza no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create breed
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, origen } = req.body;
    const [result] = await db.query(
      'INSERT INTO razas (nombre, descripcion, origen) VALUES (?, ?, ?)',
      [nombre, descripcion, origen]
    );
    res.status(201).json({ id: result.insertId, nombre, descripcion, origen });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update breed
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, origen } = req.body;
    await db.query(
      'UPDATE razas SET nombre = ?, descripcion = ?, origen = ? WHERE id = ?',
      [nombre, descripcion, origen, req.params.id]
    );
    res.json({ id: req.params.id, nombre, descripcion, origen });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete breed
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM razas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Raza eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
