const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const errores = require('../../utils/errores');
const styles = require('../../utils/styles');
const path = require('path');

module.exports = {
    name: 'cm',
    aliases: ['memide'],
    description: 'Mide tu banana y recibe un mensaje especial',
    async execute(message, args, client) {
        // Número aleatorio entre 1 y 30
        const cm = Math.floor(Math.random() * 30) + 1;
        let mensaje = '';
        let color = styles.colors.primary;
        let gif = '';
        const { emojis } = styles;

        if (cm <= 3) {
            mensaje = `🍌 **${cm}cm**\n> Tu sable está iniciando su etapa de nacimiento...\n> ¡No te preocupes, lo importante es la actitud! ${emojis.heart}`;
            color = styles.colors.warning;
            gif = 'banana1.gif';
        } else if (cm <= 7) {
            mensaje = `🍌 **${cm}cm**\n> Pequeño pero matón, ¡la leyenda dice que el tamaño no lo es todo! ${emojis.magic}`;
            color = styles.colors.info;
            gif = 'banana2.gif';
        } else if (cm <= 12) {
            mensaje = `🍌 **${cm}cm**\n> ¡En la media! Perfecto para cualquier aventura. ${emojis.success}`;
            color = styles.colors.success;
            gif = 'banana3.gif';
        } else if (cm <= 20) {
            mensaje = `🍌 **${cm}cm**\n> ¡Wow! Aquí hay potencial, seguro eres el orgullo de la familia. ${emojis.premium}`;
            color = styles.colors.primary;
            gif = 'banana4.gif';
        } else if (cm <= 27) {
            mensaje = `🍌 **${cm}cm**\n> ¡Tremendo sable! Digno de un guerrero legendario. ${emojis.admin}`;
            color = styles.colors.success;
            gif = 'banana5.gif';
        } else {
            mensaje = `🍌 **${cm}cm**\n> ¡¿Pero qué monstruosidad es esta?! ¡Llama a la NASA! ${emojis.warning}`;
            color = styles.colors.error;
            gif = 'banana6.gif';
        }

        const cmEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`${emojis.fun} ¡Mide tu banana! ${emojis.fun}`)
            .setDescription(mensaje)
            .setImage(`attachment://${gif}`)
            .setFooter({ text: 'The End Utils             ', iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        try {
            await message.reply({
                embeds: [cmEmbed],
                files: [path.join(__dirname, `../../assets/${gif}`)]
            });
        } catch (error) {
            console.error('Error en el comando cm/memide:', error);
            const errorMsg = await message.reply(errores.ERROR_DESCONOCIDO + ' No se pudo medir la banana.');
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 