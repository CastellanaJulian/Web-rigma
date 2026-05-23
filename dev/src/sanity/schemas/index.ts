import type { SchemaTypeDefinition } from 'sanity'
import { homePage } from './homePage'
import { project } from './project'
import { team } from './team'

export const schemaTypes: SchemaTypeDefinition[] = [homePage, project, team]
