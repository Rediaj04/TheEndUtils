const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'wink',
    description: 'Guiña a un usuario',
    aliases: ['guiñar'],
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            let desc = '';
            if (user) {
                if (user.id === message.author.id) {
                    desc = `**${message.author.username}** se guiñó a sí mismo 😉`;
                } else {
                    desc = `**${message.author.username}** le guiñó el ojo a **${user.username}** 😉`;
                }
            } else {
                desc = `**${message.author.username}** guiñó el ojo 😉`;
            }
            let gifUrl = '';
            let animeName = 'Desconocido';
            try {
                const response = await fetch('https://nekos.best/api/v2/wink');
                const data = await response.json();
                if (data.results && data.results[0]) {
                    gifUrl = data.results[0].url;
                    animeName = data.results[0].anime_name || 'Desconocido';
                }
            } catch (err) {
                gifUrl = '';
            }
            const winkEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle('😉 ¡Guiño! 😉')
                .setDescription(desc)
                .setImage(gifUrl)
                .setFooter({ text: `Anime: ${animeName}` })
                .setTimestamp();
            await message.reply({ embeds: [winkEmbed] });
        } catch (error) {
            console.error('Error en el comando wink:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 