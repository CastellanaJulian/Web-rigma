import type { SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { testimonial } from './testimonial'
import { siteSettings } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  testimonial,
  siteSettings,
]
