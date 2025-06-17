require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember]
});

// Cargar comandos
client.commands = new Map();
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, 'commands', folder, file));
        client.commands.set(command.name, command);
    }
}

// Evento cuando el bot está listo
client.once('ready', () => {
    console.log(`Bot iniciado como ${client.user.tag}`);
});

// Evento para cuando se menciona al bot
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // Verificar si el bot fue mencionado
    if (message.mentions.has(client.user)) {
        const prefixEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(`💖 **¡Hola ${message.author}!**\n\nMi prefix actual es: \`${config.prefix}\`\n\nUsa \`${config.prefix}ayuda\` para ver todos mis comandos.`)
            .setFooter({ text: 'The End Utils - Tu asistente perfecto 💖' })
            .setTimestamp();

        await message.reply({ embeds: [prefixEmbed] });
        return;
    }

    // Procesar comandos
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('❌ Hubo un error al ejecutar el comando.').then(msg => {
            setTimeout(() => msg.delete().catch(console.error), 5000);
        });
    }
});

client.login(config.token); 