import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { PricingsController } from './pricings.controller';
import { PricingsService } from './pricings.service';
import { Pricing } from './pricing.entity';

describe('ReferentsController', () => {
    let controller: PricingsController;
    let service: PricingsService;
    let id: number;

    beforeAll(async () => {
        const mod: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    "type": "mysql",
                    "host": "127.0.0.1",
                    "port": 3306,
                    "username": "root",
                    "password": "root",
                    "database": "test",
                    "entities": [Pricing],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Pricing]),
            ],
            controllers:[
                PricingsController
            ],
            providers:[
                PricingsService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<PricingsService>(PricingsService);
        controller = mod.get<PricingsController>(PricingsController);
    });

    describe('findAll', () => {
        it('Should return all pricings.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created pricing', async () => {

            const text = '{"ParentsPrincing": 35, IsSubventioned: true, CISSSPricing: 20, StartDate: "2018-07-30"}';
            const dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.ParentsPrincing).toBe(35);
            expect(result.IsSubventioned).toBe(true);
            expect(result.CISSSPricing).toBe(20);
            expect(result.StartDate).toBe(new Date("2018-07-30"));
        })
    })

    describe('findOneById', () => {
        it('Should return pricing with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the pricing with the id', async ()=> {
            
            const text = '{"Id": '+ id +', "ParentsPrincing": 35, IsSubventioned: false, CISSSPricing: 20, StartDate: "2018-07-30"}';
            const dto = await JSON.parse(text);
            await controller.update(dto);

            let result = await controller.findOneById(id);
            expect(result.IsSubventioned).toBe(false);
        });
    });

    describe('delete', () => {
        it('Should delete pricing with the id', async ()=> {
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});