import { Config, Nested } from '@bds/node-decorator';
import { z } from 'zod';
import { LoggingConfig } from './logging.config';

export { LOG_SCOPES } from './logging.config';
export type { LogScope } from './logging.config';
export * from './custom-types';
export * from './instance-settings.config'

const protocolSchema = z.enum(['http', 'https']);
export type Protocol = z.infer<typeof protocolSchema>;

@Config
export class GlobalConfig {
    @Nested
	logging: LoggingConfig;
}
