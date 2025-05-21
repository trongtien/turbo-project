import { RepositoryError } from '@project/node-core';
import { eq, InferInsertModel, InferSelectModel, SQL } from "drizzle-orm";
import { AnyPgTable } from "drizzle-orm/pg-core";
import { SchemaDatabaseConnect } from "../types";
import { AbstractDatabaseConnect } from "../abstract-database-connect";
import { Service } from '@project/node-decorator'
@Service({ singleton: true })
export class AbstractRepository extends AbstractDatabaseConnect {
    protected table: AnyPgTable

    constructor(schemaName: keyof SchemaDatabaseConnect) {
        super()
        this.table = this.schema[schemaName]
    }

    async findMany() {
        try {
            const result = await this.db.select().from(this.table);
            return this.Ok(result)
        } catch (error) {
            return this.Err(new RepositoryError(`${error}`).toJSON())
        }
    }

    async findById(id: string) {
        try {
            const [record] = await this.db.select().from(this.table)
                .where(eq(this.keyTable(), id))

            return this.Ok(record);
        } catch (error) {
            return this.Err(new RepositoryError(`${error}`).toJSON())
        }
    }

    async create(data: InferInsertModel<typeof this.table>) {
        try {
            const record = await this.db.insert(this.table).values(data).returning()
            return this.Ok(record)
        } catch (error) {
            return this.Err(new RepositoryError(`${error}`).toJSON())
        }
    }

    async update(id: string, data: InferSelectModel<typeof this.table>) {
        try {
            const [record] = await this.db.update(this.table)
                .set(data)
                .where(eq(this.keyTable(), id))
                .returning()
            return this.Ok(record)
        } catch (error) {
            return this.Err(new RepositoryError(`${error}`).toJSON())
        }
    }

    async findOne(conditions: Partial<typeof this.table>) {
        try {
            const [record] = await this.db
                .select()
                .from(this.table)
                .where(this.createWhereClause(conditions)[0]);

            return this.Ok(record || null);
        } catch (error) {
            return this.Err(new RepositoryError(`${error}`).toJSON())
        }
    }

    async delete(id: string) {
        try {
            const [result] = await this.db
                .delete(this.table)
                .where(eq(this.keyTable(), id))
                .returning();

            return this.Ok(result);
        } catch (error) {
            return this.Err(new RepositoryError(`${error}`).toJSON())
        }
    }

    protected createWhereClause(conditions: Partial<typeof this.table>): SQL[] {
        return Object.entries(conditions).map(([key, value]) =>
            eq(this.keyTable(key), value as any)
        );
    }

    private keyTable(key?: string) {
        return (this.table as any)[key || 'id'];
    }
}