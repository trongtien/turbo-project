import { AbstractServer } from "./abstract-server";

class Server extends AbstractServer {
    constructor() {
        super();
    }

    async start(): Promise<void> {
        await super.start(3000)
    }
}


new Server().start()