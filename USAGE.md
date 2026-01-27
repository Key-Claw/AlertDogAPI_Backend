# Guía de Uso - AlertDogAPI

Esta guía proporciona instrucciones paso a paso para usar el sistema AlertDogAPI.

## 📚 Tabla de Contenidos

1. [Inicio Rápido](#inicio-rápido)
2. [Uso de la API](#uso-de-la-api)
3. [Uso del Frontend](#uso-del-frontend)
4. [Ejemplos de Uso](#ejemplos-de-uso)

## Inicio Rápido

### Con Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Key-Claw/AlertDogAPI.git
cd AlertDogAPI

# 2. Iniciar los servicios
docker-compose up -d

# 3. Verificar que los servicios están corriendo
docker-compose ps

# 4. Acceder a la aplicación
# Frontend: http://localhost:3000
# API: http://localhost:3000/api
```

### Sin Docker

```bash
# 1. Instalar dependencias
cd backend
npm install

# 2. Configurar base de datos
# Crear archivo .env basado en .env.example
cp .env.example .env

# 3. Inicializar la base de datos
mysql -u root -p < ../database/init.sql

# 4. Iniciar el servidor
npm start
```

## Uso de la API

### Endpoints Disponibles

#### 1. Razas (Breeds)

**Obtener todas las razas**
```bash
curl http://localhost:3000/api/razas
```

**Obtener una raza específica**
```bash
curl http://localhost:3000/api/razas/1
```

**Crear una nueva raza**
```bash
curl -X POST http://localhost:3000/api/razas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Border Collie",
    "descripcion": "Inteligente y enérgico",
    "origen": "Reino Unido"
  }'
```

**Actualizar una raza**
```bash
curl -X PUT http://localhost:3000/api/razas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pastor Alemán",
    "descripcion": "Raza muy inteligente y leal",
    "origen": "Alemania"
  }'
```

**Eliminar una raza**
```bash
curl -X DELETE http://localhost:3000/api/razas/1
```

#### 2. Perros (Dogs)

**Obtener todos los perros**
```bash
curl http://localhost:3000/api/perros
```

**Crear un nuevo perro (con imagen)**
```bash
curl -X POST http://localhost:3000/api/perros \
  -F "nombre=Thor" \
  -F "raza_id=1" \
  -F "edad=3" \
  -F "descripcion=Perro de búsqueda y rescate" \
  -F "imagen=@/ruta/a/imagen.jpg"
```

**Actualizar un perro**
```bash
curl -X PUT http://localhost:3000/api/perros/1 \
  -F "nombre=Max" \
  -F "raza_id=1" \
  -F "edad=4" \
  -F "descripcion=Perro de alerta entrenado"
```

#### 3. Usuarios (Users)

**Obtener todos los usuarios**
```bash
curl http://localhost:3000/api/usuarios
```

**Crear un nuevo usuario**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Torres",
    "email": "ana@example.com",
    "telefono": "645123456",
    "rol": "usuario"
  }'
```

#### 4. Citas (Appointments)

**Obtener todas las citas**
```bash
curl http://localhost:3000/api/citas
```

**Crear una nueva cita**
```bash
curl -X POST http://localhost:3000/api/citas \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 1,
    "perro_id": 1,
    "fecha": "2026-03-15",
    "hora": "10:30:00",
    "motivo": "Revisión veterinaria",
    "estado": "pendiente"
  }'
```

## Uso del Frontend

### Página Principal

1. Accede a `http://localhost:3000`
2. Verás estadísticas de:
   - Perros registrados
   - Razas disponibles
   - Usuarios en el sistema
   - Citas programadas

### Gestión de Perros

1. Ir a **Perros** en el menú de navegación
2. **Ver perros**: Lista de todos los perros con sus fotos
3. **Agregar perro**:
   - Clic en "Nuevo Perro"
   - Completar el formulario
   - Seleccionar imagen (opcional)
   - Clic en "Guardar"
4. **Editar perro**: Clic en botón "Editar" en la tarjeta del perro
5. **Eliminar perro**: Clic en botón "Eliminar" (requiere confirmación)

### Gestión de Razas

1. Ir a **Razas** en el menú
2. **Ver razas**: Tabla con todas las razas
3. **Agregar raza**: 
   - Clic en "Nueva Raza"
   - Completar nombre, origen y descripción
   - Guardar
4. **Editar/Eliminar**: Usar los botones en la tabla

### Gestión de Usuarios

1. Ir a **Usuarios** en el menú
2. **Ver usuarios**: Tabla con todos los usuarios y sus roles
3. **Agregar usuario**:
   - Clic en "Nuevo Usuario"
   - Completar datos (nombre, email, teléfono)
   - Seleccionar rol (usuario, veterinario, admin)
   - Guardar
4. **Editar/Eliminar**: Usar los botones en la tabla

### Gestión de Citas

1. Ir a **Citas** en el menú
2. **Ver citas**: Tabla con todas las citas programadas
3. **Agregar cita**:
   - Clic en "Nueva Cita"
   - Seleccionar usuario y perro
   - Indicar fecha y hora
   - Añadir motivo
   - Seleccionar estado (pendiente, confirmada, completada, cancelada)
   - Guardar
4. **Editar/Eliminar**: Usar los botones en la tabla

## Ejemplos de Uso

### Ejemplo 1: Registrar un nuevo perro de alerta

```javascript
// 1. Primero, asegúrate de que existe la raza
fetch('http://localhost:3000/api/razas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Labrador Retriever',
    descripcion: 'Excelente olfato para detección',
    origen: 'Canadá'
  })
});

// 2. Registrar el perro
const formData = new FormData();
formData.append('nombre', 'Luna');
formData.append('raza_id', 2);
formData.append('edad', 2);
formData.append('descripcion', 'Especializada en detección de sustancias');
formData.append('imagen', fileInput.files[0]);

fetch('http://localhost:3000/api/perros', {
  method: 'POST',
  body: formData
});
```

### Ejemplo 2: Programar una cita veterinaria

```javascript
// 1. Obtener los perros disponibles
const perrosResponse = await fetch('http://localhost:3000/api/perros');
const perros = await perrosResponse.json();

// 2. Crear la cita
fetch('http://localhost:3000/api/citas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    usuario_id: 1,
    perro_id: perros[0].id,
    fecha: '2026-03-20',
    hora: '11:00:00',
    motivo: 'Vacunación anual',
    estado: 'pendiente'
  })
});
```

### Ejemplo 3: Actualizar el estado de una cita

```javascript
fetch('http://localhost:3000/api/citas/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    usuario_id: 1,
    perro_id: 1,
    fecha: '2026-03-20',
    hora: '11:00:00',
    motivo: 'Vacunación anual',
    estado: 'completada' // Cambiar de pendiente a completada
  })
});
```

## Solución de Problemas

### El servidor no inicia

```bash
# Verificar que el puerto 3000 no está en uso
lsof -i :3000

# Verificar los logs
docker-compose logs api
```

### Error de conexión a base de datos

```bash
# Verificar que MariaDB está corriendo
docker-compose ps

# Revisar las credenciales en .env
cat backend/.env

# Reiniciar los servicios
docker-compose restart
```

### Las imágenes no se cargan

```bash
# Verificar que la carpeta images existe
ls -la images/

# Verificar permisos
chmod 755 images/
```

## Recursos Adicionales

- [README.md](README.md) - Información general del proyecto
- [SECURITY.md](SECURITY.md) - Consideraciones de seguridad
- [database/init.sql](database/init.sql) - Esquema de base de datos

## Soporte

Para reportar problemas o hacer preguntas, abre un issue en GitHub.
