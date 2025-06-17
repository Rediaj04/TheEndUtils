const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');

module.exports = {
    name: 'roles',
    description: 'Administra los roles permitidos para comandos de testing',
    async execute(message, args, client) {
        const { emojis } = styles;

        // Verificar si el usuario es administrador
        if (!permissions.isAdmin(message.member)) {
            return message.reply('❌ Solo los administradores pueden usar este comando.');
        }

        // Si no hay argumentos, mostrar la lista de roles
        if (args.length === 0) {
            const roles = permissions.getTestingRoles();
            const rolesList = roles.length > 0 
                ? roles.map(id => `<@&${id}>`).join('\n')
                : 'No hay roles configurados';

            const rolesMessage = `${emojis.separator}
${emojis.info} **Roles Permitidos para Testing** ${emojis.info}

${rolesList}

${emojis.separator}
Uso:
\`${config.prefix}roles add @rol\` - Agregar rol
\`${config.prefix}roles remove @rol\` - Remover rol
${emojis.separator}`;

            return message.channel.send(rolesMessage);
        }

        // Procesar el comando
        const action = args[0].toLowerCase();
        const role = message.mentions.roles.first();

        if (!role) {
            return message.reply('❌ Por favor, menciona un rol.');
        }

        switch (action) {
            case 'add':
                permissions.addTestingRole(role.id);
                await message.reply(`✅ Rol ${role} agregado a la lista de roles permitidos.`);
                break;
            case 'remove':
                permissions.removeTestingRole(role.id);
                await message.reply(`✅ Rol ${role} removido de la lista de roles permitidos.`);
                break;
            default:
                await message.reply('❌ Acción no válida. Usa `add` o `remove`.');
        }

        // Eliminar el mensaje original
        await message.delete();
    },
}; 