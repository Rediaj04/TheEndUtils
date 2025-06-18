const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');
const errores = require('../../utils/errores');

module.exports = {
    name: 'pass',
    description: 'Notifica que un usuario ha aprobado las pruebas',
    async execute(message, args, client) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            const errorMsg = await message.reply(errores.SOLO_TESTING);
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
            return;
        }

        // Verificar si se mencionó a un usuario
        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}pass @usuario`));
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            return;
        }

        // Crear el mensaje de aprobación
        const passMessage = `🎉 **¡Felicidades!**\n\n✅ Has aprobado las pruebas y tu resultado ha sido **positivo**.\n\n📄 Revisa los detalles en el siguiente canal:\n\n🔗 https://discord.com/channels/1227460757524975678/1294703380866007141`;

        // Enviar el mensaje mencionando al usuario al final
        await message.channel.send(`${passMessage}\n\n||${user}||`);
        await message.delete().catch(console.error);
    },
}; 