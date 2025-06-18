const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');

module.exports = {
    name: 'reglas',
    description: 'Muestra las reglas del test de ingreso',
    async execute(message, args, client) {
        try {
            const { emojis } = styles;
            const user = message.mentions.users.first() || message.author;

            // Verificar si el usuario tiene permisos de administrador
            if (!message.member.permissions.has('Administrator')) {
                const errorMsg = await message.reply(errores.SOLO_ADMIN + ' Solo los administradores pueden ver las reglas.');
                setTimeout(() => errorMsg.delete().catch(console.error), 5000);
                return;
            }

            const reglasMessage = `${emojis.separator}
${emojis.rules} **REGLAS PARA INGRESAR AL CLAN** ${emojis.rules}
${emojis.separator}

${emojis.success} **Formas de Aprobar el Test** ${emojis.success}

1. ${emojis.pvp} Si tienes un nivel muy alto, puedes ser aceptado incluso si pierdes.
2. ${emojis.success} Si ganas 3 rondas al tester, entras directamente.

${emojis.error} **Fallo Automático** ${emojis.error}
• Si pierdes **3 rondas seguidas con marcador 3-0**, el test termina y es considerado fallido.

${emojis.time} **Test Prolongado** ${emojis.time}
• Si el marcador es, por ejemplo, 3-1, el test sigue.
• El test continúa hasta que:
  ${emojis.success} Tú ganas **3 rondas** → PASAS
  ${emojis.error} El tester gana **5 rondas** → FALLAS

${emojis.test} **Formato de Rondas** ${emojis.test}

1️⃣ Primera ronda: *Combo sin runear*
2️⃣ Segunda ronda: *Combo runeando*
3️⃣ Tercera ronda: *Trade normal*
4️⃣ y siguientes: *Trade libre*

${emojis.separator}
${emojis.info} Usa el comando \`${config.prefix}reglas\` cuando quieras consultarlas.
${emojis.separator}

💖 *The End - Donde los mejores se unen* 💖`;

            await message.channel.send(`${reglasMessage}\n\n||${user}||`);
            await message.delete().catch(console.error);
        } catch (error) {
            console.error('Error en el comando reglas:', error);
            message.reply(errores.ERROR_DESCONOCIDO + ' Por favor, intenta de nuevo más tarde.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 5000);
            });
        }
    },
}; 