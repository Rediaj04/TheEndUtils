const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');

module.exports = {
    name: 'reglas',
    description: 'Muestra las reglas del test de ingreso',
    async execute(message, args, client) {
        const { emojis } = styles;
        const user = message.mentions.users.first() || message.author;

        const reglasEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`${emojis.rules} Reglas del Test de Ingreso`)
            .setDescription('Para aprobar el test de ingreso, debes cumplir con las siguientes reglas:')
            .addFields(
                { name: `${emojis.pvp} PvP`, value: '• Debes tener experiencia en PvP\n• Saber usar el escudo\n• Tener buenos reflejos\n• Conocer las mecánicas de combate' },
                { name: `${emojis.farm} Farmeo`, value: '• Saber farmear recursos\n• Conocer las mejores técnicas\n• Ser eficiente en la recolección\n• Tener experiencia en granjas' },
                { name: `${emojis.java} Java`, value: '• Tener Java instalado\n• Saber usar mods\n• Conocer los comandos básicos\n• Tener buena conexión' },
                { name: `${emojis.bedrock} Bedrock`, value: '• Tener Bedrock instalado\n• Saber usar addons\n• Conocer los comandos básicos\n• Tener buena conexión' },
                { name: `${emojis.premium} Premium`, value: '• Tener cuenta premium\n• No usar cuentas alternativas\n• No compartir cuenta\n• No usar hacks' },
                { name: `${emojis.age} Edad`, value: '• Ser mayor de 13 años\n• Tener madurez\n• Saber comportarse\n• Respetar a los demás' },
                { name: `${emojis.hours} Horas`, value: '• Tener al menos 100 horas\n• Conocer el juego\n• Tener experiencia\n• Saber jugar' }
            )
            .setFooter({ text: `Solicitado por ${user.username}`, iconURL: user.displayAvatarURL() })
            .setTimestamp();

        await message.channel.send({ embeds: [reglasEmbed] });
        await message.delete().catch(console.error);
    },
}; 