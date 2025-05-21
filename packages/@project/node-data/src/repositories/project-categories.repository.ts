import { AbstractRepository } from "./abstract.repository";
import { Service } from '@project/node-decorator'

@Service({ singleton: true })
export class ProjectCategoriesRepository extends AbstractRepository {
    constructor() {
        super('projectsCategories')
    }
}
