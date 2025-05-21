import { CategoryRepository } from '../../repositories/category.repository';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { AbstractDatabaseConnect } from '../../abstract-database-connect';
import { categoryEntity } from '../../entities';

describe('Category Repository', () => {
    let connect: AbstractDatabaseConnect
    let categoryRepo: CategoryRepository

    const MOCK_DATA_CREATE_CATEGORY: InferInsertModel<typeof categoryEntity> = {
        name: "test",
        description: "test"
    }

    beforeAll(async () => {
        connect = new AbstractDatabaseConnect()
        await connect.onConnect()

        categoryRepo = new CategoryRepository()

    });

    afterAll(async () => {
        connect.endConnect()
    });

    it('Should be insert category', async () => {
        const inserted = await categoryRepo.create(MOCK_DATA_CREATE_CATEGORY)
        expect(inserted).toHaveLength(1);
        expect(inserted?.[0]?.name).toBe(MOCK_DATA_CREATE_CATEGORY.name);
        expect(inserted?.[0]?.description).toBe(MOCK_DATA_CREATE_CATEGORY.description);
    });


    it('Should be find one category', async () => {
        const inserted = await categoryRepo.create(MOCK_DATA_CREATE_CATEGORY)
        expect(inserted).toHaveLength(1);
        const id = (inserted?.[0]?.id || '') as string

        const findOneRecord = await categoryRepo.findById(id)

        expect(findOneRecord?.id).toBe(id);
        expect(findOneRecord?.name).toBe(MOCK_DATA_CREATE_CATEGORY.name);
        expect(findOneRecord?.description).toBe(MOCK_DATA_CREATE_CATEGORY.description);
    });

    it('Should be update category', async () => {
        const inserted = await categoryRepo.create(MOCK_DATA_CREATE_CATEGORY)
        expect(inserted).toHaveLength(1);
        const id = (inserted?.[0]?.id || '') as string

        let findOneRecord = await categoryRepo.findById(id) as InferSelectModel<typeof categoryEntity> | undefined

        expect(findOneRecord?.id).toBe(id);
        expect(findOneRecord?.name).toBe(MOCK_DATA_CREATE_CATEGORY.name);
        expect(findOneRecord?.description).toBe(MOCK_DATA_CREATE_CATEGORY.description);

        if (findOneRecord) {
            const MOCk_DATA_NAME = "Update"
            findOneRecord.name = MOCk_DATA_NAME
            const updateRecord = await categoryRepo.update(id, findOneRecord)

            expect(updateRecord?.id).toBe(id);
            expect(updateRecord?.name).toBe(MOCk_DATA_NAME);
            expect(updateRecord?.description).toBe(MOCK_DATA_CREATE_CATEGORY.description);
        }
    });
})
