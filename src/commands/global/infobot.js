const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');

module.exports = {
    name: 'infobot',
    description: 'Muestra información sobre el bot',
    async execute(message, args, client) {
        try {
            const infobotEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('🤖 **Información de The End Utils**')
                .setDescription(`
💫 **The End Utils** es el bot oficial del clan The End, creado para gestionar tickets, testers, comandos y más.

🔧 **Características**:
• Sistema de pruebas con notificaciones automáticas
• Gestión de roles y permisos
• Comandos de administración
• Sistema AFK con notificaciones
• Plantillas y reglas predefinidas

📝 **Comandos**:
• \`${config.prefix}ayuda\` - Muestra todos los comandos disponibles
• \`${config.prefix}reglas\` - Muestra las reglas del test de ingreso
• \`${config.prefix}redes\` - Muestra las redes sociales

🔗 **Enlaces**:
• [GitHub](https://github.com/Rediaj04/TheEndUtils)
• [Discord](https://discord.gg/3pFVWqJfaW)

💖 *Desarrollado con ❤️ por Rediaj04 para The End Community*`)
                .setThumbnail(client.user.displayAvatarURL())
                .setImage('attachment://Banner.gif')
                .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
                .setTimestamp();

            await message.channel.send({
                embeds: [infobotEmbed],
                files: ['./Banner.gif']
            });
            await message.delete().catch(console.error);
        } catch (error) {
            console.error('Error en el comando infobot:', error);
            message.reply('❌ Hubo un error al ejecutar el comando. Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 5000);
            });
        }
    },
}; 