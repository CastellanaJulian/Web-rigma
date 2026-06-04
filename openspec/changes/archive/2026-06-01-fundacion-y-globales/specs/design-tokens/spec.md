## ADDED Requirements

### Requirement: Tokens de color disponibles como clases Tailwind

El sistema SHALL exponer todos los colores de la identidad visual como variables CSS en el bloque `@theme` de `globals.css`, de modo que estén disponibles como clases utilitarias de Tailwind v4.

Los tokens de color son:
- `--color-bg`: `#FBFBFB` — fondo principal del sitio
- `--color-bg-warm`: `#E3E3E3` — fondo alternativo cálido
- `--color-surface`: `#E9E9E9` — superficie de cards y separadores
- `--color-surface-warm`: `#CFC5BC` — superficie cálida
- `--color-accent`: `#B59969` — color de acento (dorado/bronce), usado en líneas decorativas, hover y elementos destacados
- `--color-ink`: `#1E1E1E` — texto principal, casi negro
- `--color-ink-elevated`: `#353631` — texto sobre fondos levemente más claros
- `--color-line`: `#E9E9E9` — bordes y separadores

Los valores semitransparentes (texto secundario, on-dark) se implementan con modificadores de opacidad de Tailwind (`text-ink/65`, `text-white/65`) sin necesidad de variables separadas.

#### Scenario: Clases de color disponibles en componentes

- **WHEN** un componente usa `className="bg-accent text-ink"`
- **THEN** Tailwind resuelve esos valores a `#B59969` y `#1E1E1E` respectivamente sin configuración adicional

#### Scenario: Fallback en modo oscuro del sistema

- **WHEN** el sistema operativo del usuario tiene modo oscuro activo
- **THEN** el sitio NO cambia su paleta — la paleta de Rigma es siempre clara (no hay dark mode)

### Requirement: Fuente Montserrat como fuente sans por defecto

El sistema SHALL cargar Montserrat vía `next/font/google` con los pesos 300, 400, 500, 600 y 700, y asignarla como `--font-sans` en el `@theme`. Todos los elementos del sitio heredan esta fuente por defecto.

#### Scenario: Fuente aplicada globalmente

- **WHEN** cualquier página del sitio se carga
- **THEN** el texto usa Montserrat sin necesidad de clase adicional en cada componente

#### Scenario: Sin requests externos a Google Fonts

- **WHEN** el sitio se carga en producción
- **THEN** la fuente se sirve desde Vercel (next/font la descarga en build), sin llamadas a `fonts.googleapis.com`
