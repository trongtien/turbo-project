


export const LOG_LEVELS = ['silent', 'error', 'warn', 'info', 'debug'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];


export type Logger = Record<
    Exclude<LogLevel, 'silent'>,
    (message: string, metadata?: LogMetadata) => void
>;

export type LogMetadata = {
    [key: string]: unknown;
    scopes?: LogScope[];
    file?: string;
    function?: string;
};

export type LogLocationMetadata = Pick<LogMetadata, 'file' | 'function'>;

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