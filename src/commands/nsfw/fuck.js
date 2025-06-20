const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'fuck',
    aliases: ['follar'],
    description: 'Muestra un gif NSFW de fuck/follar',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/fuck/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '🔥 ¡Acción candente! 🔥';
                descripcion = `**${message.author.username}** no pudo resistirse y le dio duro a **${mencionado.username}** 🍑`;
            } else {
                titulo = '🔥 Solo para valientes 🔥';
                descripcion = `**${message.author.username}** se topó con una escena muy intensa y subidita de tono 🍑`;
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