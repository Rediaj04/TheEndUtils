const { EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
    name: 'serverinfo',
    description: 'Muestra información sobre el servidor: número de miembros, canales, roles, fecha de creación, etc.',
    async execute(message, args, client) {
        const { guild } = message;
        if (!guild) return message.reply('Este comando solo puede usarse en un servidor.');

        const totalMembers = guild.memberCount;
        const totalRoles = guild.roles.cache.size;
        const totalChannels = guild.channels.cache.size;
        const textChannels = guild.channels.cache.filter(c => c.type === 0).size;
        const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
        const createdAt = `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`;
        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setTitle(`Información del Servidor: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor('#FF0000')
            .addFields(
                { name: '👑 Dueño', value: `${owner}`, inline: true },
                { name: '🆔 ID', value: guild.id, inline: true },
                { name: '📅 Creado', value: createdAt, inline: true },
                { name: '👥 Miembros', value: `${totalMembers}`, inline: true },
                { name: '💬 Canales', value: `Texto: ${textChannels}\nVoz: ${voiceChannels}\nTotal: ${totalChannels}`, inline: true },
                { name: '🏷️ Roles', value: `${totalRoles}`, inline: true }
            )
            .setFooter({ text: `The End Utils • ${guild.name}` })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    },
}; 