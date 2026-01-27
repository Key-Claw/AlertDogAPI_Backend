# AlertDogAPI

API REST y frontend con Tailwind CSS para la gestión de perros de alerta, razas, usuarios y citas.

## 📋 Descripción

AlertDogAPI es un sistema completo de gestión para perros de alerta que incluye:
- **Gestión de Perros**: Registro y administración de perros de alerta con imágenes
- **Gestión de Razas**: Catálogo de razas caninas
- **Gestión de Usuarios**: Administración de usuarios, veterinarios y administradores
- **Gestión de Citas**: Sistema de programación de citas veterinarias

## 🛠️ Tecnologías

### Backend
- Node.js + Express
- MariaDB (Base de datos)
- Multer (Upload de imágenes)
- CORS
- dotenv

### Frontend
- HTML5
- Tailwind CSS
- JavaScript (Vanilla)
- Font Awesome

### DevOps
- Docker
- Docker Compose

## 📁 Estructura del Proyecto

```
AlertDogAPI/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   ├── breeds.js
│   │   │   ├── dogs.js
│   │   │   ├── users.js
│   │   │   └── appointments.js
│   │   ├── middleware/
│   │   │   └── upload.js
│   │   └── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   └── public/
│       ├── index.html
│       ├── dogs.html
│       ├── breeds.html
│       ├── users.html
│       ├── appointments.html
│       └── js/
│           ├── main.js
│           ├── dogs.js
│           ├── breeds.js
│           ├── users.js
│           └── appointments.js
├── database/
│   └── init.sql
├── images/
├── docker-compose.yml
└── README.md
```

## 🚀 Instalación y Uso

### Opción 1: Con Docker (Recomendado)

1. **Clonar el repositorio**
```bash
git clone https://github.com/Key-Claw/AlertDogAPI.git
cd AlertDogAPI
```

2. **Iniciar los servicios con Docker Compose**
```bash
docker-compose up -d
```

3. **Acceder a la aplicación**
- Frontend: http://localhost:3000
- API: http://localhost:3000/api

### Opción 2: Instalación Manual

#### Requisitos Previos
- Node.js 18+ 
- MariaDB 10.11+
- npm

#### Backend

1. **Instalar dependencias**
```bash
cd backend
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales de base de datos
```

3. **Crear la base de datos**
```bash
mysql -u root -p < ../database/init.sql
```

4. **Iniciar el servidor**
```bash
npm start
# O para desarrollo con auto-reload:
npm run dev
```

## 📊 API Endpoints

### Razas (Breeds)
- `GET /api/razas` - Obtener todas las razas
- `GET /api/razas/:id` - Obtener una raza por ID
- `POST /api/razas` - Crear una nueva raza
- `PUT /api/razas/:id` - Actualizar una raza
- `DELETE /api/razas/:id` - Eliminar una raza

### Perros (Dogs)
- `GET /api/perros` - Obtener todos los perros
- `GET /api/perros/:id` - Obtener un perro por ID
- `POST /api/perros` - Crear un nuevo perro (con upload de imagen)
- `PUT /api/perros/:id` - Actualizar un perro
- `DELETE /api/perros/:id` - Eliminar un perro

### Usuarios (Users)
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar un usuario
- `DELETE /api/usuarios/:id` - Eliminar un usuario

### Citas (Appointments)
- `GET /api/citas` - Obtener todas las citas
- `GET /api/citas/:id` - Obtener una cita por ID
- `POST /api/citas` - Crear una nueva cita
- `PUT /api/citas/:id` - Actualizar una cita
- `DELETE /api/citas/:id` - Eliminar una cita

## 🗄️ Base de Datos

La base de datos incluye las siguientes tablas:

- **razas**: Información de razas caninas
- **perros**: Registro de perros de alerta
- **usuarios**: Usuarios del sistema (usuario, veterinario, admin)
- **citas**: Citas veterinarias y revisiones

Ver `database/init.sql` para el esquema completo y datos de ejemplo.

## 📸 Características

- ✅ CRUD completo para todas las entidades
- ✅ Upload de imágenes para perros
- ✅ Interfaz responsive con Tailwind CSS
- ✅ API RESTful
- ✅ Base de datos relacional
- ✅ Containerización con Docker
- ✅ Datos de ejemplo precargados

## 🔒 Seguridad

Este proyecto está diseñado con fines educativos (DAW 1). Para uso en producción, consulte el archivo [SECURITY.md](SECURITY.md) que documenta:
- Medidas de seguridad implementadas
- Recomendaciones para producción (rate limiting, autenticación, HTTPS, etc.)
- Hallazgos de análisis de seguridad CodeQL

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=alertdog_db
DB_PORT=3306
PORT=3000
UPLOAD_PATH=../images
```

## 📝 Datos de Ejemplo

El sistema incluye datos de ejemplo:
- 4 razas de perros
- 4 perros de alerta
- 3 usuarios (admin, veterinario, usuario)
- 2 citas programadas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es parte de un proyecto académico DAW 1.

## 👥 Autor

Proyecto desarrollado como parte del curso DAW (Desarrollo de Aplicaciones Web).

## 🐛 Problemas Conocidos

Si encuentras algún problema, por favor abre un issue en GitHub.

## 📞 Soporte

Para soporte o preguntas, abre un issue en el repositorio de GitHub.
