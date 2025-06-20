const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const fetch = require('node-fetch');

module.exports = {
    name: 'blowjob',
    aliases: ['mamada', 'chupada'],
    description: 'Muestra una imagen de blowjob (solo canales NSFW)',
    async execute(message, args, client) {
        try {
            // Verificar si el canal es NSFW
            if (!message.channel.nsfw) {
                const errorMsg = await message.reply('❌ Este comando solo puede usarse en canales NSFW.');
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }

            let imageUrl = '';
            try {
                const response = await fetch('https://api.waifu.pics/nsfw/blowjob');
                const data = await response.json();
                if (data.url) {
                    imageUrl = data.url;
                }
            } catch (err) {
                console.error('Error obteniendo imagen de blowjob:', err);
            }

            if (!imageUrl) {
                const errorMsg = await message.reply('❌ No se pudo obtener la imagen. Intenta de nuevo más tarde.');
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }

            const blowjobEmbed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('💋 ¡Blowjob! 💋')
                .setDescription(`**${message.author.username}** encontró una imagen de blowjob 💋`)
                .setImage(imageUrl)
                .setFooter({ text: 'Powered by waifu.pics' })
                .setTimestamp();

            await message.reply({ embeds: [blowjobEmbed] });
        } catch (error) {
            console.error('Error en el comando blowjob:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            });
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 