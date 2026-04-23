# 🔍 AUDITORÍA CRÍTICA DEL CÓDIGO - Fase 2

**Fecha:** 22 de abril de 2026  
**Proyecto:** asistencia-api-vibe  
**Responsable:** Auditoría de Código  

---

## Resumen Ejecutivo

Se identificaron **10 hallazgos críticos** durante la auditoría de código. **5 de severidad alta/crítica** que comprometen la seguridad del sistema.

---

## Hallazgos Documentados

---

### Hallazgo 1 — Exposición de datos de estudiantes sin autenticación

- **Severidad:** CRÍTICA
- **Archivo/línea:** `src/controllers/estudiantesController.js`, línea 48-60 (función `listarEstudiantes`)
- **Descripción:** El endpoint `GET /api/estudiantes` devuelve la lista completa de todos los estudiantes (nombre, email, fecha de creación) sin requerir autenticación ni autorización.
- **Evidencia:** 
  ```javascript
  function listarEstudiantes(req, res, next) {
    try {
      const estudiantes = getAllEstudiantes();
      res.status(200).json({
        success: true,
        message: 'Estudiantes obtenidos exitosamente',
        data: estudiantes,
        total: estudiantes.length
      });
    } catch (err) {
      next(err);
    }
  }
  ```
- **Impacto:** Exposición de información personal identificable (PII - Nombre y Email). Cualquier persona puede acceder a la base de datos completa de estudiantes.

---

### Hallazgo 2 — CORS configurado de manera abierta

- **Severidad:** MEDIA
- **Archivo/línea:** `src/server.js`, línea 20
- **Descripción:** CORS está habilitado sin restricción de orígenes. `app.use(cors());` sin configuración específica de dominios permitidos.
- **Evidencia:**
  ```javascript
  // Middleware
  app.use(cors());
  ```
- **Impacto:** Cualquier sitio web puede hacer solicitudes CORS a la API. Vulnerabilidad de Cross-Origin Resource Sharing que facilita ataques CSRF y acceso no autorizado desde navegadores.

---

### Hallazgo 3 — Sin autenticación en ningún endpoint

- **Severidad:** CRÍTICA
- **Archivo/línea:** Afecta a todos los archivos de rutas: `src/routes/estudiantesRoutes.js`, `src/routes/asistenciasRoutes.js`, `src/routes/reportesRoutes.js`
- **Descripción:** Ningún endpoint requiere autenticación. No hay JWT, API keys, sesiones o ningún mecanismo de control de acceso.
- **Evidencia:** Todos los endpoints usan solo `router.post()` o `router.get()` sin middleware de autenticación:
  ```javascript
  // Ejemplo: Sin protección
  router.post('/', crearEstudiante);
  router.get('/', listarEstudiantes);
  router.get('/estudiante/:id', obtenerAsistenciasEstudiante);
  ```
- **Impacto:** Cualquier usuario no autenticado puede crear estudiantes, registrar asistencias falsas, acceder a datos confidenciales.

---

### Hallazgo 4 — Falta de control de autorización (acceso a datos de otros estudiantes)

- **Severidad:** CRÍTICA
- **Archivo/línea:** `src/controllers/asistenciasController.js`, línea 62-85 (función `obtenerAsistenciasEstudiante`)
- **Descripción:** Cualquier usuario puede acceder a las asistencias de cualquier estudiante solo proporcionando el ID. No hay validación de que el usuario tenga derecho a ver esos datos.
- **Evidencia:**
  ```javascript
  function obtenerAsistenciasEstudiante(req, res, next) {
    try {
      const { id } = req.params;
      // Sin validar si el usuario autenticado es el estudiante o autorizado
      const estudiante = getEstudianteById(id);
      if (!estudiante) {
        return next(...);
      }
      const asistencias = getAsistenciasByEstudianteId(id);
      res.status(200).json({...});
    } catch (err) {
      next(err);
    }
  }
  ```
- **Impacto:** Violación de privacidad. Un estudiante puede consultar asistencias de todos los demás estudiantes del sistema.

---

### Hallazgo 5 — Exposición de información personal en reportes sin control de acceso

- **Severidad:** MEDIA
- **Archivo/línea:** `src/controllers/reportesController.js`, línea 22-28
- **Descripción:** El endpoint `GET /api/reportes/ausentismo` devuelve email y nombre completo en el ranking de ausencias sin requerer autenticación.
- **Evidencia:**
  ```javascript
  const top5 = estudiantes_con_ausencias
    .sort((a, b) => {...})
    .slice(0, 5)
    .map((est, index) => ({
      ranking: index + 1,
      id: est.id,
      nombre: est.nombre,      // ← PII expuesto
      email: est.email,        // ← PII expuesto
      ...
    }));
  ```
- **Impacto:** Exposición de PII (Nombre y Email). Datos sensibles del habeas data disponibles públicamente.

---

### Hallazgo 6 — Sin límite de tarifa (Rate Limiting)

- **Severidad:** MEDIA
- **Archivo/línea:** Falta en `src/server.js`
- **Descripción:** No existe middleware de rate limiting. La API es susceptible a ataques de fuerza bruta y denegación de servicio (DoS).
- **Evidencia:** No hay `express-rate-limit` o similar en las dependencias, ni middleware implementado.
- **Impacto:** 
  - Ataque de fuerza bruta para adivinar códigos de estudiantes
  - Ataques DoS que pueden derribar el servicio
  - Abuso de recursos del servidor

---

### Hallazgo 7 — Almacenamiento en memoria no persistente

- **Severidad:** MEDIA
- **Archivo/línea:** `src/models/data.js`, línea 1-28
- **Descripción:** La base de datos está completamente en memoria. Todos los datos se pierden al reiniciar el servidor.
- **Evidencia:**
  ```javascript
  const database = {
    estudiantes: [...],
    asistencias: [...]
  };
  ```
- **Impacto:** 
  - Pérdida total de datos en reinicios
  - No apto para producción
  - No hay persistencia garantizada

---

### Hallazgo 8 — Ausencia de archivo `.env.ejemplo`

- **Severidad:** BAJA
- **Archivo/línea:** Falta en raíz del proyecto
- **Descripción:** No hay plantilla de variables de entorno. Los nuevos desarrolladores no saben qué variables deben configurar.
- **Evidencia:** El proyecto usa `process.env.PORT` pero no hay `.env.ejemplo` o documentación de qué variables son necesarias.
- **Impacto:** Fricción en la incorporación de nuevos desarrolladores, posibles errores de configuración.

---

### Hallazgo 9 — Exposición de detalles de validación en respuestas de error

- **Severidad:** BAJA
- **Archivo/línea:** `src/middleware/errorHandler.js`, línea 9-18
- **Descripción:** Los errores de validación devuelven información detallada sobre la estructura esperada, lo que puede ayudar a atacantes a entender cómo validar/bypassear restricciones.
- **Evidencia:**
  ```javascript
  if (err.details) {
    const errors = err.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message  // ← Revela estructura de datos
    }));
    return res.status(400).json({
      success: false,
      message: ERROR_MESSAGES.VALIDATION_ERROR,
      errors
    });
  }
  ```
- **Impacto:** Información reconocimiento util para ingeniería inversa de la API y entendimiento de esquemas de datos.

---

### Hallazgo 10 — Falta de validación de entrada en parámetros de ruta

- **Severidad:** BAJA
- **Archivo/línea:** `src/controllers/estudiantesController.js`, línea 65-82 (función `obtenerEstudiante`)
- **Descripción:** El parámetro `id` en la ruta `GET /api/estudiantes/:id` no es validado contra el patrón esperado antes de consultarlo.
- **Evidencia:**
  ```javascript
  function obtenerEstudiante(req, res, next) {
    try {
      const { id } = req.params;  // ← Sin validar patrón EST\d{5}
      const estudiante = getEstudianteById(id);
      if (!estudiante) {
        return next(...);
      }
      // ...
    }
  }
  ```
- **Impacto:** Aunque los datos no están en BD real, permite consultas arbitrarias sin validar el formato esperado. En una BD real, esto podría ser una puerta a inyección.

---

## Evaluación de Dependencias (Aspecto Positivo)

- **Estado:** CORRECTO
- **Comando ejecutado:** `npm audit`
- **Resultado:** `found 0 vulnerabilities`

### Análisis de Paquetes:

| Paquete | Versión | Necesario | Uso |
|---------|---------|-----------|-----|
| **express** | ^4.18.2 | SÍ | Framework HTTP principal - ESENCIAL |
| **cors** | ^2.8.5 | SÍ | Habilitación de CORS - NECESARIO (aunque mal configurado sin restricción de dominios) |
| **joi** | ^17.11.0 | SÍ | Validación de datos de entrada - ESENCIAL |
| **serverless-http** | ^4.0.0 | CONDICIONAL | Wrapper para Vercel serverless - Solo si despliegas en Vercel |
| **nodemon** (dev) | ^3.0.2 | SÍ | Reinicio automático en desarrollo - BUENA PRÁCTICA |

**Conclusión:** 
- **3 de 4 dependencias de producción son esenciales y bien elegidas**
- **Sin vulnerabilidades de seguridad**
- `serverless-http` es redundante si solo usas Node.js directo (sin Vercel)
- **Versiones relativamente actuales** (aunque podrían actualizarse a versiones más recientes: express 4.21.x, joi 17.13.x)

---

## Tabla Resumen por Aspecto

| # | Aspecto | Estado | Severidad | Hallazgo |
|---|---------|--------|-----------|----------|
| 1 | Validación de entrada | CORRECTO | - | Valida códigos, fechas y estados con Joi |
| 2 | Manejo de errores | CORRECTO | - | Try/catch en todas las rutas, códigos HTTP apropiados (400, 404, 409, 500) |
| 3 | Inyección y seguridad | CRÍTICA | CRÍTICA | CORS abierto, sin autenticación, sin rate limiting |
| 4 | Datos sensibles | CRÍTICA | CRÍTICA | Expone PII (nombre, email) sin autenticación ni autorización |
| 5 | Estructura y mantenibilidad | CORRECTO | - | Bien separado (rutas, controladores, modelos), nombres descriptivos |
| 6 | Dependencias | CORRECTO | - | Paquetes necesarios, 0 vulnerabilidades, bien elegidos |
| 7 | Configuración | BAJA | BAJA | Usa env.PORT pero falta `.env.ejemplo` |
| 8 | Idempotencia y duplicados | CORRECTO | - | Previene duplicados de asistencia (misma fecha) |
| 9 | Pruebas | CRÍTICA | CRÍTICA | 0 pruebas automatizadas |
| 10 | Documentación | CORRECTO | - | README y ejemplos completos, bien documentado |

---

## Resumen de Hallazgos

**Total de hallazgos críticos:** 10  
**Críticos:** 3 (Falta autenticación, Exposición de PII, Sin pruebas)  
**Medios:** 3 (CORS abierto, Rate limiting, Persistencia)  
**Bajos:** 4 (Detalles de error, Parámetros sin validar, `.env.ejemplo`, PII en reportes)  

**Aspectos positivos:** 4 (Validación, Errores, Estructura, Dependencias, Documentación)
