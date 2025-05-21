import { BaseService } from '@project/node-core';
import { Service } from '@project/node-decorator';
import { ProjectsRepository } from '@project/node-data'

@Service({ singleton: true })
export class ProjectsService extends BaseService {
    constructor(private readonly projectsRepository: ProjectsRepository) {
        super()
    }

    async create(data: { name: string, description?: string }) {
        try {
            const result = await this.projectsRepository.create(data)
            
            return this.Ok(result)
        } catch (error) {
            return this.Err(error)
        }
    }
}