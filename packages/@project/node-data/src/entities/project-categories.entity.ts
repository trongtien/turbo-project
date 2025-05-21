import { pgTableCreator } from "drizzle-orm/pg-core";
import { abstractEntity } from "./abstract-entity";
import { uuid } from "drizzle-orm/pg-core";
import { projectsEntity } from "./projects.entity";
import { categoriesEntity } from "./categories.entity";
import { relations } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `project_${name}`);

export const projectsCategoriesEntity = pgTable("project_categories", {
    projectId: uuid('project_id').references(() => projectsEntity.id).notNull(),
    categoryId: uuid('category_id').references(() => categoriesEntity.id).notNull(),
    ...abstractEntity
});

export const projectCategoriesRelations = relations(projectsCategoriesEntity, ({ one }) => ({
    project: one(projectsEntity, {
        fields: [projectsCategoriesEntity.projectId],
        references: [projectsEntity.id]
    }),
    category: one(categoriesEntity, {
        fields: [projectsCategoriesEntity.categoryId],
        references: [categoriesEntity.id],
    }),
}));