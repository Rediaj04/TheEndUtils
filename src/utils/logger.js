const { EmbedBuilder } = require('discord.js');

const LOG_CHANNEL_ID = '1384905115617591380';

async function logCommand({ client, message, commandName, args }) {
    const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
        .setColor('#7289DA')
        .setTitle('📝 Comando ejecutado')
        .addFields(
            { name: 'Comando', value: `\`${commandName}\``, inline: true },
            { name: 'Usuario', value: `${message.author} (\`${message.author.id}\`)`, inline: true },
            { name: 'Canal', value: `${message.channel} (\`${message.channel.id}\`)`, inline: true },
            { name: 'Argumentos', value: args.length ? args.join(' ') : 'Ninguno', inline: false }
        )
        .setTimestamp();

    logChannel.send({ embeds: [embed] }).catch(() => {});
}

module.exports = { logCommand }; 