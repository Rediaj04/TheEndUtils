const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config');
const errores = require('../../utils/errores');

module.exports = {
    name: 'dog',
    aliases: ['perro', 'perra'],
    description: 'Muestra una foto aleatoria de un perrito',
    async execute(message, args, client) {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            if (data.status !== 'success' || !data.message) {
                throw new Error('No se pudo obtener la imagen');
            }
            const dogEmbed = new EmbedBuilder()
                .setColor('#ffb347')
                .setTitle('🐶 ¡Aquí tienes un perrito aleatorio!')
                .setImage(data.message)
                .setFooter({ text: 'Powered by dog.ceo', iconURL: 'https://dog.ceo/img/favicon.png' })
                .setTimestamp();
            await message.reply({ embeds: [dogEmbed] });
        } catch (error) {
            console.error('Error en el comando dog:', error);
            const errorMsg = await message.reply(errores.ERROR_DESCONOCIDO + ' No se pudo obtener la imagen de perrito.');
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 