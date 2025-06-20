const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'yaoi',
    aliases: [],
    description: 'Muestra un gif NSFW de yaoi',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/yaoi/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '💙 ¡Yaoi apasionado! 💙';
                descripcion = `**${message.author.username}** y **${mencionado.username}** se dejan llevar por la pasión yaoi 🔥`;
            } else {
                titulo = '💙 Fantasía yaoi 💙';
                descripcion = `**${message.author.username}** encontró un yaoi apasionado entre chicos 💙`;
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