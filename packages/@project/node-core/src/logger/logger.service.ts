import { Service } from '@project/node-decorator';
import { GlobalConfig, InstanceSettingsConfig } from '@project/node-config';
import * as LoggerProxy from './logger-proxy';
import path from 'path'
import winston from 'winston';
// import pc from 'picocolors';
import { basename } from 'node:path';
import callsites from 'callsites';
import { LOG_LEVELS, LogLevel, LogLocationMetadata, LogMetadata, Logger, Logger as LoggerType } from './logger.type';

const noOp = () => { };

@Service({ singleton: true })
export class LoggerService implements LoggerType {
    private logger: winston.Logger;
    private readonly level: LogLevel;
    private readonly scopes: Set<string>;
    private readonly noColor = !!process.env.NO_COLOR;

    constructor(
        private readonly globalConfig: GlobalConfig,
        private readonly instanceSettingsConfig: InstanceSettingsConfig
    ) {
        const isRoot = true
        const level = globalConfig.logging.level || 'error'

        this.level = level
        this.scopes = new Set(globalConfig.logging.scopes ?? []);

        const silent = level?.toString() === 'silent';

        this.logger = winston.createLogger({
            level: this.level,
            silent,
        });

        if (!silent) {
            this.configureTransports(globalConfig);
            this.disableLowerLevels();
        }

        if (isRoot) LoggerProxy.init(this);
    }

    scoped(scope: string | string[]): Logger {
        const scopes = Array.isArray(scope) ? scope : [scope];
        const childLogger = new LoggerService(this.globalConfig, this.instanceSettingsConfig);

        childLogger.setInternalLogger(this.logger.child({ scopes }));
        return childLogger;
    }

    private setInternalLogger(logger: winston.Logger) {
        this.logger = logger;
    }

    private configureTransports(config: GlobalConfig) {
        const { outputs } = config.logging;

        if (outputs.includes('console')) {
            const consoleTransport = new winston.transports.Console();
            // Set format if supported by your winston version
            // @ts-expect-error: format is supported in recent winston versions
            consoleTransport.format = this.consoleFormat();
            this.logger.add(consoleTransport);
        }

        if (outputs.includes('file')) {
            const filename = path.join(
                this.instanceSettingsConfig.projectFolder,
                config.logging.file.location
            );

            const fileTransport = new winston.transports.File({
                filename,
                maxsize: config.logging.file.fileSizeMax * 1_048_576,
                maxFiles: config.logging.file.fileCountMax,
            });
            // @ts-expect-error: format is supported in recent winston versions
            fileTransport.format = winston.format.combine(
                winston.format.timestamp(),
                winston.format.metadata(),
                winston.format.json()
            );
            this.logger.add(fileTransport);
        }
    }

    private disableLowerLevels() {
        const levels = this.logger.levels;

        for (const lvl of LOG_LEVELS) {
            if (
                levels &&
                typeof levels[lvl] === 'number' &&
                typeof levels[this.level] === 'number' &&
                levels && levels[lvl]! > levels[this.level]!
            ) {
                Object.defineProperty(this, lvl, { value: noOp });
            }
        }
    }

    private log(level: LogLevel, message: string, metadata: LogMetadata) {

        const location: LogLocationMetadata = {};

        const caller = callsites().at(2);
        if (caller) {
            location.file = basename(caller.getFileName() ?? '');
            location.function = caller.getFunctionName() ?? '';
        }

        const fileLocationPath = location?.file ? `file: ${location?.file}, ` : ""
        const fileLocationSymbol = location?.function ? `function: ${location?.function}` : ""
        const stringMsg = `{ ${fileLocationPath} ${fileLocationSymbol} } ${message || ''}`

        this.logger.log(level, stringMsg, { ...metadata });
    }

    private consoleFormat() {
        return winston.format.combine(
            winston.format.timestamp({ format: () => this.devTsFormat() }),
            winston.format.metadata(),
            this.noColor ? winston.format.uncolorize() : winston.format.colorize({ all: true }),
            this.scopeFilter(),
            // winston.format.printf(({ level, message, metadata, timestamp }: { level: string; message: string; timestamp: string; metadata: unknown }) => {
            // console.table({
            //     level, message, timestamp, metadata
            // })
            // const formattedMetadata = this.formatMetadata(metadata);
            // const levelText = level.toUpperCase().padEnd(this.noColor ? 5 : 15, ' ');
            // return `${levelText || ''} ${timestamp || ''} ${message}${JSON.stringify(formattedMetadata) ? ' ' + JSON.stringify(pc.dim(formattedMetadata)) : ''}`;
            // })
        );
    }

    private scopeFilter() {
        return winston.format((info: { metadata: { scopes: any; }; }) => {
            if (!this.scopes.size) return info;

            const scopes = (info.metadata?.scopes ?? []) as string[];
            return scopes.some((s) => this.scopes.has(s)) ? info : false;
        })();
    }

    // private formatMetadata(metadata: unknown): string {
    //     if (metadata && typeof metadata === 'object' && Object.keys(metadata).length) {
    //         return JSON.stringify(metadata, null, 2);
    //     }
    //     return '';
    // }

    private devTsFormat() {
        const now = new Date();
        const time = now.toISOString().split('T')[1] ?? ''
        return time.replace('Z', '');
    }

    // #region Convenience
    error(msg: string, meta: LogMetadata = {}) {
        this.log('error', msg, meta);
    }

    warn(msg: string, meta: LogMetadata = {}) {
        this.log('warn', msg, meta);
    }

    info(msg: string, meta: LogMetadata = {}) {
        this.log('info', msg, meta);
    }

    debug(msg: string, meta: LogMetadata = {}) {
        this.log('debug', msg, meta);
    }

    getInternalLogger() {
        return this.logger;
    }
    // #endregion
}
