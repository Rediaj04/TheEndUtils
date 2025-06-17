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

        await message.channel.send({
            embeds: [ontopEmbed],
            files: ['./Banner.gif']
        });
        await message.delete().catch(console.error);
    },
}; 