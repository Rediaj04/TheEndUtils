const config = require('../config');

// Roles que pueden ejecutar comandos de testing
let testingRoles = new Set();

module.exports = {
    // Verificar si un usuario tiene permisos de administrador
    isAdmin: (member) => {
        return member.permissions.has('Administrator');
    },

    // Verificar si un usuario tiene permisos para comandos de testing
    canUseTesting: (member) => {
        return member.permissions.has('Administrator') || 
               member.roles.cache.some(role => testingRoles.has(role.id));
    },

    // Agregar un rol a la lista de roles permitidos para testing
    addTestingRole: (roleId) => {
        testingRoles.add(roleId);
    },

    // Remover un rol de la lista de roles permitidos para testing
    removeTestingRole: (roleId) => {
        testingRoles.delete(roleId);
    },

    // Obtener la lista de roles permitidos para testing
    getTestingRoles: () => {
        return Array.from(testingRoles);
    }
}; 