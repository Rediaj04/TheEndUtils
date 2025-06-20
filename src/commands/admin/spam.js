const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');
const errores = require('../../utils/errores');
const config = require('../../config');

module.exports = {
    name: 'spam',
    description: 'Envía una frase varias veces en el canal. Solo para admins. Uso: ??spam "frase" cantidad (máx 50 mensajes, máx 120 caracteres de frase)',
    async execute(message, args, client) {
        const { emojis } = styles;
        // Solo admins
        if (!permissions.isAdmin(message.member)) {
            const err = await message.reply(errores.SOLO_ADMIN);
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        // Validar argumentos
        const match = message.content.match(/spam\s+"([^"]+)"\s+(\d+)/i);
        if (!match) {
            const err = await message.reply(errores.USO_INCORRECTO(`${config.prefix}spam "Texto a spamear" 10`));
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        const frase = match[1];
        let cantidad = parseInt(match[2], 10);
        if (isNaN(cantidad) || cantidad < 1 || cantidad > 50) {
            const err = await message.reply(errores.LIMITE_CANTIDAD);
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        if (frase.length > 120) {
            const err = await message.reply(`${emojis.error} La frase es demasiado larga. Máximo 120 caracteres.`);
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        // Enviar los mensajes
        for (let i = 0; i < cantidad; i++) {
            await message.channel.send(frase);
        }
        // Eliminar el mensaje original después de 3 segundos
        setTimeout(() => message.delete().catch(() => {}), 3000);
    },
}; 