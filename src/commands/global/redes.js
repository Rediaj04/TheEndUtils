const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');

module.exports = {
    name: 'redes',
    description: 'Muestra las redes sociales',
    aliases: ['fan'],
    async execute(message, args, client) {
        try {
            const redesEmbed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('🌐 **¡Sígueme en mis redes, amiwito!** 😎')
                .setDescription(`
🎥 **TikTok**:  
👉 https://www.tiktok.com/@jaid3r04

📺 **YouTube**:  
👉 https://www.youtube.com/@Jaid3r04

💖 *¡No olvides dar like y suscribirte!* 💖`)
                .setImage('attachment://Banner.gif')
                .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
                .setTimestamp();

            await message.reply({
                embeds: [redesEmbed],
                files: ['./Banner.gif']
            });
        } catch (error) {
            console.error('Error en el comando redes:', error);
            const errorMsg = await message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.');
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 