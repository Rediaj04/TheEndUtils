const { createCanvas, loadImage } = require('canvas');
const config = require('../../config');

module.exports = {
    name: 'kunno',
    description: 'Kunnoniza la imagen de perfil de un usuario',
    async execute(message, args) {
        // Verificar si se mencionó a un usuario
        const user = message.mentions.users.first();
        if (!user) {
            const errorMsg = await message.reply(`Por favor, menciona a un usuario. Ejemplo: ${config.prefix}kunno @usuario`);
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
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

            // Agregar un efecto de brillo
            ctx.fillStyle = 'rgba(255, 192, 203, 0.2)'; // Rosa suave semi-transparente
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Configurar el estilo del texto principal
            ctx.font = 'bold 23px Arial';
            ctx.fillStyle = '#FF1493'; // Rosa intenso
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Agregar sombra al texto
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            // Agregar el texto "Kunnonizado" en el centro
            ctx.fillText('Kunnonizado', canvas.width / 2, canvas.height / 2);

            // Restaurar la sombra
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Agregar texto decorativo en la parte superior
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#FF69B4'; // Rosa más claro
            ctx.fillText('✨', canvas.width / 2, canvas.height / 4);

            // Agregar texto decorativo en la parte inferior
            ctx.fillText('✨', canvas.width / 2, (canvas.height / 4) * 3);

            // Agregar un borde decorativo
            ctx.strokeStyle = '#FF69B4';
            ctx.lineWidth = 5;
            ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

            // Convertir el canvas a buffer
            const buffer = canvas.toBuffer('image/png');

            // Enviar la imagen editada con la mención del usuario y mensaje divertido
            await message.channel.send({
                content: `¡${user} ha sido kunnonizado! 💖 *¡Ahora eres más kawaii que nunca!* ✨`,
                files: [{
                    attachment: buffer,
                    name: 'kunnonizado.png'
                }]
            });

            // Eliminar el mensaje original
            await message.delete().catch(console.error);
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            const errorMsg = await message.reply('Hubo un error al procesar la imagen.');
            setTimeout(() => errorMsg.delete().catch(console.error), 2000);
            setTimeout(() => message.delete().catch(console.error), 2000);
        }
    },
}; 