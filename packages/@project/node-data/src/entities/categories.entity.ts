import {
    pgTableCreator,
    text,
    varchar,
} from "drizzle-orm/pg-core";
import { abstractEntity } from "./abstract-entity";
import { sql } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `project_${name}`);

export const categoriesEntity = pgTable("categories", {
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description").default(sql`NULL`),
    ...abstractEntity
});