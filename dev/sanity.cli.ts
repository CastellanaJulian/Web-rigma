import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0q5stz3o'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: 'r20rau0hrighw0q8ob77l06z',
  },
  autoUpdates: true,
})
