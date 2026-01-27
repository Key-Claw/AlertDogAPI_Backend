const API_URL = 'http://localhost:3000/api';

let editingBreedId = null;

// Load breeds on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBreeds();
});

async function loadBreeds() {
    try {
        const response = await fetch(`${API_URL}/razas`);
        const breeds = await response.json();
        displayBreeds(breeds);
    } catch (error) {
        console.error('Error loading breeds:', error);
        alert('Error al cargar las razas');
    }
}

function displayBreeds(breeds) {
    const tbody = document.getElementById('breedsTable');
    tbody.innerHTML = '';

    breeds.forEach(breed => {
        const row = `
            <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-6">${breed.nombre}</td>
                <td class="py-3 px-6">${breed.origen || '-'}</td>
                <td class="py-3 px-6">${breed.descripcion || '-'}</td>
                <td class="py-3 px-6 text-center">
                    <button onclick="editBreed(${breed.id})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteBreed(${breed.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function showAddModal() {
    editingBreedId = null;
    document.getElementById('modalTitle').textContent = 'Nueva Raza';
    document.getElementById('breedForm').reset();
    document.getElementById('breedId').value = '';
    document.getElementById('breedModal').classList.remove('hidden');
}

async function editBreed(id) {
    try {
        const response = await fetch(`${API_URL}/razas/${id}`);
        const breed = await response.json();
        
        editingBreedId = id;
        document.getElementById('modalTitle').textContent = 'Editar Raza';
        document.getElementById('breedId').value = id;
        document.getElementById('nombre').value = breed.nombre;
        document.getElementById('origen').value = breed.origen || '';
        document.getElementById('descripcion').value = breed.descripcion || '';
        
        document.getElementById('breedModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading breed:', error);
        alert('Error al cargar la raza');
    }
}

async function deleteBreed(id) {
    if (!confirm('¿Está seguro de eliminar esta raza?')) return;
    
    try {
        await fetch(`${API_URL}/razas/${id}`, { method: 'DELETE' });
        loadBreeds();
    } catch (error) {
        console.error('Error deleting breed:', error);
        alert('Error al eliminar la raza');
    }
}

function closeModal() {
    document.getElementById('breedModal').classList.add('hidden');
}

document.getElementById('breedForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        nombre: document.getElementById('nombre').value,
        origen: document.getElementById('origen').value,
        descripcion: document.getElementById('descripcion').value
    };
    
    try {
        const url = editingBreedId ? `${API_URL}/razas/${editingBreedId}` : `${API_URL}/razas`;
        const method = editingBreedId ? 'PUT' : 'POST';
        
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        closeModal();
        loadBreeds();
    } catch (error) {
        console.error('Error saving breed:', error);
        alert('Error al guardar la raza');
    }
});
