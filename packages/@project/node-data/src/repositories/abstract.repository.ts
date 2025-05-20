import { eq, InferInsertModel, InferSelectModel, SQL } from "drizzle-orm";
import { AnyPgTable } from "drizzle-orm/pg-core";
import { SchemaDatabaseConnect } from "types";
import { Service } from '@project/node-decorator'
import { AbstractDatabaseConnect } from "../abstract-database-connect";

@Service({ singleton: true })
export class AbstractRepository extends AbstractDatabaseConnect {
    protected table: AnyPgTable

    constructor(schemaName: keyof SchemaDatabaseConnect) {
        super()
        this.table = this.schema[schemaName]
    }

    async findMany() {
        return await this.db.select().from(this.table);
    }

    async findById(id: string) {
        const [record] = await this.db.select().from(this.table)
            .where(eq(this.keyTable(), id))

        return record;
    }

    async create(data: InferInsertModel<typeof this.table>) {
        return await this.db.insert(this.table).values(data).returning()
    }

    async update(id: string, data: InferSelectModel<typeof this.table>) {
        const [record] = await this.db.update(this.table)
            .set(data)
            .where(eq(this.keyTable(), id))
            .returning()
        return record
    }

    async findOne(conditions: Partial<typeof this.table>) {
        const [record] = await this.db
            .select()
            .from(this.table)
            .where(this.createWhereClause(conditions)[0]);

        return record || null;
    }

    async delete(id: string) {
        const [result] = await this.db
            .delete(this.table)
            .where(eq(this.keyTable(), id))
            .returning();

        return result;
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