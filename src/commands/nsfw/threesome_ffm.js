const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'threesome_ffm',
    aliases: ['triosffm', 'triosmixto', 'tffm', 'ffm', 'tf'],
    description: 'Muestra un gif NSFW de trío (FFM)',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/threesome_ffm/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '🔥 Trío mixto en acción 🔥';
                descripcion = `**${message.author.username}** y **${mencionado.username}** se lanzan a un trío FFM muy picante 😏`;
            } else {
                titulo = '🔥 Fantasía FFM 🔥';
                descripcion = `**${message.author.username}** se encuentra en un trío muy variado y picante 🔥`;
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