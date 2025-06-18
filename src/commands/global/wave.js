const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'wave',
    description: 'Saluda a un usuario',
    aliases: ['saludar'],
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            let desc = '';
            if (user) {
                if (user.id === message.author.id) {
                    desc = `**${message.author.username}** se saludó a sí mismo 👋`;
                } else {
                    desc = `**${message.author.username}** saludó a **${user.username}** 👋`;
                }
            } else {
                desc = `**${message.author.username}** está saludando 👋`;
            }
            let gifUrl = '';
            let animeName = 'Desconocido';
            try {
                const response = await fetch('https://nekos.best/api/v2/wave');
                const data = await response.json();
                if (data.results && data.results[0]) {
                    gifUrl = data.results[0].url;
                    animeName = data.results[0].anime_name || 'Desconocido';
                }
            } catch (err) {
                gifUrl = '';
            }
            const waveEmbed = new EmbedBuilder()
                .setColor('#00BFFF')
                .setTitle('👋 ¡Saludo! 👋')
                .setDescription(desc)
                .setImage(gifUrl)
                .setFooter({ text: `Anime: ${animeName}` })
                .setTimestamp();
            await message.reply({ embeds: [waveEmbed] });
        } catch (error) {
            console.error('Error en el comando wave:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 