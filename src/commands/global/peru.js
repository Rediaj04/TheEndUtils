const { createCanvas, loadImage } = require('canvas');
const config = require('../../config');
const errores = require('../../utils/errores');

module.exports = {
    name: 'peru',
    description: 'Peruaniza la imagen de perfil de un usuario',
    async execute(message, args) {
        // Verificar si se mencionó a un usuario
        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(errores.FALTA_USUARIO(`${config.prefix}peru @usuario`));
            setTimeout(() => errorMsg.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            setTimeout(() => message.delete().catch(console.error), errores.TIEMPO_BORRADO_ERROR);
            return;
        }

        try {
            // Cargar la imagen de perfil del usuario
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));
            
            // Crear un canvas con el tamaño de la imagen
            const canvas = createCanvas(avatar.width, avatar.height);
            const ctx = canvas.getContext('2d');

            // Dibujar la imagen en el canvas
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

            // Efecto desierto: filtro cálido y textura arenosa
            ctx.fillStyle = 'rgba(255, 221, 77, 0.35)'; // Amarillo cálido más intenso
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Añadir "grano" tipo arena
            for (let i = 0; i < canvas.width * canvas.height * 0.025; i++) {
                ctx.fillStyle = `rgba(255, 215, 64, ${Math.random() * 0.18})`;
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.7, 0, 2 * Math.PI);
                ctx.fill();
            }

            // Texto principal: "Peruanizado" con emoji de paloma
            ctx.font = 'bold 30px Arial';
            ctx.fillStyle = '#D4AF37'; // Dorado
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 6;
            ctx.fillText('Peruanizado 🕊️', canvas.width / 2, canvas.height / 2);
            ctx.shadowBlur = 0;

            // Borde decorativo tipo "sol"
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 6;
            ctx.setLineDash([10, 8]);
            ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
            ctx.setLineDash([]);

            // Convertir el canvas a buffer
            const buffer = canvas.toBuffer('image/png');

            // Enviar la imagen editada con la mención del usuario y mensaje divertido
            await message.reply({
                content: `¡${user} ha sido peruanizado! 🕊️ *¡Ahora eres más épico que un ceviche en el desierto!*`,
                files: [{
                    attachment: buffer,
                    name: 'peruanizado.png'
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