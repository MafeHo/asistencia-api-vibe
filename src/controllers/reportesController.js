/**
 * Controlador de Reportes
 * Genera reportes y estadísticas de asistencia
 */

const { getAllEstudiantes, getAllAsistencias } = require('../models/data');
const { ATTENDANCE_STATES } = require('../utils/constants');

/**
 * GET /api/reportes/ausentismo
 * Retorna el Top 5 de estudiantes con más ausencias
 * 
 * Lógica:
 * 1. Contar las ausencias (ausente + justificada) por estudiante
 * 2. Ordenar de mayor a menor
 * 3. Retornar los top 5
 */
function obtenerReporteAusentismo(req, res, next) {
  try {
    const estudiantes = getAllEstudiantes();
    const asistencias = getAllAsistencias();

    // Crear un mapa de ausencias por estudiante
    const ausenciasMap = {};

    estudiantes.forEach(estudiante => {
      ausenciasMap[estudiante.id] = {
        id: estudiante.id,
        nombre: estudiante.nombre,
        email: estudiante.email,
        totalAsistencias: 0,
        ausencias: 0,
        justificadas: 0,
        presentes: 0,
        porcentajeAusencia: 0
      };
    });

    // Contar asistencias por estudiante
    asistencias.forEach(asistencia => {
      if (ausenciasMap[asistencia.id_estudiante]) {
        ausenciasMap[asistencia.id_estudiante].totalAsistencias++;

        if (asistencia.estado === ATTENDANCE_STATES.ABSENT) {
          ausenciasMap[asistencia.id_estudiante].ausencias++;
        } else if (asistencia.estado === ATTENDANCE_STATES.JUSTIFIED) {
          ausenciasMap[asistencia.id_estudiante].justificadas++;
        } else if (asistencia.estado === ATTENDANCE_STATES.PRESENT) {
          ausenciasMap[asistencia.id_estudiante].presentes++;
        }
      }
    });

    // Calcular porcentaje de ausencia (ausencias + justificadas)
    const estudiantes_con_ausencias = Object.values(ausenciasMap).map(est => ({
      ...est,
      totalFaltas: est.ausencias + est.justificadas,
      porcentajeAusencia: est.totalAsistencias > 0
        ? Math.round(((est.ausencias + est.justificadas) / est.totalAsistencias) * 100)
        : 0
    }));

    // Ordenar por faltas total (descendente) y luego por porcentaje
    const top5 = estudiantes_con_ausencias
      .sort((a, b) => {
        if (b.totalFaltas !== a.totalFaltas) {
          return b.totalFaltas - a.totalFaltas;
        }
        return b.porcentajeAusencia - a.porcentajeAusencia;
      })
      .slice(0, 5)
      .map((est, index) => ({
        ranking: index + 1,
        id: est.id,
        nombre: est.nombre,
        email: est.email,
        totalAsistencias: est.totalAsistencias,
        presentes: est.presentes,
        ausencias: est.ausencias,
        justificadas: est.justificadas,
        totalFaltas: est.totalFaltas,
        porcentajeAusencia: est.porcentajeAusencia
      }));

    res.status(200).json({
      success: true,
      message: 'Reporte de ausentismo obtenido exitosamente',
      data: top5,
      total: top5.length
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  obtenerReporteAusentismo
};
