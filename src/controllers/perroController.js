// 3.2 Crear el controlador para manejar las solicitudes relacionadas con los perros

// Importar las funciones del servicio de perro
const { findAllPerros,
    findPerro,
    addPerro,
    getPerrosPorUsuario,
    getPerroPorRaza,
    modifyPerro,
    removePerro,
    tieneCitaProxima } = require('../service/perroService');


// Importar funciones de los servicios de perro y cita para obtener información relacionada
const { findCita, getCitasPorUsuario } = require('../service/citaService');

// Controlador para obtener todos los perros (opcional, no implementada en el router)
const getPerros = async (req, res) => {
    try {
        const perros = await findAllPerros();
        res.json(perros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener perros' });
    }
};

// Controlador para obtener un perro por su ID
const getPerro = async (req, res) => {
    const { id } = req.params;
    try {
        const perro = await findPerro(id);
        if (perro) {
            res.json(perro);
        } else {
            res.status(404).json({ error: 'Perro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener perro' });
    }
};

// Controlador para crear un nuevo perro
const postPerro = async (req, res) => {
    const perroData = req.body;
    try {
        const id_perro = await addPerro(perroData);
        res.status(201).json({ id_perro });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear perro' });
    }
};


// Controlador para crear un nuevo perro
const putPerro = async (req, res) => {
    const { id } = req.params;
    const perroData = req.body;
    try {        const id_perro = await addPerro(perroData);
        res.status(201).json({ id_perro });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear perro' });
    }
};

// Controlador para eliminar un perro
const deletePerro = async (req, res) => {
    const { id } = req.params;
    try {
        await removePerro(id);
        res.status(200).json({ message: 'Perro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar perro' });
    }
};

module.exports = {
    getPerros,
    getPerro,
    postPerro,
    putPerro,
    deletePerro
};