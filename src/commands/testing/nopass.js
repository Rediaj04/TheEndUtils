const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'nopass',
    description: 'Notifica que un usuario no ha aprobado las pruebas',
    async execute(message, args) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            const errorMsg = await message.reply('No tienes permisos para usar este comando.');
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
            return;
        }

        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(`Por favor, menciona al usuario que no aprobó las pruebas.\nEjemplo: \`${config.prefix}nopass @usuario\``);
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
            return;
        }

        const { emojis } = styles;
        
        const nopassMessage = `${emojis.separator}
⚠️ **Resultado: No Aprobado**

Lamentablemente, no has superado las pruebas esta vez.  
📄 Puedes revisar los detalles aquí:  

🔗 https://discord.com/channels/1227460757524975678/1294703498377560085

⚡ No te desanimes, ¡puedes volver a intentarlo en **1 semana**! ⚡
${emojis.separator}`;

        await message.channel.send({ content: `${nopassMessage}\n\n||${user}||` });
        await message.delete().catch(console.error);
    },
}; 