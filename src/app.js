// 5.1 Archivo principal de la aplicación

// Importar Express y crear una aplicación
const express = require('express');
const router = express.Router();

// Importar rutas
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('./controllers/usuarioController');
const { getPerros, getPerro, postPerro, putPerro, deletePerro } = require('./controllers/perroController');
const { getCitas, getCita, postCita, putCita, deleteCita } = require('./controllers/citaController');       

// Rutas para el manejo de usuarios
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuario);
router.post('/usuarios', postUsuario);
router.put('/usuarios/:id', putUsuario);
router.delete('/usuarios/:id', deleteUsuario);

// Rutas para el manejo de perros
router.get('/perros', getPerros);
router.get('/perros/:id', getPerro);
router.post('/perros', postPerro);
router.put('/perros/:id', putPerro);
router.delete('/perros/:id', deletePerro);

// Rutas para el manejo de citas
router.get('/citas', getCitas);
router.get('/citas/:id', getCita);
router.post('/citas', postCita);
router.put('/citas/:id', putCita);
router.delete('/citas/:id', deleteCita);

module.exports = router;