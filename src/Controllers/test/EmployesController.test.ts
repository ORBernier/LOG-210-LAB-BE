import { Test } from '@nestjs/testing';
import { EmployesController } from '../EmployesController';
import { RQRSDARepository } from '../../Services/RQRSDARepository';

describe('LabelsController', () => {
    let employeController: EmployesController;
    let employeService: RQRSDARepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({

            controllers: [EmployesController],
            components: [RQRSDARepository],
        }).compile();

        employeService = module.get<RQRSDARepository>(RQRSDARepository);
        employeController = module.get<EmployesController>(EmployesController);
    });

    describe('Get', () => {
        it('should return an array of labels', async () => {
            const result = ['test'];
            jest.spyOn(employeService, 'findAll').mockImplementation(() => result);

            expect(await employeController.root()).toBe(result);
        });
    });
});