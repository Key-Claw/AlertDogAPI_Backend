// 3.1 Crear el controlador para manejar las solicitudes relacionadas con los usuarios

// Importar las funciones del servicio de usuario
const { findAllUsuarios,
    findUsuario,
    addUsuario,
    getUsuarioPorEmail,
    getUsuarioPorId,
    modifyUsuario,
    modifyPassword,
    removeUsuario,
    userExisteById } = require('../service/usuarioService');

// Importar funciones de los servicios de perro y cita para obtener información relacionada
const { findPerro, getPerrosPorUsuario } = require('../service/perroService');
const { findCita, getCitasPorUsuario } = require('../service/citaService');

// Controlador para obtener todos los usuarios (opcional, no implementada en el router)
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await findAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// Controlador para obtener un usuario por su email (para autenticación)
const getUsuario = async (req, res) => {
    const { email } = req.params;
    try {
        const usuario = await getUsuarioPorEmail(email);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

// Controlador para crear un nuevo usuario
const postUsuario = async (req, res) => {
    const usuarioData = req.body;
    try {        const id_usuario = await addUsuario(usuarioData);
        res.status(201).json({ id_usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};


// Controlador para crear un nuevo usuario
const putUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioData = req.body;
    try {        const id_usuario = await addUsuario(usuarioData);
        res.status(201).json({ id_usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

// Controlador para eliminar un usuario
const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await removeUsuario(id);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
};