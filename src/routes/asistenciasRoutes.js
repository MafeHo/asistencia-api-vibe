/**
 * Rutas de Asistencias
 */

const express = require('express');
const router = express.Router();
const {
  registrarAsistencia,
  obtenerAsistenciasEstudiante
} = require('../controllers/asistenciasController');

/**
 * POST /api/asistencias
 * Registra una nueva asistencia
 */
router.post('/', registrarAsistencia);

/**
 * GET /api/asistencias/estudiante/:id
 * Lista asistencias de un estudiante específico
 */
router.get('/estudiante/:id', obtenerAsistenciasEstudiante);

module.exports = router;
