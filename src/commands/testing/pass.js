const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');
const errores = require('../../utils/errores');

module.exports = {
    name: 'pass',
    description: 'Notifica que un usuario ha aprobado las pruebas con detalles en un embed',
    async execute(message, args, client) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            const errorMsg = await message.reply(errores.SOLO_TESTING);
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
            return;
        }

        // Espera: args = [nick, discord, modo, resultado, tester]
        // Ejemplo uso: ??pass .ItzMatiaspvp @matiii0006_67852 Box_Pvp 5-1 @johan16.167
        if (args.length < 5) {
            const errorMsg = await message.reply('❌ Uso incorrecto. Ejemplo: `??pass <Nick> <@Discord> <Modo> <Resultado> <@Tester>`');
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            return;
        }

        const [nick, discord, modo, resultado, tester] = args;
        const canalId = '1294703380866007141';
        const canal = client.channels.cache.get(canalId);
        if (!canal) {
            await message.reply('❌ No se pudo encontrar el canal de resultados.');
            return;
        }

        // Buscar UUID del nick en la API de McTiers
        let skinUrl = null;
        try {
            const apiUrl = `https://mctiers.com/api/search_profile/${encodeURIComponent(nick)}`;
            const res = await fetch(apiUrl);
            if (res.ok) {
                const data = await res.json();
                if (data && data.uuid) {
                    skinUrl = `https://render.crafty.gg/3d/bust/${data.uuid}`;
                }
            }
        } catch (e) {
            skinUrl = null;
        }

        // Obtener el usuario de Discord mencionado (si es mención)
        let discordUser = null;
        if (message.mentions && message.mentions.users.size > 0) {
            discordUser = message.mentions.users.first();
        }
        const avatarUrl = discordUser ? discordUser.displayAvatarURL({ extension: 'png', size: 64 }) : null;

        const embed = new EmbedBuilder()
            .setColor('#00FF7F') // Verde brillante
            .setAuthor({
                name: `@TheEndUtils Test Results 🏆`,
                iconURL: avatarUrl || undefined
            })
            .setDescription(
                `**Nick:**\n${nick}\n\n` +
                `**Discord:**\n${discord}\n\n` +
                `**Modo de juego:**\n${modo}\n\n` +
                `**Resultado:**\n${resultado}\n\n` +
                `**Tester:**\n${tester}`
            )
            .setFooter({ text: 'The End Utils - Sistema de Pruebas', iconURL: message.guild.iconURL() })
            .setTimestamp();
        if (skinUrl) {
            embed.setThumbnail(skinUrl);
        }

        const sentMsg = await canal.send({ embeds: [embed] });
        // Auto-reacciones
        const reactions = ['👑', '🎉', '🥳', '😱', '😭', '😂', '💀'];
        for (const emoji of reactions) {
            await sentMsg.react(emoji).catch(() => {});
        }

        await message.reply('✅ Resultado enviado correctamente.');
        await message.delete().catch(console.error);
    },
}; 