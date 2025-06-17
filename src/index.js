require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// Función para cargar comandos de una carpeta
function loadCommands(folder) {
    const commandsPath = path.join(__dirname, 'commands', folder);
    if (!fs.existsSync(commandsPath)) return;

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.name, command);
    }
}

// Cargar comandos de todas las carpetas
loadCommands('global');
loadCommands('testing');
loadCommands('admin');

client.on('ready', () => {
    console.log(`Bot iniciado como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        await message.reply('¡Hubo un error al ejecutar el comando!');
    }
});

client.login(config.token); 