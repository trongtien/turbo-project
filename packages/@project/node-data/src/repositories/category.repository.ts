import { AbstractRepository } from "./abstract.repository";
import { Service } from '@project/node-decorator'

@Service({ singleton: true })
export class CategoryRepository extends AbstractRepository {
    constructor() {
        super('category')
    }
}
