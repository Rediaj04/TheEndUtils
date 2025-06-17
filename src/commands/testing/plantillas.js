const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'plantillas',
    aliases: ['plantilla'],
    description: 'Muestra el formulario de TheEnd',
    async execute(message, args, client) {
        // Verificar permisos
        if (!permissions.canUseTesting(message.member)) {
            return message.reply('No tienes permisos para usar este comando.');
        }

        const { emojis } = styles;
        const user = message.mentions.users.first() || message.author;
        
        const plantillaMessage = `${emojis.separator}
${emojis.title} **FORMULARIO DE THE END** ${emojis.title}
${emojis.separator}

${emojis.user} **Nick de Minecraft:**
R:

${emojis.server} **¿En qué plataformas juegas? (Bedrock/Java):**
R:

${emojis.premium} **¿Eres premium? (Bedrock/Java):**
R:

${emojis.age} **¿Cuántos años tienes?:**
R:

${emojis.pvp} **¿Farmeas o haces PvP?:**
R:

${emojis.hours} **¿Cuántas horas sueles jugar al día?:**
R:

${emojis.server} **¿Qué servidores juegas?:**
R:

${emojis.mic} **¿Cuentas con micrófono?:**
R:

${emojis.invite} **¿Quién te invitó al clan o te reclutó? (Adjunta imagen de la invitación):**
R:

${emojis.pvp} **¿Cuál es tu modo favorito de PvP o en el que más juegas/desempeñas?:**
R:

${emojis.separator}
${emojis.info} Se te hará una prueba de PvP después de responder estas preguntas y, si es el caso, un posible SS.
${emojis.separator}

||<@&1227989693346484366>||`;

        await message.channel.send(`${plantillaMessage}\n\n||${user}||`);
        await message.delete();
    },
}; 