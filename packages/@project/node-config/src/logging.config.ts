import { z } from 'zod';

import { CommaSeparatedStringArray } from './custom-types';
import { Config, Env, Nested } from '@project/node-decorator';

/** Scopes (areas of functionality) to filter logs by. */
export const LOG_SCOPES = [
    'concurrency',
    'external-secrets',
    'license',
    'multi-main-setup',
    'pruning',
    'pubsub',
    'push',
    'redis',
    'scaling',
    'waiting-executions',
    'task-runner',
    'insights',
    'workflow-activation',
] as const;

export type LogScope = (typeof LOG_SCOPES)[number];

@Config
class FileLoggingConfig {
    /**
     * Max number of log files to keep, or max number of days to keep logs for.
     * Once the limit is reached, the oldest log files will be rotated out.
     * If using days, append a `d` suffix. Only for `file` log output.
     *
     * @example `PROJECT_LOG_FILE_COUNT_MAX=7` will keep at most 7 files.
     * @example `PROJECT_LOG_FILE_COUNT_MAX=7d` will keep at most 7 days worth of files.
     */
    @Env('PROJECT_LOG_FILE_COUNT_MAX')
    fileCountMax: number = 100;

    /** Max size (in MiB) for each log file. Only for `file` log output. */
    @Env('PROJECT_LOG_FILE_SIZE_MAX')
    fileSizeMax: number = 16;

    /** Location of the log files inside `~/.PROJECT`. Only for `file` log output. */
    @Env('PROJECT_LOG_FILE_LOCATION')
    location: string = 'logs/PROJECT.log';
}

const logLevelSchema = z.enum(['error', 'warn', 'info', 'debug', 'silent']);
type LogLevel = z.infer<typeof logLevelSchema>;

@Config
export class LoggingConfig {
    /**
     * Minimum level of logs to output. Logs with this or higher level will be output;
     * logs with lower levels will not. Exception: `silent` disables all logging.
     *
     * @example `PROJECT_LOG_LEVEL=info` will output `error`, `warn` and `info` logs, but not `debug`.
     */
    @Env('PROJECT_LOG_LEVEL', logLevelSchema)
    level: LogLevel = 'info';

    /**
     * Where to output logs to. Options are: `console` or `file` or both in a comma separated list.
     *
     * @example `PROJECT_LOG_OUTPUT=console,file` will output to both console and file.
     */
    @Env('PROJECT_LOG_OUTPUT')
    outputs: CommaSeparatedStringArray<'console' | 'file'> = ['console'];

    @Nested
    file: FileLoggingConfig;

    /**
     * Scopes to filter logs by. Nothing is filtered by default.
     *
     * Supported log scopes:
     *
     * - `concurrency`
     * - `external-secrets`
     * - `license`
     * - `multi-main-setup`
     * - `pruning`
     * - `pubsub`
     * - `push`
     * - `redis`
     * - `scaling`
     * - `waiting-executions`
     * - `task-runner`
     * - `workflow-activation`
     * - `insights`
     *
     * @example
     * `PROJECT_LOG_SCOPES=license`
     * `PROJECT_LOG_SCOPES=license,waiting-executions`
     */
    @Env('PROJECT_LOG_SCOPES')
    scopes: CommaSeparatedStringArray<LogScope> = [];
}
