import { Pool, type PoolClient } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import type { DatabaseConnect, SchemaDatabaseConnect } from "types/abstract-database-connect.type";
import { categoryEntity } from "entities";


export class AbstractDatabaseConnect {
    private _client: PoolClient
    private _db: NodePgDatabase<SchemaDatabaseConnect>
    private _pool: Pool

    constructor() {
    }

    get client(): PoolClient {
        return this._client;
    }

    get db() {
        return this._db
    }

    get schema(): SchemaDatabaseConnect {
        return {
            category: categoryEntity
        }
    }

    async initConnect(optionConnect: DatabaseConnect) {
        const { host, port, database, username, password } = optionConnect
        const pool = new Pool({
            host: host,
            database: database,
            user: username,
            password: password,
            port: port,
        });

        this._pool = pool
        const client = await pool.connect();
        this._client = client

        this._db = drizzle(client, { schema: this.schema })
    }

    async endConnect(): Promise<void> {
        await this._pool.end()
    }


}