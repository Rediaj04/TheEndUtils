const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'solo_male',
    aliases: ['solochico', 'solohombre'],
    description: 'Muestra un gif NSFW de solo (chico solo)',
    async execute(message, args, client) {
        if (!message.channel.nsfw) {
            return message.reply('❌ Este comando solo puede usarse en canales NSFW.');
        }
        try {
            const res = await fetch('https://api.purrbot.site/v2/img/nsfw/solo_male/gif');
            const data = await res.json();
            if (data.error) throw new Error('API error');
            const mencionado = message.mentions.users.first();
            let titulo, descripcion;
            if (mencionado) {
                titulo = '🍆 ¡Chico travieso! 🍆';
                descripcion = `**${message.author.username}** observa cómo **${mencionado.username}** se da placer a sí mismo... 😏`;
            } else {
                titulo = '🍆 Solo para chicos 🍆';
                descripcion = `**${message.author.username}** disfruta viendo a un chico en su momento más íntimo... 😏`;
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