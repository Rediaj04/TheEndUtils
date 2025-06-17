const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'test',
    description: 'Notifica que un usuario está en pruebas',
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
            const errorMsg = await message.reply(`Por favor, menciona al usuario que está en pruebas.\nEjemplo: \`${config.prefix}test @usuario\``);
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
            return;
        }

        const testMessage = `${styles.emojis.separator}
⚔️ **¡Gracias por intentar entrar al clan!**  

🕒 Tu test de PvP está por finalizar, y en breve recibirás tu resultado.  

🎥 Mientras esperas, puedes seguirme en TikTok:  

👉 https://www.tiktok.com/@jaid3r04
${styles.emojis.separator}`;

        await message.channel.send({ content: `${testMessage}\n\n||${user}||` });
        await message.delete().catch(console.error);
    },
}; 