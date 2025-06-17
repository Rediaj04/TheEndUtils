const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');

module.exports = {
    name: '8ball',
    description: 'Responde a tus preguntas',
    async execute(message, args, client) {
        const { emojis } = styles;

        // Verificar si hay pregunta
        if (!args.length) {
            const errorMsg = await message.channel.send(`${emojis.error} Por favor, haz una pregunta.\nEjemplo: \`${config.prefix}8ball ¿Seré rico algún día?\``);
            await message.delete().catch(console.error);
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
            return;
        }

        // Respuestas posibles
        const respuestas = [
            'Sí, definitivamente ✨',
            'Es muy probable 💫',
            'Sin duda alguna 🌟',
            'Sí, sin duda ⭐',
            'Puedes confiar en ello 💫',
            'Como yo lo veo, sí ✨',
            'Lo más probable 🌟',
            'Perspectiva buena ⭐',
            'Las señales apuntan a que sí 💫',
            'No cuentes con ello ❌',
            'Mi respuesta es no ❌',
            'Mis fuentes dicen que no ❌',
            'Las perspectivas no son buenas ❌',
            'Muy dudoso ❌',
            'Pregunta de nuevo más tarde ⏳',
            'Mejor no decirte ahora ⏳',
            'No puedo predecirlo ahora ⏳',
            'Concéntrate y pregunta de nuevo ⏳'
        ];

        // Seleccionar respuesta aleatoria
        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

        const ballEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`${emojis.magic} 8Ball`)
            .addFields(
                { name: `${emojis.question} Pregunta`, value: args.join(' '), inline: false },
                { name: `${emojis.answer} Respuesta`, value: respuesta, inline: false }
            )
            .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
            .setTimestamp();

        await message.channel.send({ embeds: [ballEmbed] });
        await message.delete().catch(console.error);
    },
}; 