const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');
const errores = require('../../utils/errores');

module.exports = {
    name: 'nopass',
    description: 'Notifica que un usuario no ha aprobado las pruebas con detalles en un embed',
    async execute(message, args, client) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            const errorMsg = await message.reply(errores.SOLO_TESTING);
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
            return;
        }

        // Espera: args = [nick, discord, modo, resultado, tester]
        // Ejemplo uso: ??nopass .ItzMatiaspvp @matiii0006_67852 Box_Pvp 5- @johan16.167
        if (args.length < 5) {
            const errorMsg = await message.reply('❌ Uso incorrecto. Ejemplo: `??nopass <Nick> <@Discord> <Modo> <Resultado> <@Tester>`');
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            return;
        }

        const [nick, discord, modo, resultado, tester] = args;
        const canalId = '1294703498377560085';
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
            .setColor('#FF0000') // Rojo fuerte
            .setAuthor({
                name: `@TheEndUtils Test Results 🏆`,
                iconURL: avatarUrl || undefined
            })
            .setDescription(
                `**Nick:**\n${nick}\n` +
                `**Discord:**\n${discord}\n` +
                `**Modo de juego:**\n${modo}\n` +
                `**Resultado:**\n${resultado}\n` +
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

        const finalMessage = `⚠️ **Resultado: No Aprobado**\n\nLamentablemente, no has superado las pruebas esta vez.  \n📄 Puedes revisar los detalles aquí:  \n\n🔗 ${sentMsg.url}\n\n⚡ No te desanimes, ¡puedes volver a intentarlo en **1 semana**! ⚡ ${discord}`;
        await message.channel.send(finalMessage);
        await message.delete().catch(console.error);
    },
}; 