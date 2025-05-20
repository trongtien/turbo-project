import { categoryEntity } from "entities"



export interface DatabaseConnect {
    host: string
    port: number
    username: string
    password: string
    database: string
}


export type SchemaDatabaseConnect = {
    category: typeof categoryEntity
}