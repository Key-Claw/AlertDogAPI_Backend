# AlertDogAPI Backend

[![Backend CI](https://github.com/Key-Claw/AlertDogAPI_Backend/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/Key-Claw/AlertDogAPI_Backend/actions/workflows/backend-ci.yml)

API REST para gestionar `usuarios`, `perros` y `citas`.

## Estado actual (Marzo 2026)
- Backend operativo en Node + Express con persistencia MariaDB via Knex.
- CI ejecuta pruebas de smoke, CRUD de usuarios y flujo integrado usuario -> perro -> cita.
- Se incluyen suites PowerShell para validar reglas de negocio y regresiones funcionales.

## Que contiene este repositorio
Este repositorio contiene solo el backend:
- Node.js + Express para exponer endpoints HTTP.
- Knex + MariaDB para persistencia.
- Tests PowerShell para validacion de API y flujos de negocio.
- CI en GitHub Actions para validar automaticamente cada push/PR.

## Stack tecnico
- Node.js
- Express
- Knex
- MariaDB / MySQL
- js-yaml
- yargs

## Estructura principal
```text
src/
  app.js                     # bootstrap de servidor y middlewares
  configuration/
    config.js                # carga config YAML/CLI
    database.js              # inicializacion de Knex
  controllers/               # capa HTTP
  routes/                    # definicion de endpoints
  service/                   # logica de acceso a datos
db/
  init.sql                   # esquema + seed
tests/
  api-smoke-tests.ps1        # smoke basico
  api-usuarios-crud-tests.ps1# CRUD usuarios
  api-flujo-perros-citas-tests.ps1 # flujo integrado
.github/workflows/
  backend-ci.yml             # pipeline CI
```

## Configuracion
La API usa `config.local.yaml` por defecto para DB y servicio.

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

Tambien soporta variables de entorno (prioridad sobre YAML):
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `HOST`
- `PORT`
- `CORS_ORIGINS` (CSV)

## Scripts npm
- `npm run start`: arranca API en `0.0.0.0:3000`.
- `npm run dev`: arranca API con nodemon.
- `npm run test:api`: smoke tests de API.
- `npm run test:api:usuarios`: CRUD de usuarios.
- `npm run test:api:flujo`: flujo usuario -> perro -> cita.
- `npm run test:api:all`: ejecuta las tres suites anteriores en cadena.

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

## Reglas de negocio ya cubiertas
- Citas duplicadas (mismo perro/fecha/hora) devuelven `409`.
- Citas con campos faltantes devuelven `400`.
- Recursos inexistentes devuelven `404`.

## Como levantar en local
1. Crear base `AlertDog`.
2. Importar `db/init.sql`.
3. Revisar `config.local.yaml`.
4. Instalar dependencias:
```bash
npm install
```
5. Arrancar backend:
```bash
npm run dev
```

## Opcion con Docker (solo DB)
```bash
docker compose up -d db
```

Reiniciar DB y volumen:
```bash
docker compose down -v
docker compose up -d db
```

Importar SQL manualmente (Windows PowerShell):
```powershell
Get-Content -Raw .\db\init.sql | docker exec -i alertdog_db mariadb -uadmin -p1234 AlertDog
```

## Testing (local)
Con backend arriba en `http://localhost:3000`:
```bash
npm run test:api
npm run test:api:usuarios
npm run test:api:flujo
```

O todo junto:
```bash
npm run test:api:all
```

## CI (GitHub Actions)
Workflow: `.github/workflows/backend-ci.yml`

Se ejecuta en:
- `push` a `main`, `dev`, `feature/**`
- `pull_request` a `main` y `dev`
- ejecucion manual (`workflow_dispatch`)

Que hace el pipeline:
1. Levanta MariaDB de prueba.
2. Carga `db/init.sql`.
3. Arranca backend.
4. Ejecuta `test:api`, `test:api:usuarios` y `test:api:flujo`.
5. Si falla, imprime logs para diagnostico.

## Troubleshooting
- `ECONNREFUSED 127.0.0.1:3306`: DB apagada o credenciales incorrectas.
- Errores CORS desde frontend: revisar `CORS_ORIGINS`.
- Si falla import automatica en Windows + Docker: importar `db/init.sql` manualmente.