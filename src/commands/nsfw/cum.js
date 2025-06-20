const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'cum',
    aliases: ['corrida'],
    description: 'Muestra un gif NSFW de cum/corrida',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/cum/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '💦 ¡Corrida compartida! 💦';
                descripcion = `**${message.author.username}** no se contuvo y le regaló una corrida a **${mencionado.username}** 😳`;
            } else {
                titulo = '💦 Momento explosivo 💦';
                descripcion = `**${message.author.username}** fue testigo de una corrida explosiva y muy hot 🔥`;
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