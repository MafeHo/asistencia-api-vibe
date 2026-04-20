/**
 * Constantes de la aplicación
 */

// Patrón para validar código de estudiante: EST + 5 dígitos
const STUDENT_CODE_REGEX = /^EST\d{5}$/;

// Estados permitidos para asistencia
const ATTENDANCE_STATES = {
  PRESENT: 'presente',
  ABSENT: 'ausente',
  JUSTIFIED: 'justificada'
};

// Códigos de error
const ERROR_CODES = {
  INVALID_STUDENT_CODE: 'INVALID_STUDENT_CODE',
  STUDENT_NOT_FOUND: 'STUDENT_NOT_FOUND',
  STUDENT_EXISTS: 'STUDENT_EXISTS',
  INVALID_ATTENDANCE_STATE: 'INVALID_ATTENDANCE_STATE',
  DUPLICATE_ATTENDANCE: 'DUPLICATE_ATTENDANCE',
  FUTURE_DATE: 'FUTURE_DATE',
  INVALID_DATE: 'INVALID_DATE',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
};

// Mensajes de error
const ERROR_MESSAGES = {
  INVALID_STUDENT_CODE: 'El código del estudiante debe seguir el patrón EST + 5 dígitos (Ej: EST00123)',
  STUDENT_NOT_FOUND: 'Estudiante no encontrado',
  STUDENT_EXISTS: 'El código del estudiante ya existe',
  INVALID_ATTENDANCE_STATE: `Los estados permitidos son: ${Object.values(ATTENDANCE_STATES).join(', ')}`,
  DUPLICATE_ATTENDANCE: 'Ya existe un registro de asistencia para este estudiante en esta fecha',
  FUTURE_DATE: 'La fecha no puede ser futura',
  INVALID_DATE: 'La fecha proporcionada no es válida',
  VALIDATION_ERROR: 'Error de validación'
};

module.exports = {
  STUDENT_CODE_REGEX,
  ATTENDANCE_STATES,
  ERROR_CODES,
  ERROR_MESSAGES
};
