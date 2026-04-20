const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { errorHandler } = require('../src/middleware/errorHandler');

// Importar rutas
const estudiantesRoutes = require('../src/routes/estudiantesRoutes');
const asistenciasRoutes = require('../src/routes/asistenciasRoutes');
const reportesRoutes = require('../src/routes/reportesRoutes');

// Crear la aplicación Express
const app = express();

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

// Middleware de manejo de errores
app.use(errorHandler);

// Exportar como función serverless
module.exports = serverless(app);