const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'threesome_mmf',
    aliases: ['triosmmf', 'trioschicos', 'tmmf', 'mmf', 'tm'],
    description: 'Muestra un gif NSFW de trío (MMF)',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/threesome_mmf/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '💪🍆 ¡Trío de chicos al límite! 💪🍆';
                descripcion = `**${message.author.username}** y **${mencionado.username}** se atreven con un trío MMF muy intenso 💦`;
            } else {
                titulo = '💪🍆 Fantasía MMF 💪🍆';
                descripcion = `**${message.author.username}** se atreve con un trío de chicos muy intensos 💪🍆`;
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