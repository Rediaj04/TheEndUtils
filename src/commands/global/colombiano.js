const { createCanvas, loadImage } = require('canvas');
const config = require('../../config');
const errores = require('../../utils/errores');
const path = require('path');

module.exports = {
    name: 'colombiano',
    aliases: ['colombia'],
    description: 'Colombianiza la imagen de perfil de un usuario con gorra, gafas y polvo blanco',
    async execute(message, args) {
        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}colombiano @usuario`));
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            return;
        }

        try {
            // Cargar la imagen de perfil del usuario
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));
            const canvas = createCanvas(avatar.width, avatar.height);
            const ctx = canvas.getContext('2d');

            // Fondo blanco
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Dibujar el avatar encima del fondo blanco
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

            // Cargar assets
            const gorra = await loadImage(path.join(__dirname, '../../assets/gorra_colombia.png'));
            const gafas = await loadImage(path.join(__dirname, '../../assets/gafas_colombia.png'));
            const polvo = await loadImage(path.join(__dirname, '../../assets/polvo_colombia.png'));

            // Superponer gorra (arriba, centrada)
            const gorraWidth = canvas.width * 0.7;
            const gorraHeight = gorra.height * (gorraWidth / gorra.width);
            ctx.drawImage(gorra, (canvas.width - gorraWidth) / 2, canvas.height * 0.02, gorraWidth, gorraHeight);

            // Superponer gafas (sobre los ojos, centradas)
            const gafasWidth = canvas.width * 0.55;
            const gafasHeight = gafas.height * (gafasWidth / gafas.width);
            ctx.drawImage(gafas, (canvas.width - gafasWidth) / 2, canvas.height * 0.38, gafasWidth, gafasHeight);

            // Superponer polvo blanco (abajo a la derecha)
            const polvoWidth = canvas.width * 0.22;
            const polvoHeight = polvo.height * (polvoWidth / polvo.width);
            ctx.drawImage(polvo, canvas.width - polvoWidth - 18, canvas.height - polvoHeight - 18, polvoWidth, polvoHeight);

            // Texto principal: "Colombianizado 🇨🇴"
            ctx.font = 'bold 30px Arial';
            ctx.fillStyle = '#1b9e1b'; // Verde bandera
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 6;
            ctx.fillText('Colombianizado 🇨🇴', canvas.width / 2, canvas.height * 0.82);
            ctx.shadowBlur = 0;

            // Borde decorativo amarillo
            ctx.strokeStyle = '#ffe600';
            ctx.lineWidth = 6;
            ctx.setLineDash([10, 8]);
            ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
            ctx.setLineDash([]);

            // Convertir el canvas a buffer
            const buffer = canvas.toBuffer('image/png');

            await message.reply({
                content: `¡${user} ha sido colombianizado! 🇨🇴 *¡Ahora eres más legendario que un tintico en la costa!*`,
                files: [{
                    attachment: buffer,
                    name: 'colombianizado.png'
                }]
            });
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            const errorMsg = await message.reply(errores.ERROR_PROCESAR_IMAGEN);
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
        }
    },
}; 