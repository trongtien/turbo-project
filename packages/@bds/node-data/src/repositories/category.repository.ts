import { AbstractRepository } from "./abstract.repository";

export class CategoryRepository extends AbstractRepository {
    constructor() {
        super('category')
    }
}