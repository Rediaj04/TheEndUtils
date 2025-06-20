const config = require('../../config');
const errores = require('../../utils/errores');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'ping',
    description: 'Un comando clásico para comprobar la latencia del bot y del servidor de Discord. Solo para admins.',
    async execute(message, args, client) {
        if (!permissions.isAdmin(message.member)) {
            const err = await message.reply(errores.SOLO_ADMIN);
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        const sent = await message.reply('🏓 Pong! Calculando latencia...');
        const botLatency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);
        await sent.edit(`🏓 Pong!
Latencia del bot: \`${botLatency}ms\`
Latencia de la API de Discord: \`${apiLatency}ms\``);
    },
}; 