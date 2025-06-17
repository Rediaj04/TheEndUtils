const config = require('../../config');
const styles = require('../../utils/styles');

module.exports = {
    name: 'ayuda',
    description: 'Muestra los comandos útiles del test',
    async execute(message, args, client) {
        const { emojis } = styles;
        const user = message.mentions.users.first() || message.author;
        
        const ayudaMessage = `${emojis.title} **COMANDOS ÚTILES DE THE END** ${emojis.title}

${emojis.separator}

${emojis.help} **Comandos de Testing** ${emojis.help}
*Requieren rol de testing o ser administrador*

${emojis.form} \`${config.prefix}plantillas\` 
└ Muestra el formulario de solicitud para el clan

${emojis.rules} \`${config.prefix}reglas\` 
└ Muestra las reglas del test de ingreso

${emojis.test} \`${config.prefix}test @usuario\` 
└ Muestra el mensaje de finalización del test

${emojis.success} \`${config.prefix}pass @usuario\` 
└ Notifica que el jugador ha aprobado

${emojis.error} \`${config.prefix}nopass @usuario\` 
└ Notifica que el jugador no ha aprobado

${emojis.time} \`${config.prefix}afk @usuario\` 
└ Marca a un usuario como AFK y notifica al staff después de 10 minutos

${emojis.separator}

${emojis.help} **Comandos Globales** ${emojis.help}
*Disponibles para todos los usuarios*

${emojis.fun} \`${config.prefix}kunno @usuario\` 
└ Kunnoniza la imagen de perfil de un usuario

${emojis.separator}

${emojis.admin} **Comandos de Administración** ${emojis.admin}
*Solo para administradores*

${emojis.roles} \`${config.prefix}roles\` 
└ Muestra los roles permitidos para testing

${emojis.roles} \`${config.prefix}roles add @rol\` 
└ Agrega un rol a la lista de roles permitidos

${emojis.roles} \`${config.prefix}roles remove @rol\` 
└ Remueve un rol de la lista de roles permitidos

${emojis.separator}

${emojis.info} **Información Adicional** ${emojis.info}
• Usa \`${config.prefix}ayuda\` para ver esta lista
• Los mensajes originales se eliminan automáticamente
• El comando AFK notificará al staff después de 10 minutos

${emojis.separator}

💖 *The End Utils - Tu asistente perfecto* 💖`;

        await message.channel.send(`${ayudaMessage}\n\n||${user}||`);
        await message.delete();
    },
}; 