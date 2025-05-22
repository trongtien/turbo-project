import { ResultService } from '@project/node-core';
import { Service } from '@project/node-decorator';
import { ProjectsRepository } from '@project/node-data'

@Service({ singleton: true })
export class ProjectsService extends ResultService {
    constructor(private readonly projectsRepository: ProjectsRepository) {
        super()
    }

    async create(data: { name: string, description?: string }) {
        const result = await this.projectsRepository.create(data)
        if (!result.success) {
            return this.Err(result.error)
        }

        return this.Ok(result)
    }


    async update(id: string, data: { id: string, name: string, description: string }) {
        const result = await this.projectsRepository.update(id, data)
        if (!result.success) {
            this.logger.error(`Update Project failed error ${result.error}`)
            return this.Err(result.error)
        }


        return this.Ok(result)
    }
}