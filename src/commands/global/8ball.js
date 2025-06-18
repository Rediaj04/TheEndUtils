const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');

module.exports = {
    name: '8ball',
    description: 'Responde a tus preguntas',
    async execute(message, args, client) {
        const { emojis } = styles;

        // Verificar si hay pregunta
        if (!args.length) {
            const errorMsg = await message.channel.send(errores.USO_INCORRECTO(`${config.prefix}8ball ¿Seré rico algún día?`));
            await message.delete().catch(console.error);
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
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

        try {
            await message.channel.send({ embeds: [ballEmbed] });
            await message.delete().catch(console.error);
        } catch (error) {
            console.error(error);
            const errorMsg = await message.channel.send(errores.ERROR_DESCONOCIDO);
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 