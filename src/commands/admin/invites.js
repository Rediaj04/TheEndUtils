const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const errores = require('../../utils/errores');
const permissions = require('../../utils/permissions');

const INVITES_PER_PAGE = 3;

module.exports = {
    name: 'invites',
    description: 'Muestra un resumen y lista paginada de todas las invitaciones activas del servidor.',
    async execute(message, args, client) {
        if (!permissions.isAdmin(message.member)) {
            const err = await message.reply(errores.SOLO_ADMIN);
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        const invites = await message.guild.invites.fetch();
        if (!invites.size) return message.reply('No hay invitaciones activas en este servidor.');
        const invitesArray = Array.from(invites.values());
        let page = 0;
        const maxPage = Math.ceil(invitesArray.length / INVITES_PER_PAGE) - 1;

        const getEmbed = (page) => {
            const start = page * INVITES_PER_PAGE;
            const end = start + INVITES_PER_PAGE;
            const currentInvites = invitesArray.slice(start, end);
            const totalUses = invitesArray.reduce((acc, i) => acc + i.uses, 0);
            const mostUsed = invitesArray.reduce((a, b) => a.uses > b.uses ? a : b);
            const mostRecent = invitesArray.reduce((a, b) => a.createdTimestamp > b.createdTimestamp ? a : b);
            const embed = new EmbedBuilder()
                .setTitle('Invitaciones activas')
                .setColor('#FF0000')
                .setDescription(`Total invitaciones: **${invitesArray.length}**\nTotal usos: **${totalUses}**\nMás usada: [${mostUsed.code}](https://discord.gg/${mostUsed.code}) (${mostUsed.uses} usos)\nMás reciente: [${mostRecent.code}](https://discord.gg/${mostRecent.code})`)
                .setImage('attachment://Banner.gif')
                .setFooter({ text: `Página ${page + 1} de ${maxPage + 1}` })
                .setTimestamp();
            currentInvites.forEach(invite => {
                embed.addFields({
                    name: `🔗 Código: ${invite.code}`,
                    value:
                        `👤 Creador: ${invite.inviter ? invite.inviter.tag : 'Desconocido'}\n` +
                        `#️⃣ Canal: ${invite.channel}\n` +
                        `📈 Usos: ${invite.uses}/${invite.maxUses || '∞'}\n` +
                        `⏳ Temporal: ${invite.temporary ? 'Sí' : 'No'}\n` +
                        `📅 Creada: <t:${Math.floor(invite.createdTimestamp / 1000)}:d>\n` +
                        `${invite.expiresAt ? `⌛ Expira: <t:${Math.floor(invite.expiresAt / 1000)}:R>\n` : ''}` +
                        `[Ir a la invitación](https://discord.gg/${invite.code})`
                });
            });
            return embed;
        };

        const getRow = (page) => {
            return new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('invites_prev')
                    .setLabel('⬅️ Anterior')
                    .setStyle(2)
                    .setDisabled(page === 0),
                new ButtonBuilder()
                    .setCustomId('invites_next')
                    .setLabel('Siguiente ➡️')
                    .setStyle(2)
                    .setDisabled(page === maxPage)
            );
        };

        const msg = await message.reply({ embeds: [getEmbed(page)], components: [getRow(page)], files: ['./src/assets/Banner.gif'] });
        const collector = msg.createMessageComponentCollector({ time: 120000 });
        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== message.author.id) return interaction.reply({ content: 'Solo el autor puede usar la paginación.', ephemeral: true });
            if (interaction.customId === 'invites_prev') page = Math.max(page - 1, 0);
            if (interaction.customId === 'invites_next') page = Math.min(page + 1, maxPage);
            await interaction.update({ embeds: [getEmbed(page)], components: [getRow(page)], files: ['./src/assets/Banner.gif'] });
        });
        collector.on('end', () => {
            msg.edit({ components: [] }).catch(() => {});
        });
    },
}; 