const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const errores = require('../../utils/errores');
const permissions = require('../../utils/permissions');

const INVITES_PER_PAGE = 5;

module.exports = {
    name: 'invitesuser',
    description: 'Muestra todas las invitaciones activas creadas por un usuario, con paginación.',
    async execute(message, args, client) {
        if (!permissions.isAdmin(message.member)) {
            const err = await message.reply(errores.SOLO_ADMIN);
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        const user = message.mentions.users.first();
        if (!user) return message.reply('Debes mencionar a un usuario.');
        const invites = await message.guild.invites.fetch();
        const userInvites = Array.from(invites.values()).filter(invite => invite.inviter && invite.inviter.id === user.id);
        if (!userInvites.length) return message.reply('Ese usuario no ha creado invitaciones activas.');
        let page = 0;
        const maxPage = Math.ceil(userInvites.length / INVITES_PER_PAGE) - 1;

        const getEmbed = (page) => {
            const start = page * INVITES_PER_PAGE;
            const end = start + INVITES_PER_PAGE;
            const currentInvites = userInvites.slice(start, end);
            const totalUses = userInvites.reduce((acc, i) => acc + i.uses, 0);
            const embed = new EmbedBuilder()
                .setTitle(`Invitaciones activas de ${user.tag}`)
                .setColor('#FF0000')
                .setDescription(`Total invitaciones: **${userInvites.length}**\nTotal usos: **${totalUses}**`)
                .setThumbnail(user.displayAvatarURL())
                .setImage('attachment://Banner.gif')
                .setFooter({ text: `Página ${page + 1} de ${maxPage + 1}` })
                .setTimestamp();
            currentInvites.forEach(invite => {
                embed.addFields({
                    name: `🔗 Código: ${invite.code}`,
                    value:
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
                    .setCustomId('invitesuser_prev')
                    .setLabel('⬅️ Anterior')
                    .setStyle(2)
                    .setDisabled(page === 0),
                new ButtonBuilder()
                    .setCustomId('invitesuser_next')
                    .setLabel('Siguiente ➡️')
                    .setStyle(2)
                    .setDisabled(page === maxPage)
            );
        };

        const msg = await message.reply({ embeds: [getEmbed(page)], components: [getRow(page)], files: ['./src/assets/Banner.gif'] });
        const collector = msg.createMessageComponentCollector({ time: 120000 });
        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== message.author.id) return interaction.reply({ content: 'Solo el autor puede usar la paginación.', ephemeral: true });
            if (interaction.customId === 'invitesuser_prev') page = Math.max(page - 1, 0);
            if (interaction.customId === 'invitesuser_next') page = Math.min(page + 1, maxPage);
            await interaction.update({ embeds: [getEmbed(page)], components: [getRow(page)], files: ['./src/assets/Banner.gif'] });
        });
        collector.on('end', () => {
            msg.edit({ components: [] }).catch(() => {});
        });
    },
}; 