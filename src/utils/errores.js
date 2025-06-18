const TIEMPO_BORRADO_ERROR = 5000; // Tiempo en milisegundos para borrar mensajes de error

module.exports = {
    TIEMPO_BORRADO_ERROR,
    PERMISO_DENEGADO: '❌ No tienes permisos para ejecutar este comando.',
    SOLO_ADMIN: '❌ Solo los administradores pueden usar este comando.',
    SOLO_TESTING: '❌ Solo testers o administradores pueden usar este comando.',
    SOLO_AUTOR: '❌ Solo el autor del comando puede usar estos botones.',
    FALTA_ARGUMENTO: '❌ Faltan argumentos para ejecutar este comando.',
    FALTA_USUARIO: (ejemplo) => `❌ Por favor, menciona un usuario. Ejemplo: ${ejemplo}`,
    FALTA_ROL: (ejemplo) => `❌ Por favor, menciona un rol. Ejemplo: ${ejemplo}`,
    ACCION_INVALIDA: '❌ Acción no válida. Usa `add` o `remove`.',
    CANTIDAD_INVALIDA: (ejemplo) => `❌ Por favor, especifica una cantidad válida. Ejemplo: ${ejemplo}`,
    LIMITE_CANTIDAD: '❌ La cantidad debe estar entre 1 y 50 mensajes.',
    NO_BESARSE: '❌ No puedes besarte a ti mismo, ¡eso sería muy raro!',
    ERROR_BORRAR_MENSAJES: '❌ No se pudieron borrar los mensajes. Los mensajes deben tener menos de 14 días de antigüedad.',
    ERROR_PROCESAR_IMAGEN: '❌ Hubo un error al procesar la imagen.',
    ERROR_DESCONOCIDO: '❌ Hubo un error al ejecutar el comando.',
    USO_INCORRECTO: (ejemplo) => `❌ Uso incorrecto. Ejemplo: ${ejemplo}`,
    // Puedes agregar más mensajes aquí según los errores que uses en tus comandos
}; 