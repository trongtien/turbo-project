import { BaseService } from '@project/node-core';
import { Service } from '@project/node-decorator';

@Service({ singleton: true })
export class ProjectService extends BaseService {
    constructor() {
        super()
    }
}