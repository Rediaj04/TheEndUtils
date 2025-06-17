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

        const nopassMessage = styles.formatMessage(
            '❌ Pruebas No Aprobadas',
            `Lo sentimos ${user}, no has aprobado las pruebas en esta ocasión.\nPuedes intentarlo nuevamente en el futuro.`,
            'error'
        );

        message.channel.send({ content: nopassMessage });
        message.delete().catch(console.error);
    },
}; 