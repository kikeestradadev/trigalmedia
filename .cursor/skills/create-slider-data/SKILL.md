---
name: create-slider-data
description: Crea y modifica sliders Pug separando todo su contenido en un archivo de datos homónimo. Usar al crear, editar o refactorizar componentes cuyo nombre termine en -slider.pug.
---

# Datos separados para sliders Pug

Cada slider requiere dos archivos simétricos:

```text
src/pug/modules/allies-slider.pug
src/pug/data/allies-slider-data.pug
```

## Convención obligatoria

Para `{name}-slider.pug` en `src/pug/modules/`, crea siempre `{name}-slider-data.pug` en `src/pug/data/`.

El componente incluye los datos al inicio:

```pug
include ../data/allies-slider-data
```

El archivo de datos expone un objeto camelCase:

```pug
-
	const alliesSliderData = {
		title: 'Aliados',
		items: [
			{ name: 'Aliado 1', image: './assets/aliado.svg', href: '#' }
		]
	}
```

El componente genera las diapositivas con `each`:

```pug
each ally in alliesSliderData.items
	article(class='allies-slider__slide swiper-slide')
		img(class='allies-slider__image' src=ally.image alt=ally.name)
```

## Reglas

1. No declares arrays de contenido dentro del componente.
2. Guarda en el objeto títulos, textos, imágenes, enlaces, modificadores y demás contenido editable.
3. Mantén SVG estructural y controles de Swiper en el componente.
4. Usa sintaxis Pug larga y clases BEM.
5. Conserva el HTML y las clases que espera el módulo JavaScript del slider.
6. Compila `src/pug/pages/index.pug` y `src/pug/style-guide/style-guide.pug` después de cualquier cambio.
