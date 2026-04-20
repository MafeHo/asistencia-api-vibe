/**
 * Middleware de validación
 * Utiliza Joi para validar datos de entrada
 */

const Joi = require('joi');
const { STUDENT_CODE_REGEX, ATTENDANCE_STATES, ERROR_MESSAGES } = require('../utils/constants');

/**
 * Valida los datos de un nuevo estudiante
 */
function validateEstudiante(data) {
  const schema = Joi.object({
    id: Joi.string()
      .pattern(STUDENT_CODE_REGEX)
      .required()
      .messages({
        'string.pattern.base': ERROR_MESSAGES.INVALID_STUDENT_CODE,
        'any.required': 'El código del estudiante es requerido'
      }),
    nombre: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder 100 caracteres',
        'any.required': 'El nombre es requerido'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'El email no es válido',
        'any.required': 'El email es requerido'
      })
  });

  return schema.validate(data, { abortEarly: false });
}

/**
 * Valida los datos de una nueva asistencia
 */
function validateAsistencia(data) {
  const schema = Joi.object({
    id_estudiante: Joi.string()
      .pattern(STUDENT_CODE_REGEX)
      .required()
      .messages({
        'string.pattern.base': ERROR_MESSAGES.INVALID_STUDENT_CODE,
        'any.required': 'El ID del estudiante es requerido'
      }),
    fecha: Joi.date()
      .iso()
      .required()
      .max('now')
      .messages({
        'date.base': ERROR_MESSAGES.INVALID_DATE,
        'date.max': ERROR_MESSAGES.FUTURE_DATE,
        'any.required': 'La fecha es requerida'
      }),
    estado: Joi.string()
      .valid(...Object.values(ATTENDANCE_STATES))
      .required()
      .messages({
        'any.only': ERROR_MESSAGES.INVALID_ATTENDANCE_STATE,
        'any.required': 'El estado es requerido'
      })
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports = {
  validateEstudiante,
  validateAsistencia
};
