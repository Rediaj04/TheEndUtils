const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');
const errores = require('../../utils/errores');

module.exports = {
    name: 'afk',
    description: 'Marca a un usuario como AFK',
    async execute(message, args, client) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            const errorMsg = await message.reply(errores.SOLO_TESTING);
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
            return;
        }

        const { emojis } = styles;
        
        // Verificar si se mencionó a un usuario
        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}afk @usuario`));
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            return;
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
        await message.channel.send(`${afkMessage}\n\n||${user}||`);
        await message.delete().catch(console.error);
    },
}; 