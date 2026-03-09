# Tutorial de autoria - Backend (AlertDogAPI)

Este documento explica como esta construido el backend, por que se tomaron ciertas decisiones y como demostrar autoria tecnica durante una defensa.

## 1. Objetivo del backend
El backend expone una API REST para tres recursos principales:
- `usuarios`
- `perros`
- `citas`

La API aplica reglas de negocio, valida datos y persiste en MariaDB mediante Knex.

## 2. Arquitectura aplicada
La estructura sigue una separacion por capas:
- `routes/`: define endpoints y mapea controlador.
- `controllers/`: recibe request HTTP y construye response.
- `service/`: concentra logica de negocio y acceso a datos.
- `configuration/`: carga configuracion y conexion DB.
- `utils/`: funciones puras reutilizables (reglas de dominio).

Flujo por request:
1. Entra por `route`.
2. Llega al `controller`.
3. El `controller` delega al `service`.
4. El `service` valida y consulta DB.
5. Respuesta HTTP al cliente.

## 3. Decisiones de autoria (y como justificarlas)
### 3.1 Reglas de dominio separadas
Se extrajeron reglas a `src/utils/domainRules.js` para mantener el `service` mas limpio y permitir pruebas unitarias puras.

Funciones clave:
- `normalizeRol`
- `sanitizePerroFilters`
- `getDaysFromNow`

Justificacion:
- Facilita pruebas aisladas.
- Reduce duplicacion.
- Mejora mantenibilidad.

### 3.2 Separacion de pruebas unitarias e integracion
- Unitarias: `tests/unit/`.
- Integracion API: `tests/integration/`.

Justificacion:
- Cumple rubrica de pruebas unitarias obligatorias.
- Mantiene pruebas de flujo como capa extra de calidad.
- Mejora trazabilidad para CI.

### 3.3 Manejo explicito de errores de negocio
Se usan codigos HTTP coherentes:
- `400` para datos invalidos.
- `404` para recurso no encontrado.
- `409` para conflicto (ej. cita duplicada).

Justificacion:
- Contrato API claro.
- Facil integracion frontend.
- Facil de testear automaticamente.

## 4. Evidencia tecnica de autoria
Para demostrar autoria de forma practica:
1. Ejecutar unit tests:
```bash
npm run test:unit
```
2. Ejecutar integracion API:
```bash
npm run test:api:all
```
3. Mostrar archivo de reglas:
- `src/utils/domainRules.js`
4. Mostrar uso de filtros en perros:
- `src/controllers/perroController.js`
- `src/service/perroService.js`

## 5. Tutorial rapido para explicar el backend en defensa
Guion sugerido (2-3 minutos):
1. "La API esta dividida en rutas, controladores y servicios".
2. "Las reglas puras se movieron a utilidades para poder testearlas de forma unitaria".
3. "Las pruebas de integracion validan flujos reales usuario -> perro -> cita".
4. "CI ejecuta pruebas automaticamente en cada push/PR".
5. "El sistema maneja errores con 400/404/409 segun el tipo de falla".

## 6. Limites y mejoras futuras
- Agregar autenticacion JWT real y middleware de autorizacion.
- Agregar paginacion estandar en listados.
- Agregar logs estructurados y observabilidad.
- Agregar tests de carga y contract testing.
