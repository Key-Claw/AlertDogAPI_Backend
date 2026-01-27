const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/images', express.static(path.join(__dirname, '../../images')));
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Routes
const breedsRoutes = require('./routes/breeds');
const dogsRoutes = require('./routes/dogs');
const usersRoutes = require('./routes/users');
const appointmentsRoutes = require('./routes/appointments');

app.use('/api/razas', breedsRoutes);
app.use('/api/perros', dogsRoutes);
app.use('/api/usuarios', usersRoutes);
app.use('/api/citas', appointmentsRoutes);

// Root route
app.get('/api', (req, res) => {
  res.json({
    message: 'AlertDog API - Gestión de perros de alerta',
    endpoints: {
      razas: '/api/razas',
      perros: '/api/perros',
      usuarios: '/api/usuarios',
      citas: '/api/citas'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});
