const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables del .env

// Importar Rutas
const usuarioRoute = require('./routes/usuarioRoute');
const perroRoute = require('./routes/perroRoute');
const citaRoute = require('./routes/citaRoute');

const app = express();

// Middleware
app.user(cors());
app.use(express.json()); // Para recibir JSON en el body

// Rutas
app.use('/api/usuarios', usuarioRoute);
app.use('/api/perros', perroRoute);
app.use('/api/citas', citaRoute);

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('¡AlertDog Backend funcionando!');
});

// Puerto de escucha
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Iniciando el backend en el puerto ${PORT}`);
});

// Orden de trabajo: configuration → app.js → route → controller → service → pruebas incrementales
