const config = require('../../config');
const styles = require('../../utils/styles');
const permissions = require('../../utils/permissions');
const errores = require('../../utils/errores');

module.exports = {
    name: 'roles',
    description: 'Administra los roles permitidos para comandos de testing',
    async execute(message, args, client) {
        const { emojis } = styles;

        // Verificar si el usuario es administrador
        if (!permissions.isAdmin(message.member)) {
            return message.reply(errores.SOLO_ADMIN);
        }

        // Si no hay argumentos, mostrar la lista de roles
        if (args.length === 0) {
            const roles = permissions.getTestingRoles(message.guild.id);
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
            return message.reply(errores.FALTA_ROL(`$${config.prefix}roles add @rol`));
        }

        switch (action) {
            case 'add':
                permissions.addTestingRole(message.guild.id, role.id);
                await message.reply(`✅ Rol ${role} agregado a la lista de roles permitidos.`);
                break;
            case 'remove':
                permissions.removeTestingRole(message.guild.id, role.id);
                await message.reply(`✅ Rol ${role} removido de la lista de roles permitidos.`);
                break;
            default:
                await message.reply(errores.ACCION_INVALIDA);
        }

        // Eliminar el mensaje original
        await message.delete();
    },
}; 