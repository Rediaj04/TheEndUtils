const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config');
const errores = require('../../utils/errores');

module.exports = {
    name: 'random-user',
    aliases: ['userrandom', 'randomuser'],
    description: 'Muestra información de un usuario aleatorio',
    async execute(message, args, client) {
        try {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
            if (!data.results || !data.results[0]) {
                throw new Error('No se pudo obtener la información del usuario');
            }
            const user = data.results[0];
            const randomUserEmbed = new EmbedBuilder()
                .setColor('#ff6b6b')
                .setTitle('👤 Usuario Aleatorio')
                .setThumbnail(user.picture.large)
                .addFields(
                    { name: '📝 Nombre', value: `${user.name.title} ${user.name.first} ${user.name.last}`, inline: true },
                    { name: '🎂 Edad', value: `${user.dob.age} años`, inline: true },
                    { name: '📧 Email', value: user.email, inline: false },
                    { name: '📱 Teléfono', value: user.phone, inline: true },
                    { name: '📱 Celular', value: user.cell, inline: true },
                    { name: '🌍 País', value: user.location.country, inline: true },
                    { name: '🏙️ Ciudad', value: user.location.city, inline: true },
                    { name: '📍 Dirección', value: `${user.location.street.number} ${user.location.street.name}`, inline: false },
                    { name: '📮 Código Postal', value: user.location.postcode.toString(), inline: true },
                    { name: '🕐 Zona Horaria', value: user.location.timezone.description, inline: true },
                    { name: '👤 Usuario', value: user.login.username, inline: true },
                    { name: '🔑 Contraseña', value: user.login.password, inline: true },
                    { name: '📅 Registrado', value: new Date(user.registered.date).toLocaleDateString('es-ES'), inline: true }
                )
                .setFooter({ text: 'Powered by randomuser.me', iconURL: 'https://randomuser.me/api/portraits/thumb/men/1.jpg' })
                .setTimestamp();
            await message.reply({ embeds: [randomUserEmbed] });
        } catch (error) {
            console.error('Error en el comando random-user:', error);
            const errorMsg = await message.reply(errores.ERROR_DESCONOCIDO + ' No se pudo obtener la información del usuario aleatorio.');
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 