/**
 * Middleware de manejo de errores
 */

const { ERROR_MESSAGES } = require('../utils/constants');

/**
 * Manejo global de errores
 */
function errorHandler(err, req, res, next) {
  console.error(err);

  // Errores de validación de Joi
  if (err.details) {
    const errors = err.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return res.status(400).json({
      success: false,
      message: ERROR_MESSAGES.VALIDATION_ERROR,
      errors
    });
  }

  // Errores personalizados
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message
    });
  }

  // Error genérico
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
}

/**
 * Crea un error personalizado
 */
function createError(statusCode, code, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

module.exports = {
  errorHandler,
  createError
};
