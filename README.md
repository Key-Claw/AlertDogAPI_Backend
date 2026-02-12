# 🐕 AlertDogAPI

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