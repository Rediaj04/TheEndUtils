const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'threesome_fff',
    aliases: ['triosfff', 'trioschicas', 'tfff', 'fff', 'tc'],
    description: 'Muestra un gif NSFW de trío (FFF)',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/threesome_fff/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '👩‍❤️‍👩‍❤️‍👩 ¡Trío explosivo! 👩‍❤️‍👩‍❤️‍👩';
                descripcion = `**${message.author.username}** se une a **${mencionado.username}** y otra chica para un trío FFF inolvidable 🔥`;
            } else {
                titulo = '👩‍❤️‍👩‍❤️‍👩 Fantasía de chicas 👩‍❤️‍👩‍❤️‍👩';
                descripcion = `**${message.author.username}** se une a un trío de chicas muy atrevidas 👩‍❤️‍👩‍❤️‍👩`;
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