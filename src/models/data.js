/**
 * Almacenamiento en memoria para la aplicación
 * En un proyecto real, esto sería reemplazado por una base de datos
 */

// Base de datos en memoria
const database = {
  estudiantes: [
    {
      id: 'EST00001',
      nombre: 'Juan García',
      email: 'juan.garcia@example.com',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'EST00002',
      nombre: 'María López',
      email: 'maria.lopez@example.com',
      createdAt: new Date('2024-01-20')
    }
  ],
  asistencias: [
    {
      id: 1,
      id_estudiante: 'EST00001',
      fecha: '2024-04-10',
      estado: 'presente',
      createdAt: new Date('2024-04-10')
    },
    {
      id: 2,
      id_estudiante: 'EST00001',
      fecha: '2024-04-11',
      estado: 'ausente',
      createdAt: new Date('2024-04-11')
    },
    {
      id: 3,
      id_estudiante: 'EST00002',
      fecha: '2024-04-10',
      estado: 'presente',
      createdAt: new Date('2024-04-10')
    }
  ]
};

// Contador para IDs de asistencia
let asistenciaIdCounter = 4;

/**
 * Obtiene todos los estudiantes
 */
function getAllEstudiantes() {
  return database.estudiantes;
}

/**
 * Obtiene un estudiante por ID
 */
function getEstudianteById(id) {
  return database.estudiantes.find(e => e.id === id);
}

/**
 * Añade un nuevo estudiante
 */
function addEstudiante(estudiante) {
  database.estudiantes.push(estudiante);
  return estudiante;
}

/**
 * Obtiene todas las asistencias
 */
function getAllAsistencias() {
  return database.asistencias;
}

/**
 * Obtiene asistencias de un estudiante
 */
function getAsistenciasByEstudianteId(id_estudiante) {
  return database.asistencias.filter(a => a.id_estudiante === id_estudiante);
}

/**
 * Busca una asistencia duplicada (mismo estudiante, misma fecha)
 */
function findDuplicateAsistencia(id_estudiante, fecha) {
  return database.asistencias.find(
    a => a.id_estudiante === id_estudiante && a.fecha === fecha
  );
}

/**
 * Añade una nueva asistencia
 */
function addAsistencia(asistencia) {
  asistencia.id = asistenciaIdCounter++;
  database.asistencias.push(asistencia);
  return asistencia;
}

module.exports = {
  database,
  getAllEstudiantes,
  getEstudianteById,
  addEstudiante,
  getAllAsistencias,
  getAsistenciasByEstudianteId,
  findDuplicateAsistencia,
  addAsistencia
};
