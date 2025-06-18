# The End Utils 🤖

<div align="center">
  <img src="Logo.gif" alt="The End Utils Logo" width="200"/>
  
  [![Discord](https://img.shields.io/discord/1227460757524975678?color=7289DA&label=Discord&logo=discord&logoColor=white)](https://discord.gg/3pFVWqJfaW)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-v18-green.svg)](https://nodejs.org/)
</div>

## 📝 Descripción

Bot de Discord para la gestión de pruebas y administración del servidor The End. Diseñado para facilitar el proceso de pruebas y mantener un ambiente organizado en el servidor.

## ✨ Características

- 🎯 Sistema de pruebas con notificaciones automáticas
- 👥 Gestión de roles y permisos
- ⚙️ Comandos de administración
- ⏰ Sistema AFK con notificaciones
- 📋 Plantillas y reglas predefinidas

## 🎮 Comandos Disponibles

### Comandos de Testing
- `??plantillas` - Muestra el formulario de solicitud
- `??test @usuario` - Finalización del test
- `??pass @usuario` - Notifica aprobación
- `??nopass @usuario` - Notifica no aprobación
- `??afk @usuario` - Marca usuario como AFK
- `??reglas` - Muestra las reglas del test de ingreso

### Comandos Globales
- `??kunno @usuario` - Kunnoniza la imagen de perfil de un usuario
- `??kiss @usuario` - Envía un beso a un usuario
- `??avatar @usuario` - Muestra el avatar de un usuario en alta resolución
- `??userinfo @usuario` - Muestra información detallada de un usuario
- `??8ball <pregunta>` - Responde a tus preguntas de forma aleatoria
- `??ontop` - Muestra el poderío de The End
- `??redes` o `??fan` - Muestra las redes sociales
- `??infobot` - Muestra información sobre el bot
- `??ayuda` - Muestra lista de comandos

### Comandos de Administración
- `??roles` - Gestiona roles permitidos
- `??clear <cantidad>` - Borra hasta 50 mensajes en el canal actual

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Rediaj04/TheEndUtils.git
cd TheEndUtils
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
DISCORD_TOKEN=tu_token_aqui
```

4. Inicia el bot:
```bash
npm run dev
```

## 📋 Requisitos

- Node.js v18 o superior
- npm o yarn
- Token de bot de Discord válido

## 📁 Estructura del Proyecto

```
TheEndUtils/
├── src/
│   ├── commands/
│   │   ├── admin/
│   │   ├── global/
│   │   └── testing/
│   ├── utils/
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🌟 Créditos

<div align="center">
  <img src="https://github.com/Rediaj04.png" width="100" style="border-radius: 50%"/>
  <br/>
  Desarrollado con ❤️ por [Rediaj04](https://github.com/Rediaj04) para The End Community.
</div> 