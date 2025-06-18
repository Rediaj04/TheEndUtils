const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'tier',
    aliases: [],
    description: 'Muestra las tiers de un jugador de Minecraft usando McTiers',
    usage: 'tier <usuario_minecraft>',
    async execute(message, args, client) {
        const username = args[0];
        if (!username) {
            return message.reply('❌ Debes especificar el nombre de usuario de Minecraft.');
        }
        const apiUrl = `https://mctiers.com/api/search_profile/${encodeURIComponent(username)}`;
        try {
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error('No se pudo obtener la información del jugador.');
            const data = await res.json();
            if (!data || !data.uuid) {
                return message.reply('❌ No se encontró el jugador en McTiers.');
            }
            // Modalidades oficiales en orden para dos filas de 4
            const modalidades = [
                { key: 'vanilla', label: 'Vanilla' },
                { key: 'uhc', label: 'UHC' },
                { key: 'pot', label: 'Pot' },
                { key: 'nethop', label: 'NethOP' },
                { key: 'smp', label: 'SMP' },
                { key: 'sword', label: 'Sword' },
                { key: 'axe', label: 'Axe' },
                { key: 'mace', label: 'Mace' }
            ];
            const fields = [];
            modalidades.forEach(({ key, label }, i) => {
                const emojiObj = client.emojis.cache.find(e => e.name.toLowerCase() === key.toLowerCase()) || `:${key}:`;
                const nameWithEmoji = `${emojiObj} ${label}`;
                const value = (data.rankings && data.rankings[key] && data.rankings[key].tier)
                    ? `Tier ${data.rankings[key].tier}`
                    : 'Unranked';
                fields.push({ name: nameWithEmoji, value, inline: true });
                // Campo vacío después de la cuarta modalidad para separar filas
                if (i === 3) fields.push({ name: '\u200B', value: '\u200B', inline: true });
            });
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('🛡️ Tiers de ' + data.name)
                .addFields(fields)
                .setImage(`https://render.crafty.gg/3d/bust/${data.uuid}`)
                .setFooter({ text: `Región: ${data.region || 'Desconocida'} | Usuario: ${data.name}` });
            await message.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            return message.reply('❌ Error al consultar la API de McTiers.');
        }
    },
}; 