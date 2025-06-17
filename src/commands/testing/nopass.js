const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'nopass',
    description: 'Notifica que un usuario no ha aprobado las pruebas',
    execute(message, args) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            return message.reply('No tienes permisos para usar este comando.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply(`Por favor, menciona al usuario que no aprobó las pruebas.\nEjemplo: \`${config.prefix}nopass @usuario\``);
        }

        const { emojis } = styles;
        
        const nopassMessage = `${emojis.separator}
⚠️ **Resultado: No Aprobado**

Lamentablemente, no has superado las pruebas esta vez.  
📄 Puedes revisar los detalles aquí:  

🔗 https://discord.com/channels/1227460757524975678/1294703498377560085

⚡ No te desanimes, ¡puedes volver a intentarlo en **1 semana**! ⚡
${emojis.separator}`;

        message.channel.send({ content: `${nopassMessage}\n\n||${user}||` });
        message.delete().catch(console.error);
    },
}; 