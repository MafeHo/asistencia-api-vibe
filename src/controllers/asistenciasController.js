/**
 * Controlador de Asistencias
 * Maneja la lógica de negocio para registros de asistencia
 */

const { validateAsistencia } = require('../middleware/validators');
const {
  getAllAsistencias,
  getAsistenciasByEstudianteId,
  findDuplicateAsistencia,
  getEstudianteById,
  addAsistencia
} = require('../models/data');
const { createError } = require('../middleware/errorHandler');
const { ERROR_CODES, ERROR_MESSAGES } = require('../utils/constants');

/**
 * POST /api/asistencias
 * Registra una nueva asistencia
 */
function registrarAsistencia(req, res, next) {
  try {
    const { error, value } = validateAsistencia(req.body);

    if (error) {
      return next({ details: error.details });
    }

    // Verificar que el estudiante existe
    const estudiante = getEstudianteById(value.id_estudiante);
    if (!estudiante) {
      return next(
        createError(404, ERROR_CODES.STUDENT_NOT_FOUND, ERROR_MESSAGES.STUDENT_NOT_FOUND)
      );
    }

    // Convertir la fecha a formato YYYY-MM-DD
    const fecha = new Date(value.fecha).toISOString().split('T')[0];

    // Verificar que no exista un registro duplicado para esta fecha
    const duplicado = findDuplicateAsistencia(value.id_estudiante, fecha);
    if (duplicado) {
      return next(
        createError(409, ERROR_CODES.DUPLICATE_ATTENDANCE, ERROR_MESSAGES.DUPLICATE_ATTENDANCE)
      );
    }

    // Crear el nuevo registro de asistencia
    const nuevaAsistencia = {
      id_estudiante: value.id_estudiante,
      fecha: fecha,
      estado: value.estado,
      createdAt: new Date()
    };

    addAsistencia(nuevaAsistencia);

    res.status(201).json({
      success: true,
      message: 'Asistencia registrada exitosamente',
      data: nuevaAsistencia
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/asistencias/estudiante/:id
 * Lista asistencias de un estudiante específico
 */
function obtenerAsistenciasEstudiante(req, res, next) {
  try {
    const { id } = req.params;

    // Verificar que el estudiante existe
    const estudiante = getEstudianteById(id);
    if (!estudiante) {
      return next(
        createError(404, ERROR_CODES.STUDENT_NOT_FOUND, ERROR_MESSAGES.STUDENT_NOT_FOUND)
      );
    }

    const asistencias = getAsistenciasByEstudianteId(id);

    res.status(200).json({
      success: true,
      message: 'Asistencias obtenidas exitosamente',
      data: asistencias,
      total: asistencias.length,
      estudiante: {
        id: estudiante.id,
        nombre: estudiante.nombre
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registrarAsistencia,
  obtenerAsistenciasEstudiante
};
