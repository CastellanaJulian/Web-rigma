import type { SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { nosotrosPage } from './nosotrosPage'
import { contactoPage } from './contactoPage'
import { siteSettings } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  nosotrosPage,
  contactoPage,
  siteSettings,
]
