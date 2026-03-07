// 2.2 Crear el servicio para manejar la lógica de negocio relacionada con los perros

const db = require('../config/database').db;
const {get} = require('../config/database').db;

// Función para crear un nuevo perro
async function crearPerro(perro) {
    try {
        const [id] = await db('perros').insert(perro);
        return id; // Retorna el ID del nuevo perro
    } catch (error) {
        console.error('Error al crear perro:', error);
        throw error;
    }
}

// Función para obtener todos los perros de un usuario
async function obtenerPerrosPorUsuario(id_usuario) {
    try {
        const perros = await db('perros').where({ id_usuario });
        return perros; // Retorna un array de perros
    } catch (error) {
        console.error('Error al obtener perros por usuario:', error);
        throw error;
    }
}

// Función para actualizar un perro
async function actualizarPerro(id, perro) {
    try {
        await db('perros').where({ id }).update(perro);
    } catch (error) {
        console.error('Error al actualizar perro:', error);
        throw error;
    }
}

// Función para eliminar un perro
async function eliminarPerro(id) {
    try {
        await db('perros').where({ id }).del();
    } catch (error) {
        console.error('Error al eliminar perro:', error);
        throw error;
    }
}



module.exports = {
    crearPerro,
    obtenerPerrosPorUsuario,
    actualizarPerro,
    eliminarPerro   
};