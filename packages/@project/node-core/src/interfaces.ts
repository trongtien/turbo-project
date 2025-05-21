

export type ServiceResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: {
        name: string;
        message: string;
        code: string;
        source: string;
        status?: number;
    };
}


export type TypeError = 'repository'