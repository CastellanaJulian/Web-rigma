import type { SchemaTypeDefinition } from 'sanity'
import { homePage } from './homePage'
import { project } from './project'
import { nosotrosPage } from './nosotrosPage'
import { contactoPage } from './contactoPage'
import { siteSettings } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  homePage,
  project,
  nosotrosPage,
  contactoPage,
  siteSettings,
]
