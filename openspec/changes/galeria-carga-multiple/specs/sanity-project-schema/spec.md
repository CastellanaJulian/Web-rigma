## ADDED Requirements

### Requirement: Galería como array de imágenes plano
El campo `images` (galería) del schema de Proyecto SHALL ser un array de `image` plano (`of: [{ type: 'image', options: { hotspot: true } }]`), sin envolver cada imagen en un objeto. La galería NO SHALL tener campo de descripción por imagen. Esto SHALL habilitar la selección múltiple de archivos desde el selector del sistema operativo, además del drag & drop de varias imágenes. SHALL conservarse la validación de mínimo 5 imágenes (warning) y el layout en grilla.

#### Scenario: Cliente sube varias imágenes desde el selector de archivos
- **WHEN** el cliente abre la galería de un proyecto en el Studio y usa el botón de carga para abrir el selector de archivos
- **THEN** puede seleccionar varias imágenes a la vez y todas se agregan a la galería

#### Scenario: Cliente arrastra varias imágenes
- **WHEN** el cliente arrastra varios archivos sobre la galería
- **THEN** cada archivo se agrega como una imagen de la galería

#### Scenario: Galería sin descripción por imagen
- **WHEN** el cliente carga una imagen en la galería
- **THEN** no se le pide ni se muestra un campo de descripción, y la ficha del proyecto renderiza la imagen sin leyenda
