import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { esESLocale } from '@sanity/locale-es-es'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'rigma',
  title: 'Rigma — Contenido',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    esESLocale(),
  ],
  tools: (prev) => prev.filter((tool) => !['vision', 'releases'].includes(tool.name)),
})
