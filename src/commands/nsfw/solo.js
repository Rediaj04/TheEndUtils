const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'solo',
    aliases: ['solonena', 'solochica'],
    description: 'Muestra un gif NSFW de solo (chica sola)',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/solo/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '😏 ¡Momento íntimo! 😏';
                descripcion = `**${message.author.username}** observa cómo **${mencionado.username}** disfruta a solas de un placer secreto... 🔥`;
            } else {
                titulo = '😏 Placer en solitario 😏';
                descripcion = `**${message.author.username}** disfruta de un momento muy personal y atrevido... 🔥`;
            }
            const embed = new EmbedBuilder()
                .setColor('#FF007F')
                .setTitle(titulo)
                .setDescription(descripcion)
                .setImage(data.link)
                .setFooter({ text: 'Powered by purrbot.site' })
                .setTimestamp();
            await message.reply({ embeds: [embed] });
        } catch (e) {
            await message.reply('❌ No se pudo obtener la imagen.');
        }
    },
}; 