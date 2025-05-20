import { Config, Nested } from '@project/node-decorator';
import { z } from 'zod';
import { LoggingConfig } from './logging.config';
import { DatabaseConfig } from 'database.config';

export { LOG_SCOPES } from './logging.config';
export type { LogScope } from './logging.config';
export type { DbLoggingOptions } from './database.config'

export * from './custom-types';
export * from './instance-settings.config'

const protocolSchema = z.enum(['http', 'https']);
export type Protocol = z.infer<typeof protocolSchema>;

@Config
export class GlobalConfig {
    @Nested
    logging: LoggingConfig;

    @Nested
    database: DatabaseConfig
}
