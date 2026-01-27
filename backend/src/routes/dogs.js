const express = require('express');
const router = express.Router();
const db = require('../config/database');
const upload = require('../middleware/upload');

// Get all dogs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, r.nombre as raza_nombre 
      FROM perros p 
      LEFT JOIN razas r ON p.raza_id = r.id 
      ORDER BY p.nombre
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dog by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, r.nombre as raza_nombre 
      FROM perros p 
      LEFT JOIN razas r ON p.raza_id = r.id 
      WHERE p.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Perro no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create dog
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, raza_id, edad, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : null;
    
    const [result] = await db.query(
      'INSERT INTO perros (nombre, raza_id, edad, descripcion, imagen) VALUES (?, ?, ?, ?, ?)',
      [nombre, raza_id, edad, descripcion, imagen]
    );
    res.status(201).json({ id: result.insertId, nombre, raza_id, edad, descripcion, imagen });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update dog
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, raza_id, edad, descripcion } = req.body;
    let updateQuery = 'UPDATE perros SET nombre = ?, raza_id = ?, edad = ?, descripcion = ?';
    let params = [nombre, raza_id, edad, descripcion];
    
    if (req.file) {
      updateQuery += ', imagen = ?';
      params.push(req.file.filename);
    }
    
    updateQuery += ' WHERE id = ?';
    params.push(req.params.id);
    
    await db.query(updateQuery, params);
    res.json({ id: req.params.id, nombre, raza_id, edad, descripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete dog
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM perros WHERE id = ?', [req.params.id]);
    res.json({ message: 'Perro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
