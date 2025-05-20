import { singleton } from 'tsyringe';

type RouteMetaMethod = 'get' | 'post' | 'put' | 'delete';

export interface RouteMeta {
    method: RouteMetaMethod
    path: string;
    handlerName: string;
    middlewares?: Function[];
}

export interface ControllerMeta {
    basePath: string;
    routes: RouteMeta[];
}

@singleton()
export class ControllerRegistryMetadata {
    private controllers = new Map<Function, ControllerMeta>();

    get(target: Function): ControllerMeta {
        if (!this.controllers.has(target)) {
            this.controllers.set(target, { basePath: '/', routes: [] });
        }
        return this.controllers.get(target)!;
    }

    getAll() {
        return Array.from(this.controllers.entries());
    }
}
