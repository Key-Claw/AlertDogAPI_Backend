const API_URL = 'http://localhost:3000/api';

let editingUserId = null;

// Load users on page load
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Error al cargar los usuarios');
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = '';

    users.forEach(user => {
        const rolBadge = user.rol === 'admin' ? 'bg-red-100 text-red-800' : 
                        user.rol === 'veterinario' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800';
        
        const row = `
            <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-6">${user.nombre}</td>
                <td class="py-3 px-6">${user.email}</td>
                <td class="py-3 px-6">${user.telefono || '-'}</td>
                <td class="py-3 px-6">
                    <span class="px-2 py-1 rounded ${rolBadge}">${user.rol}</span>
                </td>
                <td class="py-3 px-6 text-center">
                    <button onclick="editUser(${user.id})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteUser(${user.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function showAddModal() {
    editingUserId = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Usuario';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('userModal').classList.remove('hidden');
}

async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`);
        const user = await response.json();
        
        editingUserId = id;
        document.getElementById('modalTitle').textContent = 'Editar Usuario';
        document.getElementById('userId').value = id;
        document.getElementById('nombre').value = user.nombre;
        document.getElementById('email').value = user.email;
        document.getElementById('telefono').value = user.telefono || '';
        document.getElementById('rol').value = user.rol;
        
        document.getElementById('userModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading user:', error);
        alert('Error al cargar el usuario');
    }
}

async function deleteUser(id) {
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;
    
    try {
        await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' });
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error al eliminar el usuario');
    }
}

function closeModal() {
    document.getElementById('userModal').classList.add('hidden');
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        rol: document.getElementById('rol').value
    };
    
    try {
        const url = editingUserId ? `${API_URL}/usuarios/${editingUserId}` : `${API_URL}/usuarios`;
        const method = editingUserId ? 'PUT' : 'POST';
        
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        closeModal();
        loadUsers();
    } catch (error) {
        console.error('Error saving user:', error);
        alert('Error al guardar el usuario');
    }
});
