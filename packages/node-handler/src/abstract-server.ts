import { ControllerRegistryMetadata, container } from '@bds/node-decorator';
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serve, type ServerType } from '@hono/node-server'

console.log("@bds/node-decorator", typeof ControllerRegistryMetadata)

export abstract class AbstractServer {
    protected app: Hono
    protected server: ServerType
    readonly uniqueInstanceId: string;


    constructor() {
        this.app = new Hono()
    }

    async start(port: number) {
        try {
            await Promise.allSettled([
                this.commonMiddlewares(),
                this.loadRouter(),
                this.setupCorsMiddlewares()
            ])

            this.server = serve({
                fetch: this.app.fetch,
                port: port
            })
        } catch (error) {

        }
    }

    async onShutdown() {
        process.on("SIGINT", () => {
            this.server.close()
            process.exit(0)
        })

        process.on("SIGTERM", () => {
            this.server.close((err) => {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
                process.exit(0)
            })
        })
    }

    private commonMiddlewares() {
        this.app.use(logger())
    }

    private loadRouter() {
        const registry = container.resolve(ControllerRegistryMetadata);
        console.log("Load router", registry)
        const controllers = registry.getAll();
        for (const [ControllerClass, meta] of controllers) {
            const instance = container.resolve(ControllerClass as any);

            for (const route of meta.routes) {
                const fullPath = `${meta.basePath}${route.path}`.replace(/\/+/g, '/');

                const handler = instance[route.handlerName].bind(instance);

                // Nếu có middleware thì wrap lại
                const routeHandler = route.middlewares?.length
                    ? [...route.middlewares, handler]
                    : handler;

                this.app[route.method](fullPath, ...(Array.isArray(routeHandler) ? routeHandler : [routeHandler]));
            }
        }
    }

    private setupCorsMiddlewares() {

    }

}