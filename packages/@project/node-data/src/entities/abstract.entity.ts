import {
    boolean,
    text,
    uuid,
    timestamp
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const abstractEntity = {
    id: uuid('uuid2').default(sql`gen_random_uuid()`).primaryKey(),
    is_deleted: boolean('is_deleted').default(false),

    utc_created_on: timestamp('utc_created_on', { mode: 'string' }).notNull().defaultNow(),
    utc_updated_on: timestamp('utc_updated_on', { mode: 'string' }).notNull().defaultNow(),

    created_by: text("created_by").default(sql`NULL`),
    updated_by: text("updated_by").default(sql`NULL`),
};