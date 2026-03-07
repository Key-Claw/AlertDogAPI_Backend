// Archivo principal de la aplicación

// Importar Express y Yargs para manejar argumentos de línea de comandos
const express = require('express');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Crear la aplicación Express
const app = express();

const argv = yargs(hideBin(process.argv)).argv;
const host = argv.host || process.env.HOST || '0.0.0.0';
const port = Number(argv.port || process.env.PORT || 3000);

app.use(express.json());

// Importar routers por recurso
const usuarioRoutes = require('./routes/usuarioRoute');
const perroRoutes = require('./routes/perroRoute');
const citaRoutes = require('./routes/citaRoute');

// Ruta base para verificar rápidamente desde el navegador
app.get('/', (req, res) => {
	res.json({
		status: 'ok',
		message: 'AlertDogAPI en ejecución'
	});
});

app.use('/', usuarioRoutes);
app.use('/', perroRoutes);
app.use('/', citaRoutes);

if (require.main === module) {
	app.listen(port, host, () => {
		console.log(`Servidor escuchando en http://${host}:${port}`);
	});
}

module.exports = app;