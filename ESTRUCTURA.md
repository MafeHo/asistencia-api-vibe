# ESTRUCTURA DEL PROYECTO

```
asistencia-api-vibe/
│
├── 📄 package.json                    # Configuración del proyecto y dependencias
├── 📄 package-lock.json               # Versiones exactas de dependencias
├── 📄 README.md                       # Documentación completa
├── 📄 INICIO_RAPIDO.md                # Guía rápida de inicio
├── 📄 ejemplos.json                   # Ejemplos de peticiones HTTP
├── 📄 ESTRUCTURA.md                   # Este archivo
├── .gitignore                         # Archivos a ignorar en Git
│
└── 📁 src/                            # Código fuente de la aplicación
    │
    ├── 📄 server.js                   # Punto de entrada principal
    │                                  # - Inicializa Express
    │                                  # - Monta todas las rutas
    │                                  # - Inicia el servidor en puerto 3000
    │
    ├── 📁 routes/                     # Definición de endpoints
    │   ├── estudiantesRoutes.js       # GET, POST /api/estudiantes
    │   ├── asistenciasRoutes.js       # GET, POST /api/asistencias
    │   └── reportesRoutes.js          # GET /api/reportes
    │
    ├── 📁 controllers/                # Lógica de negocio
    │   ├── estudiantesController.js   # - crearEstudiante()
    │   │                              # - listarEstudiantes()
    │   │                              # - obtenerEstudiante()
    │   │
    │   ├── asistenciasController.js   # - registrarAsistencia()
    │   │                              # - obtenerAsistenciasEstudiante()
    │   │
    │   └── reportesController.js      # - obtenerReporteAusentismo()
    │                                  #   (Top 5 estudiantes)
    │
    ├── 📁 models/                     # Modelos y almacenamiento de datos
    │   └── data.js                    # Base de datos en memoria
    │                                  # - Almacena estudiantes
    │                                  # - Almacena asistencias
    │                                  # - Funciones para acceder/modificar datos
    │
    ├── 📁 middleware/                 # Funciones intermedias
    │   ├── validators.js              # Validaciones con Joi
    │   │                              # - validateEstudiante()
    │   │                              # - validateAsistencia()
    │   │
    │   └── errorHandler.js            # Manejo centralizado de errores
    │                                  # - errorHandler()
    │                                  # - createError()
    │
    └── 📁 utils/                      # Utilidades generales
        └── constants.js               # Constantes de la aplicación
                                       # - STUDENT_CODE_REGEX
                                       # - ATTENDANCE_STATES
                                       # - ERROR_CODES
                                       # - ERROR_MESSAGES
```

---

## 🔄 FLUJO DE UNA PETICIÓN

```
Cliente (Postman, cURL, navegador)
    │
    ↓
Express Server (server.js)
    │
    ↓
Router (routes/*.js)
    │ Mapea la ruta a una acción
    │
    ↓
Controller (controllers/*.js)
    │ Recibe los datos de la petición
    │
    ↓
Validators (middleware/validators.js)
    │ Valida los datos de entrada
    │
    ↓
Data Layer (models/data.js)
    │ Accede a los datos en memoria
    │
    ↓
Error Handler (middleware/errorHandler.js)
    │ Procesa cualquier error
    │
    ↓
Response (JSON)
    │ Retorna el resultado al cliente
```

---

## 📊 MODELO DE DATOS

### Estudiante
```json
{
  "id": "EST00001",           // Único, formato EST + 5 dígitos
  "nombre": "Juan García",
  "email": "juan@example.com",
  "createdAt": "2024-01-15T08:00:00.000Z"
}
```

### Asistencia
```json
{
  "id": 1,                      // Auto-incremento
  "id_estudiante": "EST00001",  // Referencia a estudiante
  "fecha": "2024-04-20",        // YYYY-MM-DD
  "estado": "presente",         // presente | ausente | justificada
  "createdAt": "2024-04-20T08:00:00.000Z"
}
```

---

## 🎯 ENDPOINTS IMPLEMENTADOS

```
POST   /api/estudiantes                    → Crear estudiante (201)
GET    /api/estudiantes                    → Listar estudiantes (200)
GET    /api/estudiantes/:id                → Obtener estudiante (200/404)

POST   /api/asistencias                    → Registrar asistencia (201/409)
GET    /api/asistencias/estudiante/:id     → Listar asistencias (200/404)

GET    /api/reportes/ausentismo            → Top 5 ausentismo (200)

GET    /health                             → Health check (200)
GET    /api                                → Documentación (200)
```

---

## 🛡️ VALIDACIONES IMPLEMENTADAS

| Campo | Validación | Formato |
|-------|-----------|---------|
| id (estudiante) | Regex: EST + 5 dígitos | EST00001 |
| nombre | 2-100 caracteres | string |
| email | Validación de email | user@domain.com |
| id_estudiante | Debe existir | EST##### |
| fecha | ISO 8601, no futura | YYYY-MM-DD |
| estado | Enum | presente, ausente, justificada |

---

## 📦 DEPENDENCIAS

```
express@^4.18.2     → Framework web
joi@^17.11.0        → Validaciones
cors@^2.8.5         → Control CORS
nodemon@^3.0.2      → Desarrollo (recarga automática)
```

---

## 📋 LISTA DE VERIFICACIÓN

- ✅ Crear estudiante (POST)
- ✅ Listar estudiantes (GET)
- ✅ Obtener estudiante por ID (GET)
- ✅ Registrar asistencia (POST)
- ✅ Listar asistencias de estudiante (GET)
- ✅ Top 5 ausentismo (GET)
- ✅ Validaciones con Regex
- ✅ Códigos HTTP correctos
- ✅ Estructura modular
- ✅ Manejo de errores
- ✅ Documentación JSON
- ✅ README completo

---

¡Proyecto completo y funcional! 🚀
