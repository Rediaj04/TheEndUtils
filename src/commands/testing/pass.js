const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'pass',
    description: 'Notifica que un usuario ha aprobado las pruebas',
    async execute(message, args, client) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            return message.reply('No tienes permisos para usar este comando.');
        }

        // Verificar si se mencionó a un usuario
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply(`Por favor, menciona a un usuario. Ejemplo: ${config.prefix}pass @usuario`);
        }

        // Crear el mensaje de aprobación
        const passMessage = `🎉 **¡Felicidades!**\n\n✅ Has aprobado las pruebas y tu resultado ha sido **positivo**.\n\n📄 Revisa los detalles en el siguiente canal:\n\n🔗 https://discord.com/channels/1227460757524975678/1294703380866007141`;

        // Enviar el mensaje mencionando al usuario al final
        await message.channel.send(`${passMessage}\n${user}`);

        // Eliminar el mensaje original
        await message.delete();
    },
}; 