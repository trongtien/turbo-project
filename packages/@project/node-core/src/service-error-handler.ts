export class ServiceErrorHandler extends Error {
    public readonly code: string;
    public readonly status: number;
    public readonly source: string;
    public readonly validateError: any[]

    constructor(message: string, code: string, status: number, source: string, validateError?: any[]) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.status = status;
        this.source = source;
        this.validateError = validateError || []

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ServiceServiceError extends ServiceErrorHandler {
    constructor(message: string, code: string, status: number = 400) {
        super(message, code, status, 'service');
    }
}

export class ValidationError extends ServiceErrorHandler {
    constructor(message: string, code: string = 'INVALID_INPUT', status: number = 400, validateError?: any) {
        super(message, code, status, 'service', validateError);
    }
}
