require('dotenv').config();

module.exports = {
    prefix: '??',
    token: process.env.DISCORD_TOKEN,
    testingRoles: [
        '1227460757524975678', // ID del rol de testing
        '1227460757524975679'  // ID del rol de administrador
    ],
    adminRoles: [
        '1227460757524975679'  // ID del rol de administrador
    ]
}; 