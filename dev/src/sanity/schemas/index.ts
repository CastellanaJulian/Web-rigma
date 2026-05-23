import type { SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { team } from './team'

export const schemaTypes: SchemaTypeDefinition[] = [project, team]
