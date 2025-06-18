// const { EmbedBuilder } = require('discord.js');
// const fetch = require('node-fetch');
// 
// module.exports = {
//     name: 'namehistory',
//     aliases: [],
//     description: 'Muestra el historial de nombres de un jugador de Minecraft',
//     usage: 'namehistory <usuario>',
//     async execute(message, args) {
//         const username = args[0];
//         if (!username) return message.reply('❌ Debes especificar el nombre de usuario de Minecraft.');
//         const url = `https://api.crafty.gg/api/v2/players/${encodeURIComponent(username)}`;
//         try {
//             const res = await fetch(url);
//             const text = await res.text();
//             let data;
//             try {
//                 data = JSON.parse(text);
//             } catch (jsonErr) {
//                 if (text.includes('cloudflare') || text.includes('<html') || text.includes('Attention Required')) {
//                     return message.reply('❌ La API de Crafty.gg está protegida por Cloudflare y ha bloqueado la petición. Intenta más tarde o contacta con el staff si el problema persiste.');
//                 }
//                 console.error('Respuesta no JSON:', text);
//                 return message.reply('❌ La API de Crafty.gg no respondió correctamente (no es JSON):\n```' + text.slice(0, 500) + '```');
//             }
//             if (!res.ok || !data.success) {
//                 return message.reply(`❌ ${data && data.message ? data.message : 'No se encontró el usuario o la API está caída.'}`);
//             }
//             const history = (data.data.usernames || [])
//                 .filter(h => h.changed_at)
//                 .sort((a, b) => new Date(b.changed_at) - new Date(a.changed_at));
//             const embed = new EmbedBuilder()
//                 .setColor('#FF0000')
//                 .setTitle(`🧠 Name History de ${data.data.username}`)
//                 .setDescription(history.length > 0
//                     ? history.map(h => `**${h.username}**\n<t:${Math.floor(new Date(h.changed_at).getTime()/1000)}:f>`).join('\n\n')
//                     : 'No hay historial de nombres disponible.')
//                 .setFooter({ text: `UUID: ${data.data.uuid}` });
//             await message.reply({ embeds: [embed] });
//         } catch (err) {
//             console.error(err);
//             return message.reply('❌ No se pudo conectar con la API de Crafty.gg. Intenta más tarde.');
//         }
//     },
// }; 

module.exports = {
    name: 'namehistory',
    aliases: [],
    description: 'Muestra el historial de nombres de un jugador de Minecraft',
    usage: 'namehistory <usuario>',
    async execute(message, args) {
        return message.reply('⚠️ El comando está en mantenimiento. Por favor, inténtalo más tarde.');
    },
}; 