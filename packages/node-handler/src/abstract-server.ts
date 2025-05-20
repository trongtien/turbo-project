import { Hono } from 'hono'
import { GlobalConfig } from '@project/node-config';
import { LoggerService } from '@project/node-core';
import { ControllerRegistryMetadata, container } from '@project/node-decorator';
import { serve, type ServerType } from '@hono/node-server'
import { AbstractDatabaseConnect } from "@project/node-data";

export abstract class AbstractServer {
    protected app: Hono
    protected server: ServerType
    protected logger: LoggerService = container.resolve(LoggerService)

    protected readonly uniqueInstanceId: string;

    protected readonly globalConfig: GlobalConfig = container.resolve(GlobalConfig)
    private readonly abstractConnectDatabase: AbstractDatabaseConnect = container.resolve(AbstractDatabaseConnect)


    constructor() {
      this.app = new Hono()
    }

    async onInitModule(): Promise<void> {
      await Promise.allSettled([
          this.commonMiddlewares(),
          this.loadRouter(),
          this.setupCorsMiddlewares(),
          this.abstractConnectDatabase.onConnect()
      ])
    }

    async start(port: number) {
        try {
            this.server = serve({
                fetch: this.app.fetch,
                port: port
            })
            this.logger.info(`Service start success`)
        } catch (error) {
            this.logger.error(`Service start error ${error}`)
        }
    }

    async onShutdown() {
        process.on("SIGINT", () => {
            this.logger.info(`Service Close`)
            this.server.close()
            process.exit(0)
        })

        process.on("SIGTERM", () => {
            this.server.close((err) => {
                if (err) {
                    this.logger.error(`${err}`)
                    process.exit(1)
                }
                process.exit(0)
            })
        })
    }

    private commonMiddlewares() {

    }

    private loadRouter() {
        const registry = container.resolve(ControllerRegistryMetadata);

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
