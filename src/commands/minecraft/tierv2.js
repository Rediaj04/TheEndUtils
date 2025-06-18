const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'tierv2',
    aliases: [],
    description: 'Muestra las tiers v2 de un jugador de Minecraft usando McTiers.io',
    usage: 'tierv2 <usuario_minecraft>',
    async execute(message, args, client) {
        const username = args[0];
        if (!username) {
            return message.reply('❌ Debes especificar el nombre de usuario de Minecraft.');
        }
        const apiUrl = `https://mctiers.io/api/search_profile/${encodeURIComponent(username)}`;
        try {
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error('No se pudo obtener la información del jugador.');
            const data = await res.json();
            if (!data || !data.uuid) {
                return message.reply('❌ No se encontró el jugador en McTiers.io.');
            }
            // Mapeo de keys de la API a nombres internos y emojis
            const modalidades = [
                { apiKey: 'crystal', label: 'Crystal', emoji: ':vanilla:' },
                { apiKey: 'uhc', label: 'UHC', emoji: ':uhc:' },
                { apiKey: 'pot', label: 'Pot', emoji: ':pot:' },
                { apiKey: 'neth_pot', label: 'NethOP', emoji: ':nethop:' },
                { apiKey: 'smp', label: 'SMP', emoji: ':smp:' },
                { apiKey: 'sword', label: 'Sword', emoji: ':sword:' },
                { apiKey: 'axe', label: 'Axe', emoji: ':axe:' },
                { apiKey: 'elytra', label: 'Elytra', emoji: ':elytra:' }
            ];
            const fields = [];
            modalidades.forEach(({ apiKey, label, emoji }, i) => {
                const emojiObj = client.emojis.cache.find(e => `:${e.name.toLowerCase()}:` === emoji) || emoji;
                const nameWithEmoji = `${emojiObj} ${label}`;
                const value = (data.rankings && data.rankings[apiKey] && data.rankings[apiKey].tier)
                    ? `Tier ${data.rankings[apiKey].tier}`
                    : 'Unranked';
                fields.push({ name: nameWithEmoji, value, inline: true });
                if (i === 3) fields.push({ name: '\u200B', value: '\u200B', inline: true });
            });
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('🛡️ Tiers v2 de ' + data.name)
                .addFields(fields)
                .setImage(`https://render.crafty.gg/3d/bust/${data.uuid}`)
                .setFooter({ text: `Región: ${data.region || 'Desconocida'} | Usuario: ${data.name}` });
            await message.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            return message.reply('❌ Error al consultar la API de McTiers.io.');
        }
    },
}; 