import 'reflect-metadata';
import { AbstractServer } from "@node-handler/abstract-server";

class Server extends AbstractServer {
    constructor() {
        super();
    }

    async start(): Promise<void> {
        console.log("start project")
        console.log("Server start Project 3000")
        await super.start(3000)
    }
}


new Server().start()