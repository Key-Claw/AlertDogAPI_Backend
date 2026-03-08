# AlertDogAPI Backend

API REST para gestionar `usuarios`, `perros` y `citas`.

## Alcance del repositorio
Este repositorio contiene solo el backend (Node.js + Express + Knex + MariaDB).

Existe un frontend en un repositorio separado que consume esta API via HTTP.

## Stack
- Node.js
- Express
- Knex
- MariaDB / MySQL
- js-yaml
- yargs

## Estructura principal
```text
src/
  app.js
  configuration/
    config.js
    database.js
  controllers/
  routes/
  service/
db/
  init.sql
postman/
tests/
```

## Configuracion
La API usa `config.local.yaml` para conectar a base de datos.

Ejemplo:
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

Tambien soporta variables de entorno:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `HOST`
- `PORT`
- `CORS_ORIGINS` (CSV)

## Scripts
- `npm run start`: inicia API en `0.0.0.0:3000`
- `npm run dev`: inicia API con nodemon
- `npm run test:api`: smoke tests en PowerShell

## Endpoints
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

## Reglas de negocio
- Citas duplicadas para el mismo perro/fecha/hora -> `409` (`CITA_DUPLICADA`).
- Campos obligatorios de cita ausentes -> `400` (`CITA_INVALIDA`).
- Recurso inexistente -> `404`.

## Base de datos
`db/init.sql` crea tablas y datos semilla:
- `usuario`
- `perro`
- `cita`

## Arranque local (MariaDB instalada en host)
1. Crear base `AlertDog`.
2. Importar `db/init.sql`.
3. Ajustar `config.local.yaml`.
4. Instalar dependencias:
```bash
npm install
```
5. Levantar API:
```bash
npm run dev
```

## Arranque con Docker (DB)
Levantar solo la base:
```bash
docker compose up -d db
```

Si necesitas reiniciar base y volumen:
```bash
docker compose down -v
docker compose up -d db
```

Importar SQL manualmente desde host:
```bash
Get-Content -Raw .\db\init.sql | docker exec -i alertdog_db mariadb -uadmin -p1234 AlertDog
```

## Testing
Con API levantada en `http://localhost:3000`:
```bash
npm run test:api
```

## Troubleshooting
- `ECONNREFUSED 127.0.0.1:3306`: la DB no esta arriba o credenciales no coinciden.
- Error de CORS desde frontend: revisar `CORS_ORIGINS`.
- Si usas Docker en Windows y falla init automatico, importar `db/init.sql` manualmente.