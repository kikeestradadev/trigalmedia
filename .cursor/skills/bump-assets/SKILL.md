---
name: bump-assets
description: Actualiza la versión de cache-busting de CSS y JS con npm run build. Usar al publicar cambios de styles.css o index.js, o al pedir versionar assets.
---

# Versionar CSS y JavaScript

El template carga los assets con query string de versión para invalidar caché:

```pug
link(rel="stylesheet" href=`styles.css?v=${siteData.assetVersion}`)
script(src=`index.js?v=${siteData.assetVersion}`)
```

La versión vive en dos sitios sincronizados:

```text
package.json                 → "assetVersion": "1.0.0"
src/pug/data/site-data.pug   → assetVersion: '1.0.0'
```

## Flujo

1. Tras cambios en CSS o JS que deban llegar a producción/caché, ejecuta:

```sh
npm run build
```

2. El script `scripts/bump-assets.cjs` incrementa el patch (`1.0.0` → `1.0.1`) en `package.json` y en `site-data.pug`.
3. Si Prepros está abierto, recompila las páginas Pug y genera `styles.css?v=1.0.1` e `index.js?v=1.0.1`.

## Reglas

- No hardcodees `?v=1.0.0` en el template; usa siempre `siteData.assetVersion`.
- Incluye `site-data` en `src/pug/config/template.pug` antes del `doctype`.
- No edites a mano solo uno de los dos archivos; usa `npm run build`.
- `assetVersion` es independiente de `version` del paquete npm.
