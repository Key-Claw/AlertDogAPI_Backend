// 2.1 Crear el servicio para manejar la lógica de negocio relacionada con los usuarios

const db = require('../config/database').db;
const {get} = require('../config/database').db;

// Función para crear un nuevo usuario
async function crearUsuario(usuario) {
    try {
        const [id] = await db('usuarios').insert(usuario);
        return id; // Retorna el ID del nuevo usuario
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

// Función para obtener un usuario por su ID
async function obtenerUsuarioPorId(id) {
    try {
        const usuario = await db('usuarios').where({ id }).first();
        return usuario; // Retorna el usuario encontrado o undefined si no existe
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    }
}

// Función para obtener un usuario por su email
async function obtenerUsuarioPorEmail(email) {
    try {
        const usuario = await db('usuarios').where({ email }).first();
        return usuario; // Retorna el usuario encontrado o undefined si no existe
    } catch (error) {
        console.error('Error al obtener usuario por email:', error);
        throw error;
    }
}

// Función para actualizar un usuario
async function actualizarUsuario(id, usuario) {
    try {
        await db('usuarios').where({ id }).update(usuario);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

// Función para cambiar contraseña de un usuario (opcional, no implementada en el controlador)
async function cambiarPassword(id, newPassword) {
    try {
        await db('usuarios').where({ id }).update({ password: newPassword });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        throw error;
    }
}

// Función para eliminar un usuario (opcional, no implementada en el controlador)
async function eliminarUsuario(id) {
    try {
        await db('usuarios').where({ id }).del();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}

// Función para verificar si un usuario existe por su id
const userExiste = async (id) => {
    try {
        const usuario = await db('usuarios').where({ id }).first();
        return !!usuario; // Retorna true si el usuario existe, false si no
    } catch (error) {
        console.error('Error al verificar existencia de usuario:', error);
        throw error;
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarioPorEmail,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
    userExiste
};