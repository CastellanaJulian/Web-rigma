import type { SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { homePage } from './homePage'
import { nosotrosPage } from './nosotrosPage'
import { contactoPage } from './contactoPage'
import { siteSettings } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  homePage,
  nosotrosPage,
  contactoPage,
  siteSettings,
]
