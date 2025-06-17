const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'afk',
    description: 'Marca a un usuario como AFK',
    async execute(message, args, client) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            return message.reply('No tienes permisos para usar este comando.');
        }

        const { emojis } = styles;
        
        // Verificar si se mencionó a un usuario
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply(`Por favor, menciona a un usuario. Ejemplo: ${config.prefix}afk @usuario`);
        }

        // Crear el mensaje AFK
        const afkMessage = `${emojis.separator}
👋 Hey **Bro**, este ticket será cerrado en breve ya que se ha superado el tiempo máximo de espera sin respuesta.

📌 Si la duda o problema del usuario mencionado sigue sin resolverse, podrás abrir un nuevo ticket cuando estés disponible.

⏱️ **Tiempo estimado:** 10 minutos  
💤 **Estado:** Ausente  

🔒 **TheEnd Community**
${emojis.separator}`;

        // Enviar el mensaje mencionando al usuario al final
        await message.channel.send(`${afkMessage}\n${user}`);

        // Eliminar el mensaje original
        await message.delete();
    },
}; 