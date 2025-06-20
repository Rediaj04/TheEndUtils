const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');

module.exports = {
    name: 'avatar',
    description: 'Muestra el avatar de un usuario',
    async execute(message, args, client) {
        const { emojis } = styles;
        const user = message.mentions.users.first() || message.author;

        const avatarEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`${emojis.image} Avatar de ${user.username}`)
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
            .setTimestamp();

        try {
            await message.reply({ embeds: [avatarEmbed] });
        } catch (error) {
            console.error('Error en el comando avatar:', error);
            const errorMsg = await message.reply('❌ Hubo un error al mostrar el avatar.');
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
            setTimeout(() => message.delete().catch(console.error), 5000);
        }
    },
}; 