const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');

module.exports = {
    name: 'ayuda',
    description: 'Muestra los comandos útiles del test',
    async execute(message, args, client) {
        const { emojis } = styles;
        const user = message.mentions.users.first() || message.author;

        // Función para crear el embed con la categoría seleccionada
        function createHelpEmbed(category = 'main') {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
                .setTimestamp();

            switch(category) {
                case 'main':
                    embed.setTitle(`${emojis.title} The End Utils ${emojis.title}`)
                        .setDescription('Bot de utilidades para The End Community\n\nSelecciona una categoría para ver los comandos disponibles:')
                        .setThumbnail(client.user.displayAvatarURL());
                    break;

                case 'testing':
                    embed.setTitle(`${emojis.help} Comandos de Testing`)
                        .setDescription('*Requieren rol de testing o ser administrador*')
                        .addFields(
                            { name: `${emojis.form} Plantillas`, value: `\`${config.prefix}plantillas\`\nMuestra el formulario de solicitud para el clan` },
                            { name: `${emojis.test} Test`, value: `\`${config.prefix}test @usuario\`\nMuestra el mensaje de finalización del test` },
                            { name: `${emojis.success} Pass`, value: `\`${config.prefix}pass @usuario\`\nNotifica que el jugador ha aprobado` },
                            { name: `${emojis.error} No Pass`, value: `\`${config.prefix}nopass @usuario\`\nNotifica que el jugador no ha aprobado` },
                            { name: `${emojis.time} AFK`, value: `\`${config.prefix}afk @usuario\`\nMarca a un usuario como AFK y notifica al staff después de 10 minutos` },
                            { name: `${emojis.rules} Reglas`, value: `\`${config.prefix}reglas\`\nMuestra las reglas del test de ingreso` }
                        );
                    break;

                case 'global':
                    embed.setTitle(`${emojis.help} Comandos Globales`)
                        .setDescription('*Disponibles para todos los usuarios*')
                        .addFields(
                            { name: `${emojis.fun} Kunno`, value: `\`${config.prefix}kunno @usuario\`\nKunnoniza la imagen de perfil de un usuario` },
                            { name: `${emojis.heart} Kiss`, value: `\`${config.prefix}kiss @usuario\`\nEnvía un beso a un usuario` },
                            { name: `${emojis.image} Avatar`, value: `\`${config.prefix}avatar @usuario\`\nMuestra el avatar de un usuario en alta resolución` },
                            { name: `${emojis.user} User Info`, value: `\`${config.prefix}userinfo @usuario\`\nMuestra información detallada de un usuario` },
                            { name: `${emojis.magic} 8Ball`, value: `\`${config.prefix}8ball <pregunta>\`\nResponde a tus preguntas de forma aleatoria` },
                            { name: `${emojis.title} Ontop`, value: `\`${config.prefix}ontop\`\nMuestra el poderío de The End` },
                            { name: `${emojis.globe} Redes`, value: `\`${config.prefix}redes\` o \`${config.prefix}fan\`\nMuestra las redes sociales` },
                            { name: `${emojis.bot} Info Bot`, value: `\`${config.prefix}infobot\`\nMuestra información sobre el bot` },
                            { name: `${emojis.help} Ayuda`, value: `\`${config.prefix}ayuda\`\nMuestra esta lista de comandos` }
                        );
                    break;

                case 'admin':
                    embed.setTitle(`${emojis.admin} Comandos de Administración`)
                        .setDescription('*Solo para administradores*')
                        .addFields(
                            { name: `${emojis.roles} Roles`, value: `\`${config.prefix}roles\`\nMuestra los roles permitidos para testing` },
                            { name: `${emojis.roles} Agregar Rol`, value: `\`${config.prefix}roles add @rol\`\nAgrega un rol a la lista de roles permitidos` },
                            { name: `${emojis.roles} Remover Rol`, value: `\`${config.prefix}roles remove @rol\`\nRemueve un rol de la lista de roles permitidos` },
                            { name: `${emojis.error} Clear`, value: `\`${config.prefix}clear <cantidad>\`\nBorra hasta 50 mensajes en el canal actual` }
                        );
                    break;

                case 'info':
                    embed.setTitle(`${emojis.info} Información Adicional`)
                        .setDescription('• Los mensajes originales se eliminan automáticamente\n• El comando AFK notificará al staff después de 10 minutos\n• Usa `??ayuda` para ver esta lista');
                    break;
            }

            return embed;
        }

        // Crear los botones
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('help_main')
                    .setLabel('Principal')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('help_testing')
                    .setLabel('Testing')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('help_global')
                    .setLabel('Globales')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('help_admin')
                    .setLabel('Admin')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('help_info')
                    .setLabel('Info')
                    .setStyle(ButtonStyle.Danger)
            );

        try {
            // Enviar el mensaje inicial como respuesta
            const helpMessage = await message.reply({
                embeds: [createHelpEmbed('main')],
                components: [row]
            });

            // Crear el colector de botones
            const collector = helpMessage.createMessageComponentCollector({
                time: 300000 // 5 minutos
            });

            collector.on('collect', async (interaction) => {
                if (interaction.user.id !== message.author.id) {
                    return interaction.reply({
                        content: errores.SOLO_AUTOR,
                        ephemeral: true
                    });
                }

                const category = interaction.customId.split('_')[1];
                await interaction.update({
                    embeds: [createHelpEmbed(category)],
                    components: [row]
                });
            });

            collector.on('end', () => {
                helpMessage.edit({
                    components: []
                }).catch(console.error);
            });
        } catch (error) {
            console.error('Error en el comando ayuda:', error);
            const errorMsg = await message.reply('❌ Hubo un error al mostrar la ayuda.');
            setTimeout(() => errorMsg.delete().catch(console.error), 5000);
            setTimeout(() => message.delete().catch(console.error), 5000);
        }
    },
}; 