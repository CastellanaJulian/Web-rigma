# Wireframes — Decisiones y justificación

> Complemento de [wireframes-system.md](wireframes-system.md).
> `system` describe **qué hay**; `decisions` describe **por qué está así**.
> Memoria del proyecto y respaldo cuando alguien pregunta "¿por qué decidieron hacer X?".
> Última actualización: 7 de mayo 2026

---

## Cómo usar este archivo

Cada decisión se anota con: contexto, qué se decidió, por qué, qué se descartó (si aplica). Si dentro de tres semanas alguien (Juli, Luca, un tercer colaborador) propone algo que ya descartamos, este archivo debería evitar reabrir la discusión sin sumar datos nuevos.

Cuando se tome una decisión nueva — o se cambie una existente — se actualiza este archivo **antes** del commit que aplica el cambio, y se suma una línea al *Histórico de cambios* al final.

---

## 1. Decisiones heredadas del descubrimiento

> Fuente: relevamiento con cliente + `CLAUDE.md`.

### 1.1 Modelo del sitio: vidriera con peso comercial
- **Decidido:** sitio institucional/portfolio con foco en captura de leads calificados — no estudio de arquitectura puro ni desarrolladora pura.
- **Por qué:** Rigma vende unidades funcionales a compradores finales (no perfil corporativo). El sitio tiene que **mostrar el producto rápido** y **calificar el lead** (saber por qué proyecto vienen). El tono apunta a inversores y compradores 30–50 años, profesional pero cercano.

### 1.2 Arquitectura: 4 páginas + ficha dinámica
- **Decidido:** `Inicio · Proyectos · Nosotros · Contacto` + `Ficha de Proyecto` dinámica en `/proyectos/[slug]`.
- **Por qué:** estructura mínima que cubre vidriera + captura. Más páginas (servicios, blog, prensa) diluyen el flujo hacia el lead y agregan mantenimiento sin retorno claro en esta etapa. Si más adelante hace falta sumar contenido (blog de obras, novedades), se discute con argumento de uso.

### 1.3 Bloques por página
- **Decidido:** los bloques de cada página están definidos en `sitemap/Rigma-group-sitemap.csv` y reflejados en `CLAUDE.md → Arquitectura del sitio`. **Esa es la fuente de verdad de contenido**, no este archivo ni el sistema visual.
- **Por qué:** queríamos un único lugar de contenido (sitemap) y un único lugar de visual (system). Si los bloques se duplican acá, en algún momento se desincronizan.

### 1.4 Filtros: un solo eje (Todos / En Ejecución / Terminados)
- **Decidido:** tabs horizontales con tres estados.
- **Por qué:** facetas múltiples (estado + barrio + tipología) saturan la grilla y aportan poco — el comprador filtra mentalmente por **estado de obra** primero (qué puede comprar ya, qué tiene que esperar). Barrio y tipología se ven en la card y en la ficha. Un solo eje = menor fricción y menos UI que mantener.

### 1.5 Ficha de proyecto: 8 bloques definidos
- **Decidido:** Hero · Información clave · Descripción · Galería principal · Planos · Ubicación · Siguiente / relacionado · Sección de contacto. Más navbar arriba y footer abajo.
- **Por qué:** orden que sigue la lógica de evaluación del comprador: *qué es → datos clave → relato → cómo se ve → cómo se distribuye → dónde queda → seguir explorando → consultar*. Planos en sección separada porque no todo el público los quiere ver — meterlos en galería los entierra o los obliga.

### 1.6 Captura de leads: WhatsApp + form con dropdown de proyecto
- **Decidido:** formulario con campo obligatorio "Proyecto de interés" (selector) + botón WhatsApp con mensaje predeterminado.
- **Por qué:** calificar el lead **desde el origen**. Saber si vienen por Cosquín, Larrazábal o Zelada permite al cliente hacer follow-up con la info correcta y medir qué proyecto traccionó al lead. WhatsApp en paralelo porque parte del público prefiere chat directo a formulario.

---

## 2. Decisiones de wireframes

### 2.1 Fidelidad: mid-fi neutro
- **Decidido:** wireframes mid-fi — formas claras + tipografía real, sin color de marca, sin sombras, sin imágenes finales. Placeholders rayados con label.
- **Por qué:** queremos validar **estructura y jerarquía** sin que el cliente se distraiga con la estética. Si saltamos directo a alta fidelidad y la estructura no convence, perdemos doble: tiempo de visual + replanteo arquitectónico. Mid-fi también baja la barrera para iterar — mover un bloque cuesta poco cuando todavía no hay color ni renders.

### 2.2 Desktop-first
- **Decidido:** se diseñan wireframes solo en desktop (1440 px de ancho de artboard). Mobile se aborda recién en alta fidelidad.
- **Por qué:** el público objetivo evalúa inversión inmobiliaria mayormente desde desktop. Diseñar mid-fi mobile en paralelo duplica el costo sin agregar validación de estructura — la jerarquía se valida igual en desktop. Mobile se resuelve sobre estructura ya cerrada, donde las decisiones de adaptación son técnicas (qué se apila, qué se oculta) y no de producto.

### 2.3 Datos mock con nombres reales de Rigma
- **Decidido:** todo el wireframe usa los proyectos reales del cliente — `Cosquín 1534`, `Zelada 6171`, `Av. Larrazábal 1255` — con la info ya entregada. Para slots de grilla que excedan los reales, se completa con direcciones plausibles de Mataderos / CABA marcadas como filler.
- **Por qué:** ver "Cosquín 1534 · Mataderos · En Ejecución" en lugar de "Edificio Lacroze · Palermo" acerca al cliente al producto real y evita que la conversación se desvíe a "ese no es nuestro proyecto". Lorem ipsum + nombres genéricos hacen que el cliente no logre proyectarse.
- **Métricas:** se usan las reales (`+32.000 m²`, `+220 UF`, `+3 generaciones`, `2016`) en lugar de las ficticias (`+20 / 18 / +850 / 4`) que venían en los wireframes de Claude Design.

### 2.4 Sin paleta de marca todavía
- **Decidido:** solo escalas neutras (blanco, grises, casi negro). Cero color de marca en wireframe.
- **Por qué:** la decisión cromática se posterga a alta fidelidad. Mezclarla con la discusión de estructura desordena la conversación y arrastra al cliente a opinar sobre algo que no estamos validando todavía.

### 2.5 Numeración editorial de secciones (`01 ─ TÍTULO`)
- **Decidido:** cada sección lleva un kicker `01 ─ KICKER` en mayúsculas con tracking, color muted.
- **Por qué:** decisión heredada de los wireframes de referencia de Claude Design. Da ritmo arquitectónico al scroll, ordena la jerarquía visual y refuerza el tono profesional/institucional que el cliente quiere transmitir. Bonus: encaja con el lenguaje gráfico del cartel de obra (mayúsculas + tracking en labels como `INTERIORES DE CALIDAD`, `CONSULTAS`).

### 2.6 Tipografía sans-only (Montserrat)
- **Decidido:** una sola familia para todo el wireframe — Montserrat (300/400/500/600/700 + italic 400). Sin serif, sin monoespaciada. La jerarquía se construye con pesos + tamaños + letter-spacing en mayúsculas.
- **Por qué:** match directo con el cartel de obra de Rigma (geométrica, ubicua en real estate AR, diseñada en Buenos Aires). Una sola familia genera menos ruido visual y empuja al wireframe más cerca del lenguaje actual del cliente. Decidir esto en wireframe **no compromete** la familia final de marca — Montserrat es la aproximación; la decisión definitiva entra en `design-system.md`.

### 2.7 Patrón rayado para placeholders
- **Decidido:** los placeholders de imagen usan repeating-linear-gradient diagonal con label en cápsula central.
- **Por qué:** comunica de inmediato "esto es placeholder, no contenido final" — evita que el cliente confunda el wireframe con un diseño cerrado. La textura es neutra, no compite con la tipografía sans, y se reemplaza limpiamente por renders cuando lleguen.

---

## 3. Decisiones pendientes

### 3.1 Hero: Variante A vs B
- **Pendiente.** A discutir con el cliente en sesión de validación.
- **A:** full-bleed con render del proyecto destacado + carrusel auto cada 6s. Tono inmersivo, foco en el producto.
- **B:** split editorial — titular tipográfico izquierda, copy derecha, strip de 3 thumbs abajo. Tono institucional/editorial, da más peso a la marca antes que al proyecto.
- **Criterio para decidir:** si el cliente prioriza "que vean los proyectos rápido" → A. Si prioriza "que entiendan quién es Rigma" → B.

### 3.2 Navbar: 3 variantes exploradas
- **Pendiente.** Decisión a tomar después de tener todas las pantallas en contexto (Home + Proyectos + Ficha + Nosotros + Contacto). El comportamiento del navbar depende del hero de cada pantalla.
- **(1)** Transparente sobre hero, vuelve sólido al scrollear.
- **(2)** Sólida siempre visible.
- **(3)** Minimal: logo + hamburger.

### 3.3 4to proyecto del cliente
- **Pendiente.** El cliente todavía no entregó información del 4to proyecto. Mientras, los wireframes muestran 3 reales + filler para los slots restantes en grillas amplias.

### 3.4 Patrón de planos en Ficha de proyecto
- **Pendiente.** A definir cuando se sume la pantalla — mantener rayado diagonal o cambiar a línea/contorno (más cercano al lenguaje técnico de plano).

### 3.5 Iconografía de pilares
- **Pendiente.** En el wireframe los pilares de "Por qué Rigma" usan 4 formas geométricas simples (cuadrado, círculo, rombo, cuadrado lleno). En alta fidelidad se decide si se mantienen o se reemplazan por iconos de stroke (estilo cartel de obra: `🚗 cocheras`, `🌳 espacios comunes`, etc.).

---

## 4. Decisiones rechazadas y por qué

> Si proponemos algo que está acá, primero releer la justificación. Si hay datos nuevos que invaliden el rechazo, se reabre la discusión y se mueve la entrada a la sección correspondiente.

### 4.1 Mobile-first — rechazado
- **Razón:** ver 2.2. El público evalúa desde desktop, mid-fi mobile no agrega validación estructural, y diseñar las dos en paralelo duplica el costo. Mobile se resuelve en alta fidelidad sobre estructuras ya cerradas.

### 4.2 Filtros multi-eje (estado + barrio + tipología) — rechazado
- **Razón:** ver 1.4. El catálogo no tiene volumen para justificar facetas múltiples. El comprador filtra mentalmente por estado primero; el resto se ve en la card. UI más simple, menos código a mantener.

### 4.3 Múltiples variantes por página (3+ por pantalla) — rechazado
- **Razón:** el sitemap tiene contenido validado — no estamos explorando "qué va en cada página", estamos explorando "cómo se muestra". Múltiples variantes por página dispersan la conversación. La regla quedó: 1 variante por página, salvo Home (donde sí hay decisiones reales de orden + forma de mostrar proyectos → 2 variantes A y B).

### 4.4 Tipografía serif editorial (Instrument Serif) — rechazado
- **Razón:** los wireframes iniciales de Claude Design usaban serif para titulares (estilo editorial). Después de ver el cartel de obra de Rigma — geométrico sans con pesos + tracking en mayúsculas — decidimos que la serif editorial competía con la identidad gráfica que ya tiene la marca en producción. Sans-only acerca el wireframe al territorio actual del cliente sin comprometer la decisión de marca definitiva.

### 4.5 Lorem ipsum genérico + nombres ficticios de proyecto — rechazado
- **Razón:** ver 2.3. "Edificio Lacroze · Palermo" desvía la conversación a "ese no es nuestro proyecto". Datos reales (aunque incompletos) acercan al cliente al producto que se va a vender desde el sitio.

### 4.6 Densidad limitada (max 6 bloques por pantalla) — rechazado
- **Razón:** anclamos la estructura al sitemap, no a un máximo arbitrario. Si el sitemap exige 7 bloques porque ese es el flujo correcto, el wireframe tiene 7. Lo que regula la cantidad es la decisión de producto, no la regla visual. La regla visual no debería pisar al sitemap.

### 4.7 Métricas ficticias (+20 / 18 / +850 / 4) — rechazado
- **Razón:** los wireframes de Claude Design venían con métricas inventadas porque no se había compartido la info real. Hoy tenemos datos del cliente (`+32.000 m²`, `+220 UF`, `+3 generaciones`, `2016`) — usar esos en lugar de los inventados es coherente con la decisión 2.3 de mocks reales.

### 4.8 Familia tipográfica triple (sans + serif + mono) — rechazado
- **Razón:** los wireframes iniciales usaban Inter + Instrument Serif + JetBrains Mono. Tres familias fragmentan la jerarquía y no matchean al cartel de obra (que es una sola familia con pesos + tracking). Reemplazadas por Montserrat con escala de pesos.

---

## 5. Histórico de cambios

| Fecha       | Quién                | Cambio                                                                                         |
|-------------|----------------------|------------------------------------------------------------------------------------------------|
| 2026-05-03  | Claude Design        | Wireframes de Home (variantes A y B) generados con Claude Design. Sistema base: Inter + Instrument Serif + JetBrains Mono. |
| 2026-05-07  | Luca + Claude Code   | Sumo `wireframes-system.md` y `wireframes-decisions.md` al repo como fuente de verdad de la fase B. |
| 2026-05-07  | Luca + Claude Code   | Cambio tipografía a sans-only (Montserrat) — alineada al cartel de obra de Rigma. Razón en 2.6 y 4.4. |
| 2026-05-07  | Luca + Claude Code   | Saco la regla "máx 6 bloques por pantalla" — la estructura la define el sitemap. Razón en 1.3 y 4.6. |
| 2026-05-07  | Luca + Claude Code   | Datos mock pasan a usar nombres reales de Rigma (`Cosquín 1534`, `Zelada 6171`, `Av. Larrazábal 1255`) y métricas reales. Razón en 2.3 y 4.5/4.7. |
