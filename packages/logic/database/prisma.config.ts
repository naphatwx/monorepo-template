import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

// A Prisma config file turns off automatic .env loading, so load the
// repo-root .env here. Resolved from this file's directory.
config({ path: path.resolve(__dirname, '../../../.env') })

export default defineConfig({
    // Multi-file schema folder. Add models as new .prisma files inside it.
    schema: path.join('prisma', 'schema'),
    migrations: {
        path: path.join('prisma', 'migrations'),
        seed: 'tsx prisma/seed.ts',
    },
})
