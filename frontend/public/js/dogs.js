const API_URL = 'http://localhost:3000/api';

let editingDogId = null;

// Load dogs on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDogs();
    loadBreeds();
});

async function loadDogs() {
    try {
        const response = await fetch(`${API_URL}/perros`);
        const dogs = await response.json();
        displayDogs(dogs);
    } catch (error) {
        console.error('Error loading dogs:', error);
        alert('Error al cargar los perros');
    }
}

async function loadBreeds() {
    try {
        const response = await fetch(`${API_URL}/razas`);
        const breeds = await response.json();
        const select = document.getElementById('raza_id');
        select.innerHTML = '<option value="">Seleccionar raza...</option>';
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading breeds:', error);
    }
}

function displayDogs(dogs) {
    const grid = document.getElementById('dogsGrid');
    grid.innerHTML = '';

    dogs.forEach(dog => {
        const imagePath = dog.imagen ? `/images/${dog.imagen}` : '/images/placeholder-dog.jpg';
        const card = `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="${imagePath}" alt="${dog.nombre}" class="w-full h-48 object-cover" onerror="this.src='/images/placeholder-dog.jpg'">
                <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${dog.nombre}</h3>
                    <p class="text-gray-600 mb-1"><i class="fas fa-paw text-blue-600"></i> ${dog.raza_nombre || 'Sin raza'}</p>
                    <p class="text-gray-600 mb-1"><i class="fas fa-calendar text-blue-600"></i> ${dog.edad} años</p>
                    <p class="text-gray-600 mb-3">${dog.descripcion || 'Sin descripción'}</p>
                    <div class="flex space-x-2">
                        <button onclick="editDog(${dog.id})" class="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button onclick="deleteDog(${dog.id})" class="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function showAddModal() {
    editingDogId = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Perro';
    document.getElementById('dogForm').reset();
    document.getElementById('dogId').value = '';
    document.getElementById('dogModal').classList.remove('hidden');
}

async function editDog(id) {
    try {
        const response = await fetch(`${API_URL}/perros/${id}`);
        const dog = await response.json();
        
        editingDogId = id;
        document.getElementById('modalTitle').textContent = 'Editar Perro';
        document.getElementById('dogId').value = id;
        document.getElementById('nombre').value = dog.nombre;
        document.getElementById('raza_id').value = dog.raza_id;
        document.getElementById('edad').value = dog.edad;
        document.getElementById('descripcion').value = dog.descripcion || '';
        
        document.getElementById('dogModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading dog:', error);
        alert('Error al cargar el perro');
    }
}

async function deleteDog(id) {
    if (!confirm('¿Está seguro de eliminar este perro?')) return;
    
    try {
        await fetch(`${API_URL}/perros/${id}`, { method: 'DELETE' });
        loadDogs();
    } catch (error) {
        console.error('Error deleting dog:', error);
        alert('Error al eliminar el perro');
    }
}

function closeModal() {
    document.getElementById('dogModal').classList.add('hidden');
}

document.getElementById('dogForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('raza_id', document.getElementById('raza_id').value);
    formData.append('edad', document.getElementById('edad').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    
    const imageFile = document.getElementById('imagen').files[0];
    if (imageFile) {
        formData.append('imagen', imageFile);
    }
    
    try {
        const url = editingDogId ? `${API_URL}/perros/${editingDogId}` : `${API_URL}/perros`;
        const method = editingDogId ? 'PUT' : 'POST';
        
        await fetch(url, {
            method: method,
            body: formData
        });
        
        closeModal();
        loadDogs();
    } catch (error) {
        console.error('Error saving dog:', error);
        alert('Error al guardar el perro');
    }
});
