// 2.1 Crear el servicio para manejar la lógica de negocio relacionada con las citas

const db = require('../config/database').db;
const {get} = require('../config/database').db;

// Función para crear una nueva cita
async function crearCita(cita) {
    try {
        const [id] = await db('citas').insert(cita);
        return id; // Retorna el ID de la nueva cita
    } catch (error) {
        console.error('Error al crear cita:', error);
        throw error;
    }
}

// Función para obtener todas las citas de un usuario
async function obtenerCitasPorUsuario(id_usuario) {
    try {
        const citas = await db('citas').where({ id_usuario });
        return citas; // Retorna un array de citas
    } catch (error) {
        console.error('Error al obtener citas por usuario:', error);
        throw error;
    }
}
// Función para cambiar fecha de una cita (opcional, no implementada en el controlador)
async function actualizarCita(id, cita) {
    try {
        await db('citas').where({ id }).update(cita);
    } catch (error) {
        console.error('Error al actualizar cita:', error);
        throw error;
    }
} 

// Función para eliminar una cita (opcional, no implementada en el controlador)
async function eliminarCita(id) {
    try {
        await db('citas').where({ id }).del();
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        throw error;
    }
}

module.exports = {
    crearCita,
    obtenerCitasPorUsuario,
    actualizarCita,
    eliminarCita
};