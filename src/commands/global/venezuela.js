const { createCanvas, loadImage } = require('canvas');
const config = require('../../config');
const errores = require('../../utils/errores');

module.exports = {
    name: 'venezuela',
    description: 'Venezolaniza la imagen de perfil de un usuario con un efecto esqueleto',
    aliases: ['veneco'],
    async execute(message, args) {
        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}venezuela @usuario`));
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            return;
        }

        try {
            // Cargar la imagen de perfil del usuario
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));
            const canvas = createCanvas(avatar.width, avatar.height);
            const ctx = canvas.getContext('2d');

            // Dibujar la imagen en el canvas
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

            // Convertir a escala de grises (efecto "huesito")
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
                imageData.data[i] = avg;
                imageData.data[i+1] = avg;
                imageData.data[i+2] = avg;
                // Bajar opacidad para dar efecto fantasma
                imageData.data[i+3] = imageData.data[i+3] * 0.8;
            }
            ctx.putImageData(imageData, 0, 0);

            // Overlay de "huesos cruzados" (simulación con líneas blancas)
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 10;
            ctx.globalAlpha = 0.5;
            // Primer hueso
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.2, canvas.height * 0.2);
            ctx.lineTo(canvas.width * 0.8, canvas.height * 0.8);
            ctx.stroke();
            // Segundo hueso
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.8, canvas.height * 0.2);
            ctx.lineTo(canvas.width * 0.2, canvas.height * 0.8);
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Texto principal: "Venezolanizado 💀"
            ctx.font = 'bold 27px Arial';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.7)';
            ctx.shadowBlur = 8;
            ctx.fillText('Venezolanizado 💀', canvas.width / 2, canvas.height / 2);
            ctx.shadowBlur = 0;

            // Borde decorativo gris
            ctx.strokeStyle = '#888';
            ctx.lineWidth = 6;
            ctx.setLineDash([8, 8]);
            ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
            ctx.setLineDash([]);

            // Convertir el canvas a buffer
            const buffer = canvas.toBuffer('image/png');

            await message.reply({
                content: `¡${user} ha sido venezolanizado! 💀 *¡Ahora eres más duro que un huesito en el Caribe!*`,
                files: [{
                    attachment: buffer,
                    name: 'venezolanizado.png'
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