const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'yuri',
    aliases: ['yu', 'yr'],
    description: 'Muestra un gif NSFW de yuri',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/yuri/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '💕 ¡Yuri en acción! 💕';
                descripcion = `**${message.author.username}** y **${mencionado.username}** disfrutan de un dulce momento yuri entre chicas 🌸`;
            } else {
                titulo = '💕 Fantasía yuri 💕';
                descripcion = `**${message.author.username}** disfruta de un dulce momento yuri entre chicas 💕`;
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