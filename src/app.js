// 5.1 Archivo principal de la aplicación

// Importar Express y Yargs para manejar argumentos de línea de comandos
const express = require('express');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Crear la aplicación Express y un router
const app = express();
const router = express.Router();

// Importar la configuración de la base de datos
const argv = yargs(hideBin(process.argv)).argv;
const host = argv.host || process.env.HOST || '0.0.0.0';
const port = Number(argv.port || process.env.PORT || 3000);

app.use(express.json());

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

// Ruta base para verificar rápidamente desde el navegador
router.get('/', (req, res) => {
	res.json({
		status: 'ok',
		message: 'AlertDogAPI en ejecución'
	});
});

app.use('/', router);

if (require.main === module) {
	app.listen(port, host, () => {
		console.log(`Servidor escuchando en http://${host}:${port}`);
	});
}

module.exports = app;