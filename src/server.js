/**
 * Archivo principal del servidor
 * Inicializa la aplicación Express y monta las rutas
 */

const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

// Importar rutas
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const asistenciasRoutes = require('./routes/asistenciasRoutes');
const reportesRoutes = require('./routes/reportesRoutes');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de salud
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date()
  });
});

// Rutas de la API
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/asistencias', asistenciasRoutes);
app.use('/api/reportes', reportesRoutes);

// Ruta para documentación simple
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API de Gestión de Asistencia Estudiantil',
    version: '1.0.0',
    endpoints: {
      estudiantes: {
        POST: '/api/estudiantes - Crear estudiante',
        GET: '/api/estudiantes - Listar estudiantes',
        GET_ID: '/api/estudiantes/:id - Obtener estudiante por ID'
      },
      asistencias: {
        POST: '/api/asistencias - Registrar asistencia',
        GET: '/api/asistencias/estudiante/:id - Listar asistencias de estudiante'
      },
      reportes: {
        GET: '/api/reportes/ausentismo - Top 5 estudiantes con más ausencias'
      }
    }
  });
});

// Tratamiento de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path
  });
});

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Iniciar el servidor solo si se ejecuta directamente (no en Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
    console.log(`📝 Documentación: http://localhost:${PORT}/api`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
