# Campus Ikasten

Plataforma de cursos de IA aplicada a RR.HH. Esta es la **versión de prueba (sprint 1)**: solo pantallas, sin back ni base de datos. Las compras y las cuentas son simuladas y se guardan en el navegador de cada uno.

Se publica en: https://ikasten-lab.github.io/

## Qué hay

| Ruta | Pantalla |
|---|---|
| `/` | Inicio, charla del 28/11 y cursos |
| `/evaluacion/` | Evaluación de 3 minutos (8 preguntas) |
| `/cursos/` y `/cursos/<curso>/` | Catálogo y ficha de cada curso |
| `/compra/<curso>/` | Compra simulada y descarga del PDF de muestra |
| `/aprender/<curso>/<leccion>/` | Lector de lecciones |
| `/aprender/<curso>/quiz/` | Quiz final |
| `/verificar/` | Certificado y verificación por código (probá `IK-2026-DEMO01`) |
| `/mis-cursos/` | Cuenta simulada, avance y certificados |
| `/empresas/` | Opciones para equipos |

## Dónde se cambia cada cosa

- **Textos de los cursos, lecciones y quiz:** `src/data/courses.ts`. El texto de las lecciones sale de las guías de HR + IA: si se cambia, que sea a propósito.
- **Preguntas de la evaluación:** `src/data/evaluation.ts`.
- **Fecha, hora y lugar de la charla, link del formulario de inscripción:** `src/data/site.ts`.
- **Colores:** solo en `src/app/globals.css`. No escribir colores sueltos en las pantallas.
- **PDF de muestra:** se genera con `python scripts/build_sample_pdf.py`. El repo es público: nunca subir el material completo ni datos personales.

## Cómo levantarlo en tu compu

Necesitás Node 20 o más nuevo.

```
npm install
npm run dev
```

Se abre en http://localhost:3075.

## Cómo proponer un cambio (pull request)

Nadie sube cambios directo a `main`. Cada cambio va por pull request, así el otro lo revisa antes de que se publique.

1. Traé lo último: `git checkout main` y después `git pull`.
2. Creá una rama con un nombre que diga qué hacés: `git checkout -b cambio-textos-home`.
3. Hacé el cambio y miralo en tu compu con `npm run dev`.
4. Antes de subir, corré `npm run check`. Si falla, el mensaje dice qué regla se rompió y en qué archivo.
5. Guardá y subí la rama: `git add .`, `git commit -m "Cambio los textos de la home"`, `git push -u origin cambio-textos-home`.
6. En GitHub aparece el botón **Compare & pull request**. Abrilo, contá qué cambiaste y asigná al otro como revisor.
7. Cuando el otro aprueba, se hace **Merge**. Ahí GitHub publica solo, en un par de minutos.

**Importante:** GitHub Pages no muestra una vista previa de cada pull request. Lo que no está mergeado en `main` solo se ve en la compu de quien lo está haciendo. Para revisar el cambio del otro: `git fetch`, `git checkout <nombre-de-la-rama>` y `npm run dev`.

## Reglas de diseño

`npm run check` corre `verify.mjs`, que frena el build si aparece algo de esto:

- Gradientes, sombras, efecto vidrio, animaciones decorativas.
- Emojis, la fuente Inter, etiquetas en mayúsculas arriba de los títulos.
- Colores sueltos fuera de `globals.css`.
- Frases de marketing genéricas ("potenciá", "de clase mundial") o del tipo "No es X. Es Z.".
- Guiones largos en los textos de la interfaz.

Además, a mano: nada de testimonios, logos o números inventados. Si no hay prueba real, esa sección no va.

## Publicación

Cada merge a `main` corre `.github/workflows/deploy.yml`: chequea tipos y reglas de diseño, arma el sitio y lo publica en GitHub Pages. Si algún chequeo falla, no se publica nada.

Límites de GitHub Pages (docs.github.com): el repo tiene que ser público con el plan gratis, y no se puede usar para cobrar ni para pedir contraseñas o datos de tarjeta. Por eso las compras son simuladas. Cuando haya cobros reales, el sitio se muda.

## Pendiente para el sprint 2

- Back y base de datos (Supabase) detrás de `src/data/repo.ts`.
- Cuentas reales, cobros reales, certificados verificables desde cualquier navegador.
- Formulario de inscripción a la charla (hoy va en `site.ts` como link externo).
- Fotos reales en inicio y en las fichas de los cursos.
