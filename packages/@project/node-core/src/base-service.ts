import type { ServiceResult } from './interfaces';
import { LoggerService } from './logger';
import { container } from '@project/node-decorator'

export class BaseError extends Error {
    public readonly code: string;
    public readonly status: number;
    public readonly source: string;

    constructor(message: string, code: string, status: number, source: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.status = status;
        this.source = source;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            source: this.source,
            status: this.status,
        };
    }
}

export class ServiceError extends BaseError {
    constructor(message: string, code: string, status: number = 400) {
        super(message, code, status, 'service');
    }
}

export class ValidationError extends BaseError {
    constructor(message: string, code: string = 'INVALID_INPUT', status: number = 400) {
        super(message, code, status, 'service');
    }
}

export class RepositoryError extends BaseError {
    constructor(message: string) {
        super(message, 'DATABASE_SERVER_ERROR', 500, 'repository');
    }
}

export class SystemError extends BaseError {
    constructor(message: string, code: string = 'SYSTEM_ERROR', status: number = 500) {
        super(message, code, status, 'system');
    }
}

export abstract class BaseService {
    protected readonly logger: LoggerService = container.resolve(LoggerService)

    protected Ok<T>(data: any): ServiceResult<T> {
        return {
            success: true,
            data: data
        }
    }

    protected Err<T>(error: any): ServiceResult<T> {
        return {
            success: false,
            error: error
        }
    }
}