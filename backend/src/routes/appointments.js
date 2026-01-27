const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, u.nombre as usuario_nombre, p.nombre as perro_nombre 
      FROM citas c
      LEFT JOIN usuarios u ON c.usuario_id = u.id
      LEFT JOIN perros p ON c.perro_id = p.id
      ORDER BY c.fecha DESC, c.hora DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, u.nombre as usuario_nombre, p.nombre as perro_nombre 
      FROM citas c
      LEFT JOIN usuarios u ON c.usuario_id = u.id
      LEFT JOIN perros p ON c.perro_id = p.id
      WHERE c.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create appointment
router.post('/', async (req, res) => {
  try {
    const { usuario_id, perro_id, fecha, hora, motivo, estado } = req.body;
    const [result] = await db.query(
      'INSERT INTO citas (usuario_id, perro_id, fecha, hora, motivo, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [usuario_id, perro_id, fecha, hora, motivo, estado || 'pendiente']
    );
    res.status(201).json({ id: result.insertId, usuario_id, perro_id, fecha, hora, motivo, estado: estado || 'pendiente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update appointment
router.put('/:id', async (req, res) => {
  try {
    const { usuario_id, perro_id, fecha, hora, motivo, estado } = req.body;
    await db.query(
      'UPDATE citas SET usuario_id = ?, perro_id = ?, fecha = ?, hora = ?, motivo = ?, estado = ? WHERE id = ?',
      [usuario_id, perro_id, fecha, hora, motivo, estado, req.params.id]
    );
    res.json({ id: req.params.id, usuario_id, perro_id, fecha, hora, motivo, estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM citas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
