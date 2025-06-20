const { createCanvas, loadImage } = require('canvas');
const config = require('../../config');
const errores = require('../../utils/errores');

module.exports = {
    name: 'tonto',
    description: 'Tontoliza la imagen de perfil de un usuario con un efecto divertido',
    aliases: ['bobo', 'tonta', 'boba'],
    async execute(message, args) {
        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}tonto @usuario`));
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

            // Efecto: ponerle un gorro de burro (triángulo gris con orejas)
            // Gorro base
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(canvas.width/2, 30);
            ctx.lineTo(canvas.width/2 - 60, 160);
            ctx.lineTo(canvas.width/2 + 60, 160);
            ctx.closePath();
            ctx.fillStyle = '#b0b0b0';
            ctx.fill();
            // Oreja izquierda
            ctx.beginPath();
            ctx.ellipse(canvas.width/2 - 40, 80, 18, 40, -0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#888';
            ctx.fill();
            // Oreja derecha
            ctx.beginPath();
            ctx.ellipse(canvas.width/2 + 40, 80, 18, 40, 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#888';
            ctx.fill();
            ctx.restore();

            // Texto principal: "TONTOLIZADO 🤪"
            ctx.font = 'bold 30px Comic Sans MS, Arial';
            ctx.fillStyle = '#fff200';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.shadowColor = 'rgba(0,0,0,0.7)';
            ctx.shadowBlur = 8;
            ctx.fillText('TONTOLIZADO 🤪', canvas.width / 2, canvas.height - 60);
            ctx.shadowBlur = 0;

            // Borde decorativo azul
            ctx.strokeStyle = '#00aaff';
            ctx.lineWidth = 6;
            ctx.setLineDash([10, 8]);
            ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
            ctx.setLineDash([]);

            // Convertir el canvas a buffer
            const buffer = canvas.toBuffer('image/png');

            await message.reply({
                content: `¡${user} ha sido tontolizado! 🤪 *¡Ahora eres oficialmente el tonto del canal!*`,
                files: [{
                    attachment: buffer,
                    name: 'tontolizado.png'
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