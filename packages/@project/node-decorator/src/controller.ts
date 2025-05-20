import { ControllerRegistryMetadata } from './controllerRegistryMetadata';
import { container } from 'tsyringe';

export function Controller(basePath = '/'): ClassDecorator {
    return (target: any) => {
        const registry = container.resolve(ControllerRegistryMetadata);
        const meta = registry.get(target);
        meta.basePath = basePath;
    };
}

function createMethodDecorator(method: 'get' | 'post' | 'put' | 'delete') {
    return (path: string, ...middlewares: Function[]): MethodDecorator =>
        (target, propertyKey) => {
            const registry = container.resolve(ControllerRegistryMetadata);
            const meta = registry.get(target.constructor);
            meta.routes.push({
                method,
                path,
                handlerName: propertyKey as string,
                middlewares,
            });
        };
}

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');
