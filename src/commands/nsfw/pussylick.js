const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pussylick',
    aliases: ['lamida'],
    description: 'Muestra un gif NSFW de pussylick/lamida',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/pussylick/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '👅 ¡Lamida irresistible! 👅';
                descripcion = `**${message.author.username}** le da una lamida muy placentera a **${mencionado.username}** 😳`;
            } else {
                titulo = '👅 Placer húmedo 👅';
                descripcion = `**${message.author.username}** presencia una lamida muy placentera y atrevida 👅`;
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