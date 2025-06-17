const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'test',
    description: 'Notifica que un usuario está en pruebas',
    execute(message, args) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            return message.reply('No tienes permisos para usar este comando.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply(`Por favor, menciona al usuario que está en pruebas.\nEjemplo: \`${config.prefix}test @usuario\``);
        }

        const testMessage = `${styles.emojis.separator}
⚔️ **¡Gracias por intentar entrar al clan!**  

🕒 Tu test de PvP está por finalizar, y en breve recibirás tu resultado.  

🎥 Mientras esperas, puedes seguirme en TikTok:  

👉 https://www.tiktok.com/@jaid3r04
${styles.emojis.separator}`;

        message.channel.send({ content: `${testMessage}\n\n||${user}||` });
        message.delete().catch(console.error);
    },
}; 