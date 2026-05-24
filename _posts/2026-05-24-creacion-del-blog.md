---
layout: post
title: "Creación del Blog y Nuevo Diseño Git Sketchbook"
date: 2026-05-24
author: "programmercito"
tags: [blog, git, css, webdev]
excerpt: "Hoy marco el primer commit de este blog con un rediseño completo de interfaz inspirado en un cuaderno de bocetos de código y la estética de Git."
---

¡Hola a todos! Este es el primer artículo oficial de **Programmercito Blog**.

Después de experimentar con diferentes interfaces de usuario (incluyendo una simulación completa de VS Code), decidí buscar algo más limpio, centrado en el contenido pero que aún grite "desarrollador". El resultado es el tema **Code Sketchbook** (Boceto de Código), inspirado en los repositorios de Git y las interfaces de terminal modernas.

## ¿Cómo está construido este blog?

El blog utiliza **Jekyll** como generador de sitios estáticos, lo que permite que sea extremadamente rápido y compatible con GitHub Pages. Los componentes visuales clave de este nuevo diseño incluyen:

1. **Margen de Números de Línea:** Un script dinámico de JavaScript calcula la altura de la página y añade números de línea al margen izquierdo de la columna de lectura, emulando la vista de un archivo de código en un editor de texto.
2. **Cabecera Estilo Repositorio:** La parte superior simula la barra de navegación de un repositorio, mostrando la ruta del proyecto (`programmercito / blog`) y la rama activa actual (`main`).
3. **Esquema de Colores GitHub Dark:** Colores oscuros de alto contraste combinados con acentos de color que representan diferentes tipos de variables de programación.

```css
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --color-blue: #58a6ff;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## Próximos Pasos

En las próximas publicaciones compartiré guías detalladas sobre desarrollo web con Javascript, trucos de CSS moderno, optimización de flujos de trabajo en la terminal y reflexiones sobre ingeniería de software.

¡Manténganse sintonizados para el próximo commit!
