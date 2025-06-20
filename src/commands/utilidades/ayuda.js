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

        // --- COMANDOS DE UTILIDADES ---
        const utilidadesCommands = [
            { name: `${emojis.image} Avatar`, value: `\`${config.prefix}avatar @usuario\`\nMuestra el avatar de un usuario en alta resolución` },
            { name: `${emojis.user} User Info`, value: `\`${config.prefix}userinfo @usuario\`\nMuestra información detallada de un usuario` },
            { name: `${emojis.help} Ayuda`, value: `\`${config.prefix}ayuda\`\nMuestra esta lista de comandos` },
            { name: `${emojis.globe} Redes`, value: `\`${config.prefix}redes\` o \`${config.prefix}fan\`\nMuestra las redes sociales` },
            { name: `${emojis.title} Ontop`, value: `\`${config.prefix}ontop\`\nMuestra el poderío de The End` },
            { name: `${emojis.bot} Info Bot`, value: `\`${config.prefix}infobot\`\nMuestra información sobre el bot` },
            { name: `${emojis.server} Server Info`, value: `\`${config.prefix}serverinfo\`\nMuestra información sobre el servidor: miembros, canales, roles, fecha de creación, etc.` }

        ];
        const UTILIDADES_PER_PAGE = 6;
        function createUtilidadesEmbed(page = 0) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle(`${emojis.tools || '🛠️'} Comandos de Utilidades`)
                .setDescription('*Comandos útiles para todos los usuarios*')
                .setFooter({ text: `Página ${page + 1} de ${Math.ceil(utilidadesCommands.length / UTILIDADES_PER_PAGE)} • The End Utils - Tu asistente perfecto 💖` })
                .setTimestamp();
            const start = page * UTILIDADES_PER_PAGE;
            const end = start + UTILIDADES_PER_PAGE;
            embed.addFields(utilidadesCommands.slice(start, end));
            return embed;
        }
        // --- FIN COMANDOS DE UTILIDADES ---

        // --- PAGINACIÓN GLOBAL ---
        // Lista de comandos globales (nombre, descripción)
        const globalCommands = [
            { name: `${emojis.fun} Kunno`, value: `\`${config.prefix}kunno @usuario\`\nKunnoniza la imagen de perfil de un usuario` },
            { name: `${emojis.heart} Kiss`, value: `\`${config.prefix}kiss @usuario\`\nEnvía un beso a un usuario` },
            { name: '🇨🇴 Colombia', value: `\`${config.prefix}colombiano @usuario\` o \`${config.prefix}colombia @usuario\`\nColombianiza la imagen de perfil de un usuario con gorra, gafas y polvo blanco` },
            { name: '🕊️ Peru', value: `\`${config.prefix}peru @usuario\`\nPeruaniza la imagen de perfil de un usuario` },
            { name: '💀 Venezuela', value: `\`${config.prefix}venezuela @usuario\` o \`${config.prefix}veneco @usuario\`\nVenezolaniza la imagen de perfil de un usuario con efecto esqueleto` },
            { name: '🤪 Tonto', value: `\`${config.prefix}tonto @usuario\`, \`${config.prefix}bobo @usuario\`, \`${config.prefix}tonta @usuario\`, \`${config.prefix}boba @usuario\`\nTontoliza la imagen de perfil de un usuario con un gorro de burro y un toque divertido.` },
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
            { name: '👤 Random User', value: `\`${config.prefix}random-user\` o \`${config.prefix}userrandom\` o \`${config.prefix}randomuser\`\nMuestra información de un usuario aleatorio` },
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

        // --- COMANDOS NSFW ---
        const nsfwCommands = [
            { name: '🌸 Waifu', value: `\`${config.prefix}waifu\`\nDescubre una waifu que te hará perder la cabeza.` },
            { name: '🐱 Neko', value: `\`${config.prefix}neko\`\nUna neko traviesa aparece solo para ti, ¿te atreves a mirarla?` },
            { name: '🎭 Trap', value: `\`${config.prefix}trap\`\n¿Chico o chica? ¡Déjate sorprender por un trap irresistible!` },
            { name: '💋 Blowjob', value: `\`${config.prefix}blowjob\`\nAlguien está disfrutando mucho... ¿quieres ver quién?` },
            { name: '🍑 Anal', value: `\`${config.prefix}anal\`\nAtrévete a explorar el lado más prohibido del placer.` },
            { name: '💦 Cum', value: `\`${config.prefix}cum\`\n¡Momento explosivo! Alguien no pudo contenerse...` },
            { name: '🔥 Fuck', value: `\`${config.prefix}fuck\`\nLa pasión se desborda y aquí nadie se contiene.` },
            { name: '👅 Pussylick', value: `\`${config.prefix}pussylick\`\nUna lamida que hará temblar hasta al más valiente.` },
            { name: '😏 Solo', value: `\`${config.prefix}solo\`\nUna chica se divierte a solas... ¿la acompañas con la mirada?` },
            { name: '🍆 Solo Male', value: `\`${config.prefix}solo_male\`\nUn chico se entrega al placer en solitario, sin vergüenza.` },
            { name: '👩‍❤️‍👩‍❤️‍👩 Threesome FFF', value: `\`${config.prefix}threesome_fff\`\nTres chicas, una fantasía y mucha acción.` },
            { name: '🔥 Threesome FFM', value: `\`${config.prefix}threesome_ffm\`\nDos chicas y un chico, la mezcla perfecta para el caos.` },
            { name: '💪🍆 Threesome MMF', value: `\`${config.prefix}threesome_mmf\`\nDos chicos y una chica, la fiesta está asegurada.` },
            { name: '💙 Yaoi', value: `\`${config.prefix}yaoi\`\nAmor y pasión entre chicos, solo para corazones valientes.` },
            { name: '💕 Yuri', value: `\`${config.prefix}yuri\`\nDulzura y deseo entre chicas, un momento para disfrutar.` }
        ];
        const NSFW_PER_PAGE = 6;
        function createNsfwEmbed(page = 0) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('🔞 Comandos NSFW')
                .setDescription('*Solo disponibles en canales NSFW*')
                .setFooter({ text: `Página ${page + 1} de ${Math.ceil(nsfwCommands.length / NSFW_PER_PAGE)} • The End Utils - Tu asistente perfecto 💖` })
                .setTimestamp();
            const start = page * NSFW_PER_PAGE;
            const end = start + NSFW_PER_PAGE;
            embed.addFields(nsfwCommands.slice(start, end));
            return embed;
        }
        // --- FIN COMANDOS NSFW ---

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
                            { name: `${emojis.success} Pass`, value: `\`${config.prefix}pass <Nick> <@Discord> <Modo> <Resultado> <@Tester>\`\nAprueba a un usuario, genera embed con skin y reacciones` },
                            { name: `${emojis.error} No Pass`, value: `\`${config.prefix}nopass <Nick> <@Discord> <Modo> <Resultado> <@Tester>\`\nNo aprueba a un usuario, genera embed con skin y reacciones` },
                            { name: `${emojis.time} AFK`, value: `\`${config.prefix}afk @usuario\`\nMarca a un usuario como AFK y notifica al staff después de 10 minutos` },
                            { name: `${emojis.rules} Reglas`, value: `\`${config.prefix}reglas\`\nMuestra las reglas del test de ingreso` }
                        );
                    break;

                case 'utilidades':
                    return createUtilidadesEmbed(page);

                case 'global':
                    return createGlobalEmbed(page);

                case 'nsfw':
                    return createNsfwEmbed(page);

                case 'admin':
                    embed.setTitle(`${emojis.admin} Comandos de Administración`)
                        .setDescription('*Solo para administradores*')
                        .addFields(
                            { name: `${emojis.roles} Roles`, value: `\`${config.prefix}roles\`\nMuestra los roles permitidos para testing` },
                            { name: `${emojis.roles} Agregar Rol`, value: `\`${config.prefix}roles add @rol\`\nAgrega un rol a la lista de roles permitidos` },
                            { name: `${emojis.roles} Remover Rol`, value: `\`${config.prefix}roles remove @rol\`\nRemueve un rol de la lista de roles permitidos` },
                            { name: `${emojis.error} Clear`, value: `\`${config.prefix}clear <cantidad>\`\nBorra hasta 50 mensajes en el canal actual` },
                            { name: '🏰 KOTH', value: `\`${config.prefix}koth\`\nEnvía o actualiza el embed de horarios de KOTH en el canal correspondiente` },
                            { name: `${emojis.error} Spam`, value: `\`${config.prefix}spam \"frase\" cantidad\`\nEnvía una frase varias veces en el canal. Solo para admins. (máx 50 mensajes, máx 120 caracteres de frase)` },
                            { name: '🏓 Ping', value: `\`${config.prefix}ping\`\nMuestra la latencia del bot y de la API de Discord.` },
                            { name: '🔗 Invites', value: `\`${config.prefix}invites\`\nLista y resume todas las invitaciones activas del servidor (paginado, con banner).` },
                            { name: '👤 InvitesUser', value: `\`${config.prefix}invitesuser @usuario\`\nMuestra todas las invitaciones activas creadas por un usuario (paginado, con banner).` },
                            { name: 'ℹ️ InviteInfo', value: `\`${config.prefix}inviteinfo <código>\`\nMuestra información detallada de una invitación específica (con banner).` }
                        );
                    break;

                case 'info':
                    embed.setTitle(`${emojis.info} Información Adicional`)
                        .setDescription('• Los mensajes originales se eliminan automáticamente\n• El comando AFK notificará al staff después de 10 minutos\n• Los comandos NSFW solo funcionan en canales NSFW\n• Usa `??ayuda` para ver esta lista')
                        .addFields(
                            { name: `${emojis.title} Ontop`, value: `\`${config.prefix}ontop\`\nMuestra el poderío de The End` },
                            { name: `${emojis.bot} Info Bot`, value: `\`${config.prefix}infobot\`\nMuestra información sobre el bot` }
                        );
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
        function getRow(category, page, maxPage, utilPage = 0, maxUtilPage = 0, nsfwPage = 0, maxNsfwPage = 0) {
            if (category !== 'global' && category !== 'utilidades' && category !== 'nsfw') {
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
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_utilidades')
                            .setLabel('🛠️ Utilidades')
                            .setStyle(ButtonStyle.Danger)
                    );
                return [row1, row2];
            }
            if (category === 'utilidades') {
                return [new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('help_utilidades_prev')
                            .setLabel('⬅️ Anterior')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(utilPage === 0),
                        new ButtonBuilder()
                            .setCustomId('help_main')
                            .setLabel('🏠 Volver')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_utilidades_next')
                            .setLabel('Siguiente ➡️')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(utilPage === maxUtilPage)
                    )];
            }
            if (category === 'global') {
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
            if (category === 'nsfw') {
                return [new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('help_nsfw_prev')
                            .setLabel('⬅️ Anterior')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(nsfwPage === 0),
                        new ButtonBuilder()
                            .setCustomId('help_main')
                            .setLabel('🏠 Volver')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('help_nsfw_next')
                            .setLabel('Siguiente ➡️')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(nsfwPage === maxNsfwPage)
                    )];
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
        let utilPage = 0;
        const maxUtilPage = Math.ceil(utilidadesCommands.length / UTILIDADES_PER_PAGE) - 1;
        let nsfwPage = 0;
        const maxNsfwPage = Math.ceil(nsfwCommands.length / NSFW_PER_PAGE) - 1;

        try {
            // Enviar el mensaje inicial como respuesta
            const helpMessage = await message.reply({
                embeds: [createHelpEmbed('main')],
                components: getRow('main', 0, maxGlobalPage, 0, maxUtilPage, nsfwPage, maxNsfwPage),
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
                        components: getRow('global', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                if (interaction.customId === 'help_global_prev') {
                    globalPage = Math.max(globalPage - 1, 0);
                    await interaction.update({
                        embeds: [createHelpEmbed('global', globalPage)],
                        components: getRow('global', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                // Manejo de paginación utilidades
                if (interaction.customId === 'help_utilidades_next') {
                    utilPage = Math.min(utilPage + 1, maxUtilPage);
                    await interaction.update({
                        embeds: [createHelpEmbed('utilidades', utilPage)],
                        components: getRow('utilidades', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                if (interaction.customId === 'help_utilidades_prev') {
                    utilPage = Math.max(utilPage - 1, 0);
                    await interaction.update({
                        embeds: [createHelpEmbed('utilidades', utilPage)],
                        components: getRow('utilidades', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                // Manejo de paginación NSFW
                if (interaction.customId === 'help_nsfw_next') {
                    nsfwPage = Math.min(nsfwPage + 1, maxNsfwPage);
                    await interaction.update({
                        embeds: [createHelpEmbed('nsfw', nsfwPage)],
                        components: getRow('nsfw', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                if (interaction.customId === 'help_nsfw_prev') {
                    nsfwPage = Math.max(nsfwPage - 1, 0);
                    await interaction.update({
                        embeds: [createHelpEmbed('nsfw', nsfwPage)],
                        components: getRow('nsfw', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                    return;
                }
                let category = interaction.customId.split('_')[1];
                if (category === 'global') {
                    globalPage = 0;
                }
                if (category === 'utilidades') {
                    utilPage = 0;
                }
                if (category === 'nsfw') {
                    nsfwPage = 0;
                }
                if (category === 'main') {
                    await interaction.update({
                        embeds: [createHelpEmbed(category)],
                        components: getRow(category, globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: ['./src/assets/Banner.gif'],
                        attachments: []
                    });
                } else if (category === 'global') {
                    await interaction.update({
                        embeds: [createHelpEmbed('global', globalPage)],
                        components: getRow('global', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                } else if (category === 'utilidades') {
                    await interaction.update({
                        embeds: [createHelpEmbed('utilidades', utilPage)],
                        components: getRow('utilidades', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                } else if (category === 'nsfw') {
                    await interaction.update({
                        embeds: [createHelpEmbed('nsfw', nsfwPage)],
                        components: getRow('nsfw', globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
                        files: [],
                        attachments: []
                    });
                } else {
                    await interaction.update({
                        embeds: [createHelpEmbed(category)],
                        components: getRow(category, globalPage, maxGlobalPage, utilPage, maxUtilPage, nsfwPage, maxNsfwPage),
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