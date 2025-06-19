const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const permissions = require('../../utils/permissions');

// ID del canal fijo para los KOTH
const KOTH_CHANNEL_ID = '1378398709758427196';
// Ruta al archivo JSON donde se guarda el mensaje
const KOTH_JSON_PATH = path.join(__dirname, '../../utils/koth_message.json');
// Horarios fijos de KOTH (hora española, 24h)
const KOTH_HORAS = [22, 0, 2, 16, 18];

// Función para obtener la próxima hora de actualización
function getNextUpdateTimestamp() {
    const now = new Date();
    const today = new Date(now);
    let minDiff = Infinity;
    for (const hora of KOTH_HORAS) {
        let kothDate = new Date(today);
        kothDate.setHours(hora, 0, 0, 0);
        if (hora < now.getHours() || (hora === now.getHours() && now.getMinutes() > 0)) {
            kothDate.setDate(kothDate.getDate() + 1); // Siguiente día
        }
        const diff = kothDate - now;
        if (diff > 0 && diff < minDiff) minDiff = diff;
    }
    // Si no hay próximos, actualizar en 1 hora por seguridad
    return minDiff === Infinity ? 60 * 60 * 1000 : minDiff + 1000;
}

// Función para obtener los horarios de KOTH como campos del embed
function getKothFields() {
    const now = new Date();
    const today = new Date(now);
    const fields = [];
    const banderaEsp = ':flag_es:';
    const kothEmojis = ['🕙', '🕛', '🕑', '🕓', '🕕'];
    for (let i = 0; i < KOTH_HORAS.length; i++) {
        const hora = KOTH_HORAS[i];
        let kothDate = new Date(today);
        kothDate.setHours(hora, 0, 0, 0);
        // Si la hora ya pasó hoy, mostrar para mañana
        if (kothDate < now) kothDate.setDate(kothDate.getDate() + 1);
        const timestamp = Math.floor(kothDate.getTime() / 1000);
        if (kothDate > now) {
            fields.push({
                name: `${kothEmojis[i % kothEmojis.length]} KOTH a las ${hora.toString().padStart(2, '0')}:00 ${banderaEsp} (hora España)`,
                value: `⏰ <t:${timestamp}:R>`,
                inline: false
            });
        }
    }
    return fields;
}

// Función para crear el embed de KOTH
function crearKothEmbed(client) {
    const fields = getKothFields();
    return new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🏰 Horarios de KOTH - WorldBox Spook')
        .setDescription('**¡Consulta aquí los próximos horarios de KOTH!**\n\nLos horarios se adaptan a tu zona horaria automáticamente.\n\n Todos los horarios son en hora de España (Madrid)')
        .setThumbnail('attachment://Logo.gif')
        .setImage('attachment://koth.gif')
        .addFields(fields)
        .setFooter({ text: 'The End Utils - KOTH', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();
}

// Guardar info del mensaje en JSON
function guardarMensajeKoth(data) {
    fs.writeFileSync(KOTH_JSON_PATH, JSON.stringify(data, null, 2));
}
// Leer info del mensaje en JSON
function leerMensajeKoth() {
    if (!fs.existsSync(KOTH_JSON_PATH)) return null;
    return JSON.parse(fs.readFileSync(KOTH_JSON_PATH));
}

// Función para actualizar el mensaje automáticamente
async function actualizarKothEmbed(client) {
    const data = leerMensajeKoth();
    if (!data) return;
    try {
        const canal = await client.channels.fetch(data.channelId);
        if (!canal) return;
        const mensaje = await canal.messages.fetch(data.messageId);
        if (!mensaje) return;
        const embed = crearKothEmbed(client);
        const files = [
            new AttachmentBuilder(path.join(__dirname, '../../assets/Logo.gif'), { name: 'Logo.gif' }),
            new AttachmentBuilder(path.join(__dirname, '../../assets/koth.gif'), { name: 'koth.gif' })
        ];
        await mensaje.edit({ embeds: [embed], files });
    } catch (e) {
        // Si el mensaje fue borrado, elimina el JSON
        if (fs.existsSync(KOTH_JSON_PATH)) fs.unlinkSync(KOTH_JSON_PATH);
    }
    // Programa la siguiente actualización
    setTimeout(() => actualizarKothEmbed(client), getNextUpdateTimestamp());
}

module.exports = {
    name: 'koth',
    description: 'Muestra los horarios de KOTH (solo admins)',
    async execute(message, args, client) {
        // Solo admins (usando la función global)
        if (!permissions.isAdmin(message.member)) {
            return message.reply('❌ Solo administradores pueden usar este comando.');
        }
        // Si ya existe mensaje, edítalo en el canal KOTH
        let data = leerMensajeKoth();
        let sentMsg;
        const embed = crearKothEmbed(client);
        const files = [
            new AttachmentBuilder(path.join(__dirname, '../../assets/Logo.gif'), { name: 'Logo.gif' }),
            new AttachmentBuilder(path.join(__dirname, '../../assets/koth.gif'), { name: 'koth.gif' })
        ];
        const kothChannel = await client.channels.fetch(KOTH_CHANNEL_ID);
        if (data) {
            try {
                const canal = await client.channels.fetch(data.channelId);
                const mensaje = await canal.messages.fetch(data.messageId);
                await mensaje.edit({ embeds: [embed], files });
                sentMsg = mensaje;
            } catch (e) {
                // Si el mensaje fue borrado, envía uno nuevo
                sentMsg = await kothChannel.send({ embeds: [embed], files });
            }
        } else {
            sentMsg = await kothChannel.send({ embeds: [embed], files });
        }
        // Guarda el mensaje
        guardarMensajeKoth({ channelId: sentMsg.channel.id, messageId: sentMsg.id });
        // Inicia el sistema de actualización automática si no está corriendo
        if (!client.kothUpdater) {
            client.kothUpdater = true;
            setTimeout(() => actualizarKothEmbed(client), getNextUpdateTimestamp());
        }
        const infoMsg = await message.reply('✅ Embed de KOTH enviado/actualizado correctamente.');
        await message.delete().catch((err) => {
            console.error('Error al borrar el mensaje original del comando KOTH:', err);
        });
        setTimeout(() => {
            infoMsg.delete().catch((err) => {
                console.error('Error al borrar el mensaje informativo de KOTH:', err);
            });
        }, 5000);
    }
}; 