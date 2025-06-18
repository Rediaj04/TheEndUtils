const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');

module.exports = {
    name: 'kiss',
    description: 'Envía un beso a un usuario',
    async execute(message, args, client) {
        try {
            const user = message.mentions.users.first();
            
            if (!user) {
                const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}kiss @usuario`));
                setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
                return;
            }

            if (user.id === message.author.id) {
                const errorMsg = await message.reply(errores.NO_BESARSE);
                setTimeout(() => errorMsg.delete().catch(console.error), 5000);
                return;
            }

            const kissEmbed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('💖 ¡Un beso especial! 💖')
                .setDescription(`**${message.author.username}** le dio un beso a **${user.username}** 💖`)
                .setImage('https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif')
                .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
                .setTimestamp();

            await message.channel.send({ embeds: [kissEmbed] });
            await message.delete().catch(console.error);
        } catch (error) {
            console.error('Error en el comando kiss:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 5000);
            });
        }
    },
}; 