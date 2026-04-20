/**
 * Rutas de Reportes
 */

const express = require('express');
const router = express.Router();
const { obtenerReporteAusentismo } = require('../controllers/reportesController');

/**
 * GET /api/reportes/ausentismo
 * Retorna el Top 5 de estudiantes con más ausencias
 */
router.get('/ausentismo', obtenerReporteAusentismo);

module.exports = router;
