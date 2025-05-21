import { defineConfig } from 'drizzle-kit';
import { container } from '@project/node-decorator'
import { GlobalConfig } from '@project/node-config';

const globalConfig = container.resolve(GlobalConfig)
const { host, user, password, port, database } = globalConfig.database.optionConfig

export default defineConfig({
    schema: './src/entities/*.entity.ts',
    out: './migrations',
    dialect: "postgresql",
    dbCredentials: {
        url: `postgresql://${user}:${password}@${host}:${port}/${database}`
    }
});