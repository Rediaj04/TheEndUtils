const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'pat',
    description: 'Da una palmadita a un usuario',
    aliases: ['palmadita'],
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            if (!user) {
                const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}pat @usuario`));
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }
            if (user.id === message.author.id) {
                const errorMsg = await message.reply('❌ No puedes darte una palmadita a ti mismo.');
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }
            let gifUrl = '';
            let animeName = 'Desconocido';
            try {
                const response = await fetch('https://nekos.best/api/v2/pat');
                const data = await response.json();
                if (data.results && data.results[0]) {
                    gifUrl = data.results[0].url;
                    animeName = data.results[0].anime_name || 'Desconocido';
                }
            } catch (err) {
                gifUrl = '';
            }
            const patEmbed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('🫶 ¡Palmadita! 🫶')
                .setDescription(`**${message.author.username}** le dio una palmadita a **${user.username}** 🫶`)
                .setImage(gifUrl)
                .setFooter({ text: `Anime: ${animeName}` })
                .setTimestamp();
            await message.reply({ embeds: [patEmbed] });
        } catch (error) {
            console.error('Error en el comando pat:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 