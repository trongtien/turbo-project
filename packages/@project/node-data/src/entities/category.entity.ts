import {
    pgTableCreator,
    text,
    varchar,
} from "drizzle-orm/pg-core";
import { abstractEntity } from "./abstract.entity";
import { sql } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `hono_${name}`);

export const categoryEntity = pgTable("category", {
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description").default(sql`NULL`),
    ...abstractEntity
});