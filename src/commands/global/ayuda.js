const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config');
const styles = require('../../utils/styles');
const errores = require('../../utils/errores');

module.exports = {
    name: 'ayuda',
    aliases: ['help'],
    description: 'Muestra los comandos útiles del test',
    async execute(message, args, client) {
        const { emojis } = styles;
        const user = message.mentions.users.first() || message.author;

        // --- PAGINACIÓN GLOBAL ---
        // Lista de comandos globales (nombre, descripción)
        const globalCommands = [
            { name: `${emojis.fun} Kunno`, value: `\`${config.prefix}kunno @usuario\`\nKunnoniza la imagen de perfil de un usuario` },
            { name: `${emojis.heart} Kiss`, value: `\`${config.prefix}kiss @usuario\`\nEnvía un beso a un usuario` },
            { name: '🇨🇴 Colombia', value: `\`${config.prefix}colombiano @usuario\` o \`${config.prefix}colombia @usuario\`\nColombianiza la imagen de perfil de un usuario con gorra, gafas y polvo blanco` },
            { name: '🕊️ Peru', value: `\`${config.prefix}peru @usuario\`\nPeruaniza la imagen de perfil de un usuario` },
            { name: `${emojis.image} Avatar`, value: `\`${config.prefix}avatar @usuario\`\nMuestra el avatar de un usuario en alta resolución` },
            { name: `${emojis.user} User Info`, value: `\`${config.prefix}userinfo @usuario\`\nMuestra información detallada de un usuario` },
            { name: `${emojis.magic} 8Ball`, value: `\`${config.prefix}8ball <pregunta>\`\nResponde a tus preguntas de forma aleatoria` },
            { name: `${emojis.title} Ontop`, value: `\`${config.prefix}ontop\`\nMuestra el poderío de The End` },
            { name: `${emojis.globe} Redes`, value: `\`${config.prefix}redes\` o \`${config.prefix}fan\`\nMuestra las redes sociales` },
            { name: `${emojis.bot} Info Bot`, value: `\`${config.prefix}infobot\`\nMuestra información sobre el bot` },
            { name: `${emojis.help} Ayuda`, value: `\`${config.prefix}ayuda\`\nMuestra esta lista de comandos` },
            { name: '💀 Venezuela', value: `\`${config.prefix}venezuela @usuario\` o \`${config.prefix}veneco @usuario\`\nVenezolaniza la imagen de perfil de un usuario con efecto esqueleto` },
            { name: '🤗 Hug', value: `\`${config.prefix}hug @usuario\` o \`${config.prefix}abrazar @usuario\`\nAbraza a un usuario` },
            { name: '👋 Slap', value: `\`${config.prefix}slap @usuario\` o \`${config.prefix}bofetada @usuario\`\nAbofetea a un usuario` },
            { name: '🫶 Pat', value: `\`${config.prefix}pat @usuario\` o \`${config.prefix}palmadita @usuario\`\nDa una palmadita a un usuario` },
            { name: '😡 Baka', value: `\`${config.prefix}baka @usuario\` o \`${config.prefix}tonto @usuario\`\nLlama tonto a un usuario` },
            { name: '🥊 Punch', value: `\`${config.prefix}punch @usuario\` o \`${config.prefix}puñetazo @usuario\`\nDa un puñetazo a un usuario` },
            { name: '😳 Blush', value: `\`${config.prefix}blush @usuario\` o \`${config.prefix}sonrojarse @usuario\`\nTe sonrojas o haces sonrojar a alguien` },
            { name: '😭 Cry', value: `\`${config.prefix}cry @usuario\` o \`${config.prefix}llorar @usuario\`\nLlora o hace llorar a alguien` },
            { name: '😂 Laugh', value: `\`${config.prefix}laugh @usuario\` o \`${config.prefix}reir @usuario\`\nRíe o hace reír a alguien` },
            { name: '👉 Poke', value: `\`${config.prefix}poke @usuario\` o \`${config.prefix}tocar @usuario\`\nToca a un usuario` },
            { name: '🫂 Cuddle', value: `\`${config.prefix}cuddle @usuario\` o \`${config.prefix}acurrucar @usuario\`\nAcurruca a un usuario` },
            { name: '👋 Wave', value: `\`${config.prefix}wave @usuario\` o \`${config.prefix}saludar @usuario\`\nSaluda a un usuario` },
            { name: '😉 Wink', value: `\`${config.prefix}wink @usuario\` o \`${config.prefix}guiñar @usuario\`\nGuiña a un usuario` },
            { name: '🤦 Facepalm', value: `\`${config.prefix}facepalm @usuario\` o \`${config.prefix}palmadacara @usuario\`\nPalmada en la cara (facepalm)` },
            { name: '🐶 Dog', value: `\`${config.prefix}dog\`\nMuestra una foto aleatoria de un perrito` },
            { name: '🐱 Cat', value: `\`${config.prefix}cat\` o \`${config.prefix}gato\` o \`${config.prefix}gata\`\nMuestra una foto aleatoria de un gatito` },
        ];
        const COMMANDS_PER_PAGE = 6;
        function createGlobalEmbed(page = 0) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle(`${emojis.help} Comandos Globales`)
                .setDescription('*Disponibles para todos los usuarios*')
                .setFooter({ text: `Página ${page + 1} de ${Math.ceil(globalCommands.length / COMMANDS_PER_PAGE)} • The End Utils - Tu asistente perfecto 💖` })
                .setTimestamp();
            const start = page * COMMANDS_PER_PAGE;
            const end = start + COMMANDS_PER_PAGE;
            embed.addFields(globalCommands.slice(start, end));
            return embed;
        }
        // --- FIN PAGINACIÓN GLOBAL ---

        // Función para crear el embed con la categoría seleccionada
        function createHelpEmbed(category = 'main', page = 0) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
                .setTimestamp();

            switch(category) {
                case 'main':
                    embed.setTitle(`${emojis.title} The End Utils ${emojis.title}`)
                        .setDescription('Bot de utilidades para The End Community\n\nSelecciona una categoría para ver los comandos disponibles:')
                        .setThumbnail(client.user.displayAvatarURL())
                        .setImage('attachment://Banner.gif');
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
                    return createGlobalEmbed(page);

                case 'nsfw':
                    embed.setTitle('🔞 Comandos NSFW')
                        .setDescription('*Solo disponibles en canales NSFW*')
                        .addFields(
                            { name: '🌸 Waifu', value: `\`${config.prefix}waifu\`\nMuestra una imagen de waifu` },
                            { name: '🐱 Neko', value: `\`${config.prefix}neko\`\nMuestra una imagen de neko` },
                            { name: '🎭 Trap', value: `\`${config.prefix}trap\`\nMuestra una imagen de trap` },
                            { name: '💋 Blowjob', value: `\`${config.prefix}blowjob\`\nMuestra una imagen de blowjob` }
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
                        .setDescription('• Los mensajes originales se eliminan automáticamente\n• El comando AFK notificará al staff después de 10 minutos\n• Los comandos NSFW solo funcionan en canales NSFW\n• Usa `??ayuda` para ver esta lista');
                    break;

                case 'minecraft':
                    embed.setTitle('⛏️ Comandos de Minecraft')
                        .setDescription('*Comandos útiles para jugadores de Minecraft en The End Community*')
                        .addFields(
                            { name: '⛏️ Tier', value: `\`${config.prefix}tier <usuario_minecraft>\`\nMuestra las tiers de un jugador de Minecraft usando la API de McTiers.` },
                            { name: '⛏️ Tier v2', value: `\`${config.prefix}tierv2 <usuario_minecraft>\`\nMuestra las tiers v2 de un jugador de Minecraft usando la API de McTiers.io (Crystal, Elytra, etc).` },
                            { name: '🧠 NameHistory', value: `\`${config.prefix}namehistory <usuario>\`\nMuestra el historial de nombres de un jugador de Minecraft usando la API de Crafty.gg.` }
                        );
                    break;
            }

            return embed;
        }

        // Crear los botones
        function getRow(category, page, maxPage) {
            if (category !== 'global') {
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('help_main')
                            .setLabel('🏠 Principal')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_global')
                            .setLabel('🌐 Globales')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_nsfw')
                            .setLabel('🔞 NSFW')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_minecraft')
                            .setLabel('⛏️ Minecraft')
                            .setStyle(ButtonStyle.Danger)
                    );
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('help_testing')
                            .setLabel('🧪 Testing')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_admin')
                            .setLabel('🛡️ Admin')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_info')
                            .setLabel('ℹ️ Info')
                            .setStyle(ButtonStyle.Danger)
                    );
                return [row1, row2];
            }
            // Solo para global: paginación y volver
            return [new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('help_global_prev')
                        .setLabel('⬅️ Anterior')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(page === 0),
                    new ButtonBuilder()
                        .setCustomId('help_main')
                        .setLabel('🏠 Volver')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId('help_global_next')
                        .setLabel('Siguiente ➡️')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(page === maxPage)
                )];
        }

        let globalPage = 0;
        const maxGlobalPage = Math.ceil(globalCommands.length / COMMANDS_PER_PAGE) - 1;

        try {
            // Enviar el mensaje inicial como respuesta
            const helpMessage = await message.reply({
                embeds: [createHelpEmbed('main')],
                components: getRow('main', 0, maxGlobalPage),
                files: ['./src/assets/Banner.gif']
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
                // Manejo de paginación global
                if (interaction.customId === 'help_global_next') {
                    globalPage = Math.min(globalPage + 1, maxGlobalPage);
                    await interaction.update({
                        embeds: [createHelpEmbed('global', globalPage)],
                        components: getRow('global', globalPage, maxGlobalPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                if (interaction.customId === 'help_global_prev') {
                    globalPage = Math.max(globalPage - 1, 0);
                    await interaction.update({
                        embeds: [createHelpEmbed('global', globalPage)],
                        components: getRow('global', globalPage, maxGlobalPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                let category = interaction.customId.split('_')[1];
                if (category === 'global') {
                    globalPage = 0;
                }
                if (category === 'main') {
                    await interaction.update({
                        embeds: [createHelpEmbed(category)],
                        components: getRow(category, globalPage, maxGlobalPage),
                        files: ['./src/assets/Banner.gif'],
                        attachments: []
                    });
                } else if (category === 'global') {
                    await interaction.update({
                        embeds: [createHelpEmbed('global', globalPage)],
                        components: getRow('global', globalPage, maxGlobalPage),
                        files: [],
                        attachments: []
                    });
                } else {
                    await interaction.update({
                        embeds: [createHelpEmbed(category)],
                        components: getRow(category, globalPage, maxGlobalPage),
                        files: [],
                        attachments: []
                    });
                }
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