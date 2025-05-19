import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serve, type ServerType } from '@hono/node-server'

export abstract class AbstractServer {
    protected app: Hono
    protected server: ServerType
    readonly uniqueInstanceId: string;


    constructor() {
        this.app = new Hono()
    }

    private commonMiddlewares() {
        this.app.use(logger())
    }

    private setupCorsMiddlewares() {

    }

    async start(port: number) {
        await this.commonMiddlewares()
        await this.setupCorsMiddlewares()

        this.server = serve({
            fetch: this.app.fetch,
            port: port
        })
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
}