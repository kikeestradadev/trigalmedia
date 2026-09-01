# Landing — Kike Estrada Developer

One-page personal brand site built with the Prepros stack (Pug + SCSS + JS).

**GitHub Pages:** [https://kikeestradadev.github.io/kikeestradadeveloper](https://kikeestradadev.github.io/kikeestradadeveloper)

## Languages

- **English (default):** `public/index.html`
- **Spanish:** `public/es.html`

Language switcher (EN / ES) lives in the header.

## Stack

- Pug templates (`src/pug/`)
- SCSS with BEM modules (`src/scss/`)
- Vanilla JS modules bundled by Prepros (`src/js/`)
- Swiper (CDN) for the projects carousel

## Run locally

1. Open the project folder in **Prepros**.
2. Prepros compiles:
   - `src/pug/pages/index.pug` → `public/index.html` (EN)
   - `src/pug/pages/es.pug` → `public/es.html` (ES)
   - `src/scss/styles.scss` → `public/styles.css`
   - `src/js/index.js` → `public/index.js`
3. Serve/open `public/index.html` (Prepros live preview or any static server).

Optional asset version bump (cache busting):

```sh
npm run build
```

## Customize content

Most content files expose `en` and `es` keys. Edit both when changing copy.

| Content | File |
| --- | --- |
| Contact / brand / SEO | `src/pug/data/site-data.pug` |
| Header / language switcher | `src/pug/data/site-header-data.pug` |
| Hero | `src/pug/data/hero-data.pug` |
| Services | `src/pug/data/services-data.pug` |
| Projects | `src/pug/data/projects-slider-data.pug` |
| FAQ answers | `src/pug/data/faq-data.pug` |
| Logo | `public/assets/logo.png` |
| Favicon | `public/assets/ico.png` |
| Project images | `public/images/pf/` |
| WhatsApp QR | `public/assets/whatsapp-qr.png` |

## Sections

`#home` · `#services` · `#projects` · `#faq` · `#contact`
