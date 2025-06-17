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

        const testMessage = styles.formatMessage(
            '🧪 Usuario en Pruebas',
            `El usuario está actualmente en período de pruebas.\nPor favor, mantén un comportamiento adecuado y sigue las reglas del servidor.`,
            'info'
        );

        message.channel.send({ content: `${testMessage}\n${user}` });
        message.delete().catch(console.error);
    },
}; 