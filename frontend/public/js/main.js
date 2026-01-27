const API_URL = 'http://localhost:3000/api';

// Load statistics on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load dogs count
        const dogsResponse = await fetch(`${API_URL}/perros`);
        const dogs = await dogsResponse.json();
        document.getElementById('totalPerros').textContent = dogs.length;

        // Load breeds count
        const breedsResponse = await fetch(`${API_URL}/razas`);
        const breeds = await breedsResponse.json();
        document.getElementById('totalRazas').textContent = breeds.length;

        // Load users count
        const usersResponse = await fetch(`${API_URL}/usuarios`);
        const users = await usersResponse.json();
        document.getElementById('totalUsuarios').textContent = users.length;

        // Load appointments count
        const appointmentsResponse = await fetch(`${API_URL}/citas`);
        const appointments = await appointmentsResponse.json();
        document.getElementById('totalCitas').textContent = appointments.length;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
});
