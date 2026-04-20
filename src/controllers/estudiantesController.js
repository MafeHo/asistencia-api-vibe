/**
 * Controlador de Estudiantes
 * Maneja la lógica de negocio para estudiantes
 */

const { validateEstudiante } = require('../middleware/validators');
const { getAllEstudiantes, getEstudianteById, addEstudiante } = require('../models/data');
const { createError } = require('../middleware/errorHandler');
const { ERROR_CODES, ERROR_MESSAGES } = require('../utils/constants');

/**
 * POST /api/estudiantes
 * Crea un nuevo estudiante
 */
function crearEstudiante(req, res, next) {
  try {
    const { error, value } = validateEstudiante(req.body);

    if (error) {
      return next({ details: error.details });
    }

    // Verificar que el código de estudiante sea único
    const estudianteExistente = getEstudianteById(value.id);
    if (estudianteExistente) {
      return next(
        createError(409, ERROR_CODES.STUDENT_EXISTS, ERROR_MESSAGES.STUDENT_EXISTS)
      );
    }

    // Crear el nuevo estudiante
    const nuevoEstudiante = {
      id: value.id,
      nombre: value.nombre,
      email: value.email,
      createdAt: new Date()
    };

    addEstudiante(nuevoEstudiante);

    res.status(201).json({
      success: true,
      message: 'Estudiante creado exitosamente',
      data: nuevoEstudiante
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/estudiantes
 * Lista todos los estudiantes
 */
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

/**
 * GET /api/estudiantes/:id
 * Obtiene un estudiante por ID
 */
function obtenerEstudiante(req, res, next) {
  try {
    const { id } = req.params;
    const estudiante = getEstudianteById(id);

    if (!estudiante) {
      return next(
        createError(404, ERROR_CODES.STUDENT_NOT_FOUND, ERROR_MESSAGES.STUDENT_NOT_FOUND)
      );
    }

    res.status(200).json({
      success: true,
      message: 'Estudiante obtenido exitosamente',
      data: estudiante
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  crearEstudiante,
  listarEstudiantes,
  obtenerEstudiante
};
