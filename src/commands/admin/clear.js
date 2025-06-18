const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');

module.exports = {
    name: 'clear',
    description: 'Borra mensajes en el canal (solo administradores)',
    async execute(message, args, client) {
        const { emojis } = styles;

        // Verificar si el usuario es administrador
        if (!message.member.permissions.has('Administrator')) {
            const errorMsg = await message.channel.send(errores.SOLO_ADMIN);
            await message.delete().catch(console.error);
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
            return;
        }

        // Obtener la cantidad de mensajes a borrar
        const amount = parseInt(args[0]);

        // Validar la cantidad
        if (isNaN(amount)) {
            const errorMsg = await message.channel.send(errores.CANTIDAD_INVALIDA(`$${config.prefix}clear 10`));
            await message.delete().catch(console.error);
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
            return;
        }

        // Validar el límite
        if (amount < 1 || amount > 50) {
            const errorMsg = await message.channel.send(errores.LIMITE_CANTIDAD);
            await message.delete().catch(console.error);
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
            return;
        }

        try {
            // Borrar los mensajes
            const deleted = await message.channel.bulkDelete(amount + 1, true);

            // Enviar confirmación
            const successMsg = await message.channel.send(`${emojis.success} Se han borrado ${deleted.size - 1} mensajes en este canal.`);
            setTimeout(() => successMsg.delete().catch(console.error), 5000);

        } catch (error) {
            console.error('Error al borrar mensajes:', error);
            const errorMsg = await message.channel.send(errores.ERROR_BORRAR_MENSAJES);
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
        }
    },
}; 