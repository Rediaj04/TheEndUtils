const config = require('../config');
const fs = require('fs');
const path = require('path');

const TESTING_ROLES_PATH = path.join(__dirname, 'testing_roles.json');

// Leer roles de testing desde el JSON
function readTestingRoles() {
    if (!fs.existsSync(TESTING_ROLES_PATH)) return {};
    return JSON.parse(fs.readFileSync(TESTING_ROLES_PATH));
}
// Guardar roles de testing en el JSON
function writeTestingRoles(data) {
    fs.writeFileSync(TESTING_ROLES_PATH, JSON.stringify(data, null, 2));
}

module.exports = {
    // Verificar si un usuario tiene permisos de administrador
    isAdmin: (member) => {
        return member.permissions.has('Administrator');
    },

    // Verificar si un usuario tiene permisos para comandos de testing
    canUseTesting: (member) => {
        if (member.permissions.has('Administrator')) return true;
        const rolesData = readTestingRoles();
        const guildRoles = rolesData[member.guild.id] || [];
        return member.roles.cache.some(role => guildRoles.includes(role.id));
    },

    // Agregar un rol a la lista de roles permitidos para testing
    addTestingRole: (guildId, roleId) => {
        const rolesData = readTestingRoles();
        if (!rolesData[guildId]) rolesData[guildId] = [];
        if (!rolesData[guildId].includes(roleId)) rolesData[guildId].push(roleId);
        writeTestingRoles(rolesData);
    },

    // Remover un rol de la lista de roles permitidos para testing
    removeTestingRole: (guildId, roleId) => {
        const rolesData = readTestingRoles();
        if (!rolesData[guildId]) return;
        rolesData[guildId] = rolesData[guildId].filter(id => id !== roleId);
        writeTestingRoles(rolesData);
    },

    // Obtener la lista de roles permitidos para testing en un guild
    getTestingRoles: (guildId) => {
        const rolesData = readTestingRoles();
        return rolesData[guildId] || [];
    }
}; 