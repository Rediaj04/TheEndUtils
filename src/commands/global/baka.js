const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'baka',
    description: 'Llama tonto a un usuario',
    aliases: ['tonto'],
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            if (!user) {
                const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}baka @usuario`));
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }
            if (user.id === message.author.id) {
                const errorMsg = await message.reply('❌ No puedes llamarte tonto a ti mismo.');
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }
            let gifUrl = '';
            let animeName = 'Desconocido';
            try {
                const response = await fetch('https://nekos.best/api/v2/baka');
                const data = await response.json();
                if (data.results && data.results[0]) {
                    gifUrl = data.results[0].url;
                    animeName = data.results[0].anime_name || 'Desconocido';
                }
            } catch (err) {
                gifUrl = '';
            }
            const bakaEmbed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('😡 ¡Tonto! 😡')
                .setDescription(`**${message.author.username}** llamó tonto a **${user.username}** 😡`)
                .setImage(gifUrl)
                .setFooter({ text: `Anime: ${animeName}` })
                .setTimestamp();
            await message.reply({ embeds: [bakaEmbed] });
        } catch (error) {
            console.error('Error en el comando baka:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 