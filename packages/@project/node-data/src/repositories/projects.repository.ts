import { AbstractRepository } from "./abstract.repository";
import { Service } from '@project/node-decorator'

@Service({ singleton: true })
export class ProjectsRepository extends AbstractRepository {
    constructor() {
        super('projects')
    }
}
