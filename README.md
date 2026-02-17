# Playable Template with PixiJS and Spine

A starter template for creating playable ads using PixiJS with Spine animation support and TypeScript. This template combines:

- [PixiJS](https://pixijs.com/) - Fast, flexible 2D WebGL renderer
- [Pixi Spine](https://github.com/pixijs/spine) - Spine animation runtime for PixiJS
- [@smoud/playable-sdk](https://github.com/smoudjs/playable-sdk#readme) - SDK for creating playable ads with standardized events and methods
- [@smoud/playable-scripts](https://github.com/smoudjs/playable-scripts#readme) - Build and development tools optimized for playable ads

## Demo

Try out this template:
- [Open in CodeSandbox](https://codesandbox.io/p/github/smoudjs/playable-template-pixi-spine/master?import=true)

## Features

- PixiJS v7 integration for high-performance 2D graphics
- Spine animation support with pixi-spine runtime 4.1
- Animated Spineboy character example
- TypeScript support for better development experience
- Hot module replacement during development
- Game structure with PixiJS, Spine, and SDK integration
- Event handling (resize, pause, resume, volume, etc.)
- Installation button implementation
- Interaction tracking
- Responsive canvas scaling

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/index.ts` - Main entry point with SDK initialization
- `src/Game.ts` - Game logic with PixiJS application and Spine animation setup
- `src/index.css` - Styles for your playable
- `src/index.html` - HTML template
- `assets/` - Directory for your game assets (sprites, textures, etc.)

## Looking for More?

Check out other available templates for different frameworks and use cases:
- [playable-template-base](https://github.com/smoudjs/playable-template-base) - Template base version
- [playable-template-base-js](https://github.com/smoudjs/playable-template-base-js) - Template base version (JavaScript)
- [playable-template-pixi](https://github.com/smoudjs/playable-template-pixi) - Template with PixiJS
- [playable-template-three](https://github.com/smoudjs/playable-template-three) - Template with Three.js
- [playable-template-phaser](https://github.com/smoudjs/playable-template-phaser) - Template with Phaser
