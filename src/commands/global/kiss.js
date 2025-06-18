const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'kiss',
    description: 'Envía un beso a un usuario',
    aliases: ['besar'],
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            
            if (!user) {
                const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}kiss @usuario`));
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }

            if (user.id === message.author.id) {
                const errorMsg = await message.reply(errores.NO_BESARSE);
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }

            // Obtener gif aleatorio de nekos.best
            let gifUrl = 'https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif';
            let animeName = 'Desconocido';
            try {
                const response = await fetch('https://nekos.best/api/v2/kiss');
                const data = await response.json();
                if (data.results && data.results[0]) {
                    gifUrl = data.results[0].url;
                    animeName = data.results[0].anime_name || 'Desconocido';
                }
            } catch (err) {
                // Si falla la API, usa el gif por defecto
            }

            const kissEmbed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('💖 ¡Un beso especial! 💖')
                .setDescription(`**${message.author.username}** le dio un beso a **${user.username}** 💖`)
                .setImage(gifUrl)
                .setFooter({ text: `Anime: ${animeName}` })
                .setTimestamp();

            await message.reply({ embeds: [kissEmbed] });
        } catch (error) {
            console.error('Error en el comando kiss:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 