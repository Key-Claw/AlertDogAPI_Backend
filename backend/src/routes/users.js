const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, email, telefono, rol FROM usuarios ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, email, telefono, rol FROM usuarios WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, rol } = req.body;
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, telefono, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, telefono, rol || 'usuario']
    );
    res.status(201).json({ id: result.insertId, nombre, email, telefono, rol: rol || 'usuario' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { nombre, email, telefono, rol } = req.body;
    await db.query(
      'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, rol = ? WHERE id = ?',
      [nombre, email, telefono, rol, req.params.id]
    );
    res.json({ id: req.params.id, nombre, email, telefono, rol });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
