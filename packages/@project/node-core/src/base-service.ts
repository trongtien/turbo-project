import type { ServiceResult } from './interfaces';
import { LoggerService } from './logger';
import { container } from '@project/node-decorator'


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