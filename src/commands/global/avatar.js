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

        await message.channel.send({ embeds: [avatarEmbed] });
        await message.delete().catch(console.error);
    },
}; 