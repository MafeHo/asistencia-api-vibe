/**
 * Rutas de Estudiantes
 */

const express = require('express');
const router = express.Router();
const {
  crearEstudiante,
  listarEstudiantes,
  obtenerEstudiante
} = require('../controllers/estudiantesController');

/**
 * POST /api/estudiantes
 * Crea un nuevo estudiante
 */
router.post('/', crearEstudiante);

/**
 * GET /api/estudiantes
 * Lista todos los estudiantes
 */
router.get('/', listarEstudiantes);

/**
 * GET /api/estudiantes/:id
 * Obtiene un estudiante por ID
 */
router.get('/:id', obtenerEstudiante);

module.exports = router;
