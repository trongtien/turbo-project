import { Pool, type PoolClient } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import type { SchemaDatabaseConnect } from "./types/abstract-database-connect.type";
import { categoriesEntity, projectsCategoriesEntity, projectsEntity } from "./entities";
import { Service, container } from '@project/node-decorator'
import { GlobalConfig } from '@project/node-config'
import { LoggerService } from '@project/node-core'


@Service({ singleton: true })
export class AbstractDatabaseConnect {
  private _client: PoolClient
  private _db: NodePgDatabase<SchemaDatabaseConnect>
  private _pool: Pool

  private readonly logger: LoggerService = container.resolve(LoggerService)
  private readonly globalConfig = container.resolve(GlobalConfig)

  get client(): PoolClient {
    return this._client;

  }

  get db() {
    return this._db
  }

  get schema(): SchemaDatabaseConnect {
    return {
      categories: categoriesEntity,
      projects: projectsEntity,
      projectsCategories: projectsCategoriesEntity
    }
  }

  async onConnect() {
    try {
      const { host, user, password, port, database } = this.globalConfig.database.optionConfig
      const pool = new Pool({
        host: host,
        database: database,
        user: user,
        password: password,
        port: port,
      });

      this._pool = pool
      const client = await pool.connect();
      this._client = client

      this._db = drizzle(client, { schema: this.schema })
      this.logger.info(`Connect database success`)
    } catch (error) {
      this.logger.error(`Can not connect database failed error ${error}`)
    }
  }

  async endConnect(): Promise<void> {
    await this._pool.end()
  }
}
