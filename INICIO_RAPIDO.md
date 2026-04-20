# 🚀 INICIO RÁPIDO - API Asistencia

## Pasos para ejecutar la API

### 1. Instalar dependencias (ya realizado)
```bash
npm install
```

### 2. Iniciar el servidor

**Modo producción** (ejecución normal):
```bash
npm start
```

**Modo desarrollo** (con recarga automática):
```bash
npm run dev
```

### 3. Verificar que está funcionando

Abre tu navegador y accede a:
```
http://localhost:3000/health
```

Deberías ver:
```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2024-04-20T14:30:00.000Z"
}
```

---

## Documentación de la API

Accede a la documentación de endpoints:
```
http://localhost:3000/api
```

---

## Pruebas rápidas con ejemplos

### Crear un estudiante
```bash
curl -X POST http://localhost:3000/api/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "id": "EST00005",
    "nombre": "Laura Martínez",
    "email": "laura@example.com"
  }'
```

### Registrar asistencia
```bash
curl -X POST http://localhost:3000/api/asistencias \
  -H "Content-Type: application/json" \
  -d '{
    "id_estudiante": "EST00001",
    "fecha": "2024-04-20",
    "estado": "presente"
  }'
```

### Ver Top 5 ausentismo
```bash
curl http://localhost:3000/api/reportes/ausentismo
```

---

## 📁 Archivos principales

| Archivo | Descripción |
|---------|------------|
| `src/server.js` | Punto de entrada de la API |
| `src/routes/` | Definición de rutas (GET, POST) |
| `src/controllers/` | Lógica de negocio |
| `src/models/data.js` | Almacenamiento en memoria |
| `src/middleware/validators.js` | Validaciones con Joi |
| `src/utils/constants.js` | Constantes y patrones |
| `ejemplos.json` | Ejemplos completos de peticiones |
| `README.md` | Documentación completa |

---

## 📚 Documentación

Ver los siguientes archivos para más información:
- **README.md**: Documentación completa de la API
- **ejemplos.json**: Ejemplos de todas las peticiones y respuestas

---

## 💡 Reglas de Negocio Principales

✅ **Código de Estudiante**: EST + 5 dígitos (EST00001, EST00123, etc.)  
✅ **Estados Permitidos**: presente, ausente, justificada  
✅ **Formato de Fecha**: YYYY-MM-DD (no permite fechas futuras)  
✅ **No hay duplicados**: No se puede registrar 2 asistencias para el mismo estudiante en el mismo día  

---

## 🆘 Troubleshooting

**Error: "node: command not found"**
→ Instala Node.js desde https://nodejs.org/

**Error: "puerto 3000 ya en uso"**
→ Cambia el puerto en src/server.js o cierra la aplicación que está usando el puerto

**Error de validación en peticiones**
→ Verifica los ejemplos en ejemplos.json o README.md

---

¡Listo! Tu API está lista para usar. 🎉
