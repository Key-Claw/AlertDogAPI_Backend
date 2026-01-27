const API_URL = 'http://localhost:3000/api';

let editingAppointmentId = null;

// Load appointments on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
    loadUsers();
    loadDogs();
});

async function loadAppointments() {
    try {
        const response = await fetch(`${API_URL}/citas`);
        const appointments = await response.json();
        displayAppointments(appointments);
    } catch (error) {
        console.error('Error loading appointments:', error);
        alert('Error al cargar las citas');
    }
}

async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const users = await response.json();
        const select = document.getElementById('usuario_id');
        select.innerHTML = '<option value="">Seleccionar usuario...</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

async function loadDogs() {
    try {
        const response = await fetch(`${API_URL}/perros`);
        const dogs = await response.json();
        const select = document.getElementById('perro_id');
        select.innerHTML = '<option value="">Seleccionar perro...</option>';
        dogs.forEach(dog => {
            const option = document.createElement('option');
            option.value = dog.id;
            option.textContent = dog.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading dogs:', error);
    }
}

function displayAppointments(appointments) {
    const tbody = document.getElementById('appointmentsTable');
    tbody.innerHTML = '';

    appointments.forEach(appointment => {
        const estadoBadge = appointment.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                           appointment.estado === 'confirmada' ? 'bg-blue-100 text-blue-800' :
                           appointment.estado === 'completada' ? 'bg-green-100 text-green-800' :
                           'bg-red-100 text-red-800';
        
        const row = `
            <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-6">${formatDate(appointment.fecha)}</td>
                <td class="py-3 px-6">${appointment.hora}</td>
                <td class="py-3 px-6">${appointment.usuario_nombre || '-'}</td>
                <td class="py-3 px-6">${appointment.perro_nombre || '-'}</td>
                <td class="py-3 px-6">${appointment.motivo || '-'}</td>
                <td class="py-3 px-6">
                    <span class="px-2 py-1 rounded ${estadoBadge}">${appointment.estado}</span>
                </td>
                <td class="py-3 px-6 text-center">
                    <button onclick="editAppointment(${appointment.id})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteAppointment(${appointment.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

function showAddModal() {
    editingAppointmentId = null;
    document.getElementById('modalTitle').textContent = 'Nueva Cita';
    document.getElementById('appointmentForm').reset();
    document.getElementById('appointmentId').value = '';
    document.getElementById('appointmentModal').classList.remove('hidden');
}

async function editAppointment(id) {
    try {
        const response = await fetch(`${API_URL}/citas/${id}`);
        const appointment = await response.json();
        
        editingAppointmentId = id;
        document.getElementById('modalTitle').textContent = 'Editar Cita';
        document.getElementById('appointmentId').value = id;
        document.getElementById('usuario_id').value = appointment.usuario_id;
        document.getElementById('perro_id').value = appointment.perro_id;
        
        // Format date for input field (YYYY-MM-DD)
        const fecha = new Date(appointment.fecha);
        const formattedDate = fecha.toISOString().split('T')[0];
        document.getElementById('fecha').value = formattedDate;
        
        document.getElementById('hora').value = appointment.hora;
        document.getElementById('motivo').value = appointment.motivo || '';
        document.getElementById('estado').value = appointment.estado;
        
        document.getElementById('appointmentModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading appointment:', error);
        alert('Error al cargar la cita');
    }
}

async function deleteAppointment(id) {
    if (!confirm('¿Está seguro de eliminar esta cita?')) return;
    
    try {
        await fetch(`${API_URL}/citas/${id}`, { method: 'DELETE' });
        loadAppointments();
    } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error al eliminar la cita');
    }
}

function closeModal() {
    document.getElementById('appointmentModal').classList.add('hidden');
}

document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        usuario_id: document.getElementById('usuario_id').value,
        perro_id: document.getElementById('perro_id').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        motivo: document.getElementById('motivo').value,
        estado: document.getElementById('estado').value
    };
    
    try {
        const url = editingAppointmentId ? `${API_URL}/citas/${editingAppointmentId}` : `${API_URL}/citas`;
        const method = editingAppointmentId ? 'PUT' : 'POST';
        
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        closeModal();
        loadAppointments();
    } catch (error) {
        console.error('Error saving appointment:', error);
        alert('Error al guardar la cita');
    }
});
