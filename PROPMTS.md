# 1 Actúa como un Senior QA Automation Engineer y Desarrollador Backend experto en Node.js, Jest y Supertest.

Tengo una API REST construida con Express para gestionar la asistencia estudiantil. Mi objetivo actual NO es refactorizar la API, sino crear una suite de pruebas automatizadas rigurosa que ponga a prueba mi código actual para descubrir posibles bugs y vulnerabilidades.

Tu tarea:
Escribir el código completo para un archivo de pruebas (por ejemplo, tests/api.test.js) utilizando Jest y Supertest.

Reglas de Negocio de la API (Para que sepas qué afirmar en los expect):

El código del estudiante debe ser único y tener el formato EST seguido de 5 dígitos (ej. EST00123).

El estado de asistencia solo puede ser: presente, ausente o justificada.

Una asistencia no puede duplicarse para el mismo estudiante en la misma fecha.

Las fechas de asistencia deben ser válidas y NO pueden ser fechas futuras.

Casos de Prueba Requeridos:
Debes escribir al menos 15 casos de prueba (bloques test o it), organizados lógicamente en bloques describe. Si consideras que se necesitan más pruebas para lograr una cobertura profesional, eres libre y estás animado a agregar más casos. Como mínimo, debes cubrir estrictamente lo siguiente:

Creación exitosa de estudiante (caso feliz).

Rechazo de estudiante con código inválido.

Rechazo de estudiante duplicado.

Listado vacío y listado con datos.

Registro de asistencia válida.

Rechazo de asistencia con estado no permitido.

Rechazo de asistencia con fecha futura.

Rechazo de asistencia duplicada (mismo estudiante, misma fecha).

Consulta de estudiante inexistente (Error 404).

Reporte de ausentismo con 0 estudiantes.

Reporte de ausentismo con 1 estudiante.

Reporte de ausentismo con varios estudiantes (validar el Top 5).

Manejo de payload malformado (JSON inválido en el body).

Manejo de campos faltantes en el POST de estudiantes.

Manejo de campos faltantes en el POST de asistencias.

Ejemplo mínimo de estilo esperado:

JavaScript
const request = require('supertest');
const app = require('../src/app'); // Asume que la app se exporta correctamente

describe('POST /api/estudiantes', () => {
  test('rechaza codigo con formato invalido', async () => {
    const res = await request(app)
      .post('/api/estudiantes')
      .send({ codigo: 'abc', nombre: 'Juan' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error'); // O el formato de error que uses
  });
});
RESTRICCIÓN CRÍTICA:
Genera ÚNICAMENTE el código de las pruebas con Jest/Supertest. Bajo ninguna circunstancia reescribas, corrijas o me ofrezcas el código de la API en sí. Necesito que estas pruebas fallen si mi API actual tiene bugs, para yo poder hacer mi reporte de auditoría. Asegúrate de incluir los hooks beforeEach o beforeAll necesarios para limpiar la base de datos en memoria antes de cada prueba y evitar que unas pruebas interfieran con otras, adicionalmente, maneja correctamente el número exacto del problema, ejemplo, el 409, el 200, etc...



# 2. fase 2
Vamos a realizar una auditoría técnica del proyecto, enfocándonos exclusivamente en el análisis estático del código existente.

Importante:

No se debe modificar código.
No se deben ejecutar pruebas manuales ni automatizadas.
No se deben implementar mejoras aún.
Solo se analizará lo que ya existe en el repositorio.

Esta actividad corresponde a la Fase 2: Auditoría crítica del código generado.

Objetivo

Analizar el código fuente del proyecto y documentar hallazgos técnicos en un archivo llamado:

AUDITORIA.md

Cada hallazgo debe estar sustentado con evidencia directa del código.

Fase 2 — Auditoría crítica del código generado (20 minutos)

Para cada punto de la siguiente lista de verificación:

Revisar el código
Identificar problemas o riesgos
Registrar hallazgos documentados

Lista de verificación de auditoría
#AspectoPreguntas guía1Validación de entrada¿Se valida el formato del código del estudiante? ¿Se rechazan fechas futuras? ¿Se valida correctamente la enumeración del estado?2Manejo de errores¿Las rutas usan try/catch? ¿Se retornan códigos HTTP adecuados (400, 404, 409, 500)?3Inyección y seguridadSi existe base de datos: ¿las consultas están parametrizadas? ¿Se escapan entradas? ¿Hay rate limiting? ¿CORS está configurado?4Datos sensibles¿Se expone información de estudiantes sin autenticación? ¿Se consideran prácticas relacionadas con habeas data?5Estructura y mantenibilidad¿Existe separación entre rutas, controladores y lógica de negocio? ¿O todo está centralizado en index.js? ¿Los nombres son descriptivos?6Dependencias¿Qué paquetes fueron añadidos? ¿Son necesarios? ¿Presentan vulnerabilidades? Ejecutar auditoría npm (npm audit).7Configuración¿Hay puertos o credenciales hardcodeadas? ¿Se usan variables de entorno? ¿Existe .env.example?8Idempotencia y duplicados¿El sistema permite registrar asistencias duplicadas para el mismo estudiante y fecha?9Pruebas¿Existen pruebas automatizadas? ¿Cuál es su cobertura? ¿O no hay pruebas?10Documentación¿El README explica cómo ejecutar el proyecto? ¿Los comentarios aportan valor real?

Formato obligatorio del archivo AUDITORIA.md
Cada hallazgo debe documentarse usando la siguiente estructura:
## Hallazgo X — [Título del hallazgo]- **Severidad:** baja | media | alta | crítica- **Archivo/Línea:** ruta/del/archivo.js, línea XX- **Descripción:** explicación clara del problema encontrado.- **Evidencia:** fragmento observado o comportamiento deducido del código.- **Impacto:** riesgo técnico o consecuencia en producción.- **Recomendación:** acción sugerida para mitigarlo.

Punto de control


SE eben documentarse mínimo 8 hallazgos, si ves más, agregalos por favor.


Cada hallazgo debe incluir referencia precisa al código.


# 3. fase 3
Actúa como un Desarrollador Backend Senior experto en Node.js y Express. 
Tu tarea es construir una API REST de gestión de asistencia estudiantil funcional para un entorno local.
1. Requisitos TécnicosLenguaje/Framework: Node.js con Express.Base de Datos: Usa un arreglo en memoria para los datos (para facilitar la ejecución local), pero estructura el código de forma modular (separa rutas de controladores).Validación: Implementa validaciones de entrada (puedes usar lógica nativa o bibliotecas como joi o express-validator).
2. Definición de EndpointsMétodoRutaDescripción POST/api/estudiantesCrea un estudiante.GET/api/estudiantesLista todos los estudiantes. GET/api/estudiantes/:idObtiene un estudiante por ID.POST/api/asistenciasRegistra asistencia (id_estudiante, fecha, estado).GET/api/asistencias/estudiante/:idLista asistencias de un estudiante específico.GET/api/reportes/ausentismoRetorna el Top 5 de estudiantes con más ausencias.
3. Reglas de Negocio Estrictas: Formato de Código: El id o código del estudiante debe ser único y seguir el patrón EST + 5 dígitos (Ej: EST00123). Usa Regex para validar esto. Estados Permitidos: Solo se aceptan los valores: presente, ausente o justificada. Restricción de Fecha: La fecha debe ser válida y no puede ser futura. Unicidad de Registro: No permitas registrar más de una asistencia para el mismo estudiante en la misma fecha.
4. Entregables Esperados.Ejemplos de los objetos JSON para las peticiones POST.Uso de códigos de estado HTTP correctos (201 Created, 400 Bad Request, 404 Not Found, etc.).Lógica clara para el cálculo del reporte de ausentismo (Top 5).

