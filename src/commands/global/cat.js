const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config');
const errores = require('../../utils/errores');

module.exports = {
    name: 'cat',
    aliases: ['gato', 'gata'],
    description: 'Muestra una foto aleatoria de un gatito',
    async execute(message, args, client) {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            if (!Array.isArray(data) || !data[0] || !data[0].url) {
                throw new Error('No se pudo obtener la imagen');
            }
            const catEmbed = new EmbedBuilder()
                .setColor('#ffb3e6')
                .setTitle('🐱 ¡Aquí tienes un gatito aleatorio!')
                .setImage(data[0].url)
                .setFooter({ text: 'Powered by thecatapi.com', iconURL: 'https://cdn2.thecatapi.com/images/bom.jpg' })
                .setTimestamp();
            await message.reply({ embeds: [catEmbed] });
        } catch (error) {
            console.error('Error en el comando cat:', error);
            const errorMsg = await message.reply(errores.ERROR_DESCONOCIDO + ' No se pudo obtener la imagen de gatito.');
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 