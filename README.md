# AlertDogAPI Backend

Backend REST para la gestion de usuarios, perros y citas.

## Tecnologias
- Node.js
- Express
- Knex
- MariaDB / MySQL
- js-yaml
- yargs

## Estructura del proyecto
```text
src/
  app.js
  configuration/
    config.js
    database.js
  controllers/
    usuarioController.js
    perroController.js
    citaController.js
  routes/
    usuarioRoute.js
    perroRoute.js
    citaRoute.js
  service/
    usuarioService.js
    perroService.js
    citaService.js
db/
  init.sql
postman/
  usuarios.postman_collection.json
  perros.postman_collection.json
  citas.postman_collection.json
tests/
  api-smoke-tests.ps1
```

## Configuracion
El backend utiliza `config.local.yaml` para la conexion a base de datos.

Ejemplo valido:
```yaml
db:
  host: localhost
  port: 3306
  user: admin
  password: "1234"
  database: AlertDog

service:
  port: 8080
```

Nota importante: `password` debe ir como string (entre comillas) para evitar errores de autenticacion en `mysql2`.

## Scripts NPM
- `npm run start`: inicia el backend en `http://0.0.0.0:3000`
- `npm run dev`: inicia el backend con nodemon
- `npm run test:api`: ejecuta pruebas rapidas de API en `tests/api-smoke-tests.ps1`

## Endpoints implementados
### Usuarios
- `GET /usuarios`
- `GET /usuarios/:id`
- `POST /usuarios`
- `PUT /usuarios/:id`
- `DELETE /usuarios/:id`

### Perros
- `GET /perros`
- `GET /perros/:id`
- `POST /perros`
- `PUT /perros/:id`
- `DELETE /perros/:id`

### Citas
- `GET /citas`
- `GET /citas/:id`
- `POST /citas`
- `PUT /citas/:id`
- `DELETE /citas/:id`

## Reglas de negocio implementadas
- No se permiten citas duplicadas para el mismo perro en la misma fecha y hora.
- Validacion de campos obligatorios en creacion de citas (`fecha`, `hora`, `id_perro`).
- Integridad referencial con claves foraneas y `ON DELETE CASCADE`.

## Codigos HTTP relevantes
- `200`: consulta o actualizacion correcta
- `201`: creacion correcta
- `400`: datos invalidos en citas (`CITA_INVALIDA`)
- `404`: recurso no encontrado
- `409`: conflicto por cita duplicada (`CITA_DUPLICADA`)
- `500`: error interno no controlado

## Base de datos
El archivo `db/init.sql` contiene:
- Creacion de tablas `usuario`, `perro`, `cita`
- Relaciones entre tablas
- Datos iniciales de prueba

## Testing
Se incluyo una carpeta dedicada para pruebas: `tests/`.

Archivo actual:
- `tests/api-smoke-tests.ps1`

Cobertura de estas pruebas:
- Salud de API (`GET /`)
- Listados principales (`/usuarios`, `/perros`, `/citas`)
- Caso `404` de usuario inexistente
- Caso `409` por cita duplicada
- Caso `400` por cita invalida

Ejecucion:
```bash
npm run test:api
```

## Postman
Las colecciones de Postman estan en la carpeta `postman/`:
- `postman/usuarios.postman_collection.json`
- `postman/perros.postman_collection.json`
- `postman/citas.postman_collection.json`

## Arranque rapido
1. Crear base de datos `AlertDog` en MariaDB/MySQL.
2. Importar `db/init.sql`.
3. Revisar `config.local.yaml`.
4. Instalar dependencias:
```bash
npm install
```
5. Iniciar backend:
```bash
npm run start
```
6. Ejecutar pruebas rapidas:
```bash
npm run test:api
```# 🐕 AlertDogAPI

Perfecto 👌 este README explica de forma clara y profesional la configuración del backend de AlertDogAPI, listo para usar y entender fácilmente.

---

## 📦 Backend – `package.json` explicado

El archivo `package.json` define la configuración del proyecto backend, incluyendo:

* Nombre del proyecto
* Scripts de ejecución
* Dependencias necesarias para el funcionamiento de la API

---

### 📌 Información general

```json
"name": "AlertDogAPI_Backend"
```

Este es el **nombre del proyecto backend**.

---

### ▶ Scripts

```json
"scripts": {
  "start": "node src/app.js --config config.loca.yaml"
}
```

#### 🔹 `start`

Inicia el servidor backend utilizando Node.js:

* `node src/app.js` → Ejecuta el archivo principal del servidor
* `--config config.loca.yaml` → Pasa un archivo de configuración externo en formato YAML

Se ejecuta con:

```bash
npm start
```

---

## 📚 Dependencias

Las siguientes librerías son necesarias para que la API funcione correctamente:

---

### 🚀 express (5.1.0)

Framework para crear el servidor web y construir la API REST.

Permite:

* Definir rutas (`GET`, `POST`, `PUT`, `DELETE`)
* Manejar peticiones HTTP
* Conectar el backend con el frontend

---

### 🗄 knex (^3.1.0)

Query Builder para bases de datos.

Permite:

* Realizar consultas SQL desde JavaScript
* Insertar, actualizar y eliminar datos
* Gestionar la conexión con MariaDB de forma estructurada

---

### 🐬 mysql2 (^3.9.0)

Driver que permite conectar Node.js con MariaDB/MySQL.

* Es utilizado por Knex para comunicarse con la base de datos

---

### 🌍 cors (^2.8.5)

Middleware que permite la comunicación entre frontend y backend cuando están en diferentes puertos o dominios.

* Evita errores de tipo **CORS policy** en el navegador

---

### 🔐 dotenv (^16.4.0)

Permite cargar variables de entorno desde un archivo `.env`.

Se utiliza para almacenar datos sensibles como:

* Usuario de base de datos
* Contraseña
* Host
* Puerto
* Configuración del servidor

---

### 🔑 bcrypt (^5.1.0)

Librería utilizada para **encriptar contraseñas** antes de guardarlas en la base de datos.

* Garantiza que las contraseñas **no se almacenen en texto plano**

---

### 📄 js-yaml (4.0.0)

Permite leer archivos de configuración en formato `.yaml`.

* Se utiliza para cargar configuraciones externas del servidor

---

### 🧾 yargs (17.0.0)

Permite leer **argumentos enviados por consola**.

* Se usa para pasar el archivo de configuración al iniciar el servidor

---

## 🛠 DevDependencies

Dependencias utilizadas únicamente en entorno de desarrollo.

---

### 🔄 nodemon (^3.0.0)

Herramienta que reinicia automáticamente el servidor cuando se detectan cambios en el código.

Se recomienda añadir un script adicional para desarrollo:

```json
"dev": "nodemon src/app.js"
```

Y ejecutarlo con:

```bash
npm run dev
```

---

## 🎯 Resumen técnico

El backend de **AlertDogAPI** está construido con:

* **Node.js** como entorno de ejecución
* **Express** para la creación de la API REST
* **Knex + MariaDB** para la gestión de base de datos
* **bcrypt** para seguridad de contraseñas
* **dotenv y YAML** para gestión de configuración
* **Docker** para la contenerización del sistema

---