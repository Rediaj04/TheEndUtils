const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'cuddle',
    description: 'Acurruca a un usuario',
    aliases: ['acurrucar'],
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            if (!user) {
                const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}cuddle @usuario`));
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }
            if (user.id === message.author.id) {
                const errorMsg = await message.reply('❌ No puedes acurrucarte a ti mismo.');
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }
            let gifUrl = '';
            let animeName = 'Desconocido';
            try {
                const response = await fetch('https://nekos.best/api/v2/cuddle');
                const data = await response.json();
                if (data.results && data.results[0]) {
                    gifUrl = data.results[0].url;
                    animeName = data.results[0].anime_name || 'Desconocido';
                }
            } catch (err) {
                gifUrl = '';
            }
            const cuddleEmbed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('🫂 ¡Acurruco! 🫂')
                .setDescription(`**${message.author.username}** acurrucó a **${user.username}** 🫂`)
                .setImage(gifUrl)
                .setFooter({ text: `Anime: ${animeName}` })
                .setTimestamp();
            await message.reply({ embeds: [cuddleEmbed] });
        } catch (error) {
            console.error('Error en el comando cuddle:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 