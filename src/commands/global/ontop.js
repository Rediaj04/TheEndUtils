const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');

module.exports = {
    name: 'ontop',
    description: 'Muestra el poderío de The End',
    async execute(message, args, client) {
        const { emojis } = styles;

        const ontopEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`${emojis.title} THE END DOMINA TODO ${emojis.title}`)
            .setDescription('*El clan más poderoso y temido de Minecraft*')
            .setImage('attachment://Banner.gif')
            .addFields(
                { name: `${emojis.pvp} PvP`, value: '• Los mejores guerreros\n• Tácticas imbatibles\n• Dominio total del combate' },
                { name: `${emojis.farm} Farmeo`, value: '• Recursos infinitos\n• Granjas optimizadas\n• Eficiencia máxima' },
                { name: `${emojis.premium} Elite`, value: '• Miembros selectos\n• Calidad garantizada\n• Excelencia en todo' }
            )
            .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
            .setTimestamp();

        try {
            await message.reply({
            embeds: [ontopEmbed],
                files: ['./src/assets/Banner.gif']
        });
        } catch (error) {
            console.error('Error en el comando ontop:', error);
            const errorMsg = await message.reply('❌ Hubo un error al mostrar el poderío de The End.');
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
            setTimeout(() => message.delete().catch(console.error), 5000);
        }
    },
}; 