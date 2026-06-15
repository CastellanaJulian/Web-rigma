## ADDED Requirements

### Requirement: NosotrosSnippet lee contenido desde Sanity
El componente `NosotrosSnippet` SHALL recibir `snippetTitulo`, `snippetTexto`, `metricaM2` y `metricaUnidades` como props y renderizarlos. Si cualquiera viene undefined, SHALL usar los valores hardcodeados actuales como fallback.

#### Scenario: Contenido completo desde Sanity
- **WHEN** `nosotrosPage` tiene todos los campos completados
- **THEN** la sección muestra el título, párrafo y métricas de Sanity

#### Scenario: Fallback parcial
- **WHEN** `metricaM2` está cargado pero `snippetTitulo` está vacío
- **THEN** el título muestra el fallback hardcodeado y la métrica de m² muestra el valor de Sanity

### Requirement: CountUp animado con valores dinámicos
El componente `CountUp` SHALL aceptar el `target` como prop numérico. Con `metricaM2` → target para m² construidos; con `metricaUnidades` → target para unidades funcionales. El prefijo "+" y las etiquetas "M² Construidos" / "Unidades Funcionales" SHALL permanecer hardcodeados en el componente.

#### Scenario: Animación con valor de Sanity
- **WHEN** `metricaM2 = 35000` viene de Sanity
- **THEN** el CountUp anima desde 0 hasta 35.000 al hacer scroll

#### Scenario: Fallback de métricas
- **WHEN** `metricaM2` es undefined
- **THEN** el CountUp usa 32000 como target (valor hardcodeado actual)
