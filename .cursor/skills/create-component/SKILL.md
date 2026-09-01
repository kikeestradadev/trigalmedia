---
name: create-component
description: Crea componentes simétricos Pug, SCSS y JavaScript con BEM para el flujo de Prepros. Usar al crear o estructurar un componente o módulo UI.
---

# Crear un componente

## Convención

Usa el mismo nombre base en las capas necesarias. Los módulos Pug viven en `src/pug/modules/` para mantener coherencia con SCSS y JS:

```text
src/pug/modules/main-menu.pug
src/pug/data/main-menu-data.pug
src/scss/modules/_main-menu.scss
src/js/modules/mainMenu.js
```

El bloque BEM es `.main-menu`.

Los specimens del style guide (paleta, tipografía demo, etc.) y la página `style-guide.pug` viven en `src/pug/style-guide/`, no en `modules/` ni en `pages/`.

## Flujo

1. Crea el Pug en `src/pug/modules/` con sintaxis larga:

```pug
nav(class='main-menu')
	div(class='main-container main-menu__shell')
		div(class='container main-menu__container')
```

2. Crea el parcial SCSS sin `@use`:

```scss
.main-menu {
	&__shell { }
	&__container { }

	@media (width >= $sm) { }
}
```

3. Regístralo en `src/scss/modules/modules.scss`:

```scss
@import "main-menu";
```

4. Si requiere comportamiento, crea un módulo multi-instancia:

```js
const mainMenu = () => {
	document.querySelectorAll('.main-menu').forEach((root) => {
		// Toda consulta y listener queda acotado a root.
	});
};

export default mainMenu;
```

5. Si tiene contenido estructurado, crea `src/pug/data/{name}-data.pug`, inclúyelo con `include ../data/{name}-data` y recórrelo con `each`.
6. Impórtalo en `src/js/index.js` y ejecútalo dentro de `initComponents`.
7. Incluye el Pug desde la página correspondiente con `include ../modules/{name}`.
8. Documenta en `README.md` cualquier asset o CDN nuevo.
9. Si el cambio afecta CSS o JS publicados, ejecuta `npm run build` para subir `assetVersion` (ver skill `bump-assets`).

## Restricciones

- Usa BEM y un bloque principal por parcial.
- No uses `@use`, Gulp, JSON inyectado ni filtros Markdown.
- Los breakpoints ya son globales desde `styles.scss`.
- Los módulos interactivos deben ser idempotentes y soportar múltiples raíces.
- Valida dependencias CDN antes de utilizarlas.
- Prepros solo compila los cuatro entrypoints definidos en `prepros.config`.
- No coloques módulos UI en `src/pug/style-guide/`; esa carpeta es solo para demos del style guide.
