const { EmbedBuilder } = require('discord.js');
const errores = require('../../utils/errores');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'inviteinfo',
    description: 'Muestra información detallada de una invitación específica.',
    async execute(message, args, client) {
        if (!permissions.isAdmin(message.member)) {
            const err = await message.reply(errores.SOLO_ADMIN);
            setTimeout(() => err.delete().catch(() => {}), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(() => {}), 3000);
            return;
        }
        const code = args[0];
        if (!code) return message.reply('Debes indicar el código de la invitación.');
        const invites = await message.guild.invites.fetch();
        const invite = invites.find(i => i.code === code);
        if (!invite) return message.reply('No se encontró esa invitación activa.');
        const embed = new EmbedBuilder()
            .setTitle(`Información de la invitación: ${invite.code}`)
            .setColor('#FF0000')
            .setDescription(`[Ir a la invitación](https://discord.gg/${invite.code})`)
            .setImage('attachment://Banner.gif')
            .addFields({
                name: `🔗 Código: ${invite.code}`,
                value:
                    `👤 Creador: ${invite.inviter ? invite.inviter.tag : 'Desconocido'}\n` +
                    `#️⃣ Canal: ${invite.channel}\n` +
                    `📈 Usos: ${invite.uses}/${invite.maxUses || '∞'}\n` +
                    `⏳ Temporal: ${invite.temporary ? 'Sí' : 'No'}\n` +
                    `📅 Creada: <t:${Math.floor(invite.createdTimestamp / 1000)}:F>\n` +
                    `${invite.expiresAt ? `⌛ Expira: <t:${Math.floor(invite.expiresAt / 1000)}:R>\n` : ''}` +
                    `[Ir a la invitación](https://discord.gg/${invite.code})`
            })
            .setFooter({ text: `ID: ${invite.code}` })
            .setTimestamp();
        await message.reply({ embeds: [embed], files: ['./src/assets/Banner.gif'] });
    },
}; 