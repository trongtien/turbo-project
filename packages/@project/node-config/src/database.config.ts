import { z } from 'zod';

import { Config, Env, Nested } from '@project/node-decorator';

const dbLoggingOptionsSchema = z.enum(['query', 'error', 'schema', 'warn', 'info', 'log', 'all']);
export type DbLoggingOptions = z.infer<typeof dbLoggingOptionsSchema>;

@Config
class LoggingConfig {
    /** Whether database logging is enabled. */
    @Env('DB_LOGGING_ENABLED')
    enabled: boolean = false;

    /**
     * Database logging level. Requires `DB_LOGGING_MAX_EXECUTION_TIME` to be higher than `0`.
     */
    @Env('DB_LOGGING_OPTIONS', dbLoggingOptionsSchema)
    options: DbLoggingOptions = 'error';

    /**
     * Only queries that exceed this time (ms) will be logged. Set `0` to disable.
     */
    @Env('DB_LOGGING_MAX_EXECUTION_TIME')
    maxQueryExecutionTime: number = 0;
}

@Config
class PostgresConfig {
    /** Postgres database name */
    @Env('DB_POSTGRES_DB_DATABASE')
    database: string = 'n8n';

    /** Postgres database host */
    @Env('DB_POSTGRES_DB_HOST')
    host: string = 'localhost';

    /** Postgres database password */
    @Env('DB_POSTGRES_DB_PASSWORD')
    password: string = '';

    /** Postgres database port */
    @Env('DB_POSTGRES_DB_PORT')
    port: number = 5432;

    /** Postgres database user */
    @Env('DB_POSTGRES_DB_USER')
    user: string = 'postgres';

    /** Postgres database schema */
    @Env('DB_POSTGRES_DB_SCHEMA')
    schema: string = 'public';

    /** Postgres database pool size */
    @Env('DB_POSTGRES_DB_POOL_SIZE')
    poolSize: number = 2;

    /** Postgres connection timeout (ms) */
    @Env('DB_POSTGRES_DB_CONNECTION_TIMEOUT')
    connectionTimeoutMs: number = 20_000;

    @Nested
    ssl: PostgresSSLConfig;
}

@Config
class PostgresSSLConfig {
    /**
     * Whether to enable SSL.
     * If `DB_POSTGRES_DB_SSL_CA`, `DB_POSTGRES_DB_SSL_CERT`, or `DB_POSTGRES_DB_SSL_KEY` are defined, `DB_POSTGRES_DB_SSL_ENABLED` defaults to `true`.
     */
    @Env('DB_POSTGRES_DB_SSL_ENABLED')
    enabled: boolean = false;

    /** SSL certificate authority */
    @Env('DB_POSTGRES_DB_SSL_CA')
    ca: string = '';

    /** SSL certificate */
    @Env('DB_POSTGRES_DB_SSL_CERT')
    cert: string = '';

    /** SSL key */
    @Env('DB_POSTGRES_DB_SSL_KEY')
    key: string = '';

    /** If unauthorized SSL connections should be rejected */
    @Env('DB_POSTGRES_DB_SSL_REJECT_UNAUTHORIZED')
    rejectUnauthorized: boolean = true;
}


@Config
export class DatabaseConfig {
    @Nested
    logging: LoggingConfig;

    @Nested
    optionConfig: PostgresConfig;
}
