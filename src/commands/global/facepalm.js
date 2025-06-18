const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'facepalm',
    description: 'Palmada en la cara (facepalm)',
    aliases: ['palmadacara'],
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            let desc = '';
            if (user) {
                if (user.id === message.author.id) {
                    desc = `**${message.author.username}** se hizo un facepalm 🤦`;
                } else {
                    desc = `**${message.author.username}** le hizo un facepalm a **${user.username}** 🤦`;
                }
            } else {
                desc = `**${message.author.username}** hizo un facepalm 🤦`;
            }
            let gifUrl = '';
            let animeName = 'Desconocido';
            try {
                const response = await fetch('https://nekos.best/api/v2/facepalm');
                const data = await response.json();
                if (data.results && data.results[0]) {
                    gifUrl = data.results[0].url;
                    animeName = data.results[0].anime_name || 'Desconocido';
                }
            } catch (err) {
                gifUrl = '';
            }
            const facepalmEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle('🤦 ¡Facepalm! 🤦')
                .setDescription(desc)
                .setImage(gifUrl)
                .setFooter({ text: `Anime: ${animeName}` })
                .setTimestamp();
            await message.reply({ embeds: [facepalmEmbed] });
        } catch (error) {
            console.error('Error en el comando facepalm:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 