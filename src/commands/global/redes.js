const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');

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

            await message.channel.send({
                embeds: [redesEmbed],
                files: ['./Banner.gif']
            });
            await message.delete().catch(console.error);
        } catch (error) {
            console.error('Error en el comando redes:', error);
            message.reply('❌ Hubo un error al ejecutar el comando. Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 5000);
            });
        }
    },
}; 