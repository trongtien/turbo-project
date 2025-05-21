import { categoriesEntity, projectsEntity, projectsCategoriesEntity } from "entities"




export type SchemaDatabaseConnect = {
    categories: typeof categoriesEntity,
    projects: typeof projectsEntity,
    projectsCategories: typeof projectsCategoriesEntity
}