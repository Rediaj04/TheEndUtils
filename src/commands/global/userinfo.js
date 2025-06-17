const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');

module.exports = {
    name: 'userinfo',
    description: 'Muestra información de un usuario',
    async execute(message, args, client) {
        const { emojis } = styles;
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        const userEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`${emojis.user} Información de ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: `${emojis.id} ID`, value: user.id, inline: true },
                { name: `${emojis.time} Cuenta Creada`, value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: `${emojis.time} Se Unió`, value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: `${emojis.roles} Roles`, value: member.roles.cache.size > 1 ? member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(', ') : 'Sin roles', inline: false },
                { name: `${emojis.status} Estado`, value: member.presence?.status || 'offline', inline: true },
                { name: `${emojis.boost} Boost`, value: member.premiumSince ? `<t:${Math.floor(member.premiumSinceTimestamp / 1000)}:R>` : 'No está boosteando', inline: true }
            )
            .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
            .setTimestamp();

        await message.channel.send({ embeds: [userEmbed] });
        await message.delete().catch(console.error);
    },
}; 