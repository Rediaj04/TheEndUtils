<p align="center">
  <img 
    src="https://capsule-render.vercel.app/api?type=waving&color=9b59b6,8e44ad&height=120&section=header&text=The%20End%20Utils%20🤖&fontSize=40&fontColor=ffffff&animation=twinkling" 
    width="100%" 
    alt="The End Utils Header" 
  />
</p>

Bot de Discord para la gestión de pruebas y administración del servidor **The End**.

---
## Características ✨

- Sistema de pruebas con notificaciones automáticas
- Gestión de roles y permisos
- Comandos de administración
- Sistema AFK con notificaciones
- Plantillas y reglas predefinidas

## Comandos Disponibles 🎮

### Comandos de Testing
- `??plantillas` - Muestra el formulario de solicitud
- `??reglas` - Muestra las reglas del test
- `??test @usuario` - Finalización del test
- `??pass @usuario` - Notifica aprobación
- `??nopass @usuario` - Notifica no aprobación
- `??afk @usuario` - Marca usuario como AFK

### Comandos de Administración
- `??roles` - Gestiona roles permitidos
- `??ayuda` - Muestra lista de comandos

## Instalación 🚀

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

## Requisitos 📋

- Node.js v18 o superior
- npm o yarn
- Token de bot de Discord válido

## Estructura del Proyecto 📁

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

## Contribución 🤝

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 