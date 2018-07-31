import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { ServicePointsController } from './servicePoints.controller';
import { ServicePointsService } from './servicePoints.service';
import { ServicePoint } from './servicePoint.entity';

describe('OrganizationsController', () => {
    let controller: ServicePointsController;
    let service: ServicePointsService;
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
                    "database": "back-end",
                    "entities": [ServicePoint],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([ServicePoint]),
            ],
            controllers:[
                ServicePointsController
            ],
            providers:[
                ServicePointsService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<ServicePointsService>(ServicePointsService);
        controller = mod.get<ServicePointsController>(ServicePointsController);
    });

    describe('findAll', () => {
        it('Should return all service points.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created service point', async () => {

            const text = '{"Name": "A place", "Phone": "4504202420", "Email": "email@aplace.sp", "Fax": "4504203420"}';
            const dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.Name).toBe("A place");
            expect(result.Phone).toBe("4504202420");
            expect(result.Email).toBe("email@aplace.sp");
            expect(result.Fax).toBe("4504203420");
        })
    })

    describe('findOneById', () => {
        it('Should return service point with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the service point with the id', async ()=> {
            
            const text = '{"Id": '+ id +', "Name": "A place", "Phone": "4504202420", "Email": "update@aplace.sp", "Fax": "4504203420"}';
            const dto = await JSON.parse(text);
            await controller.update(dto);

            let result = await controller.findOneById(id);
            expect(result.Email).toBe("update@aplace.sp");
        });
    });

    describe('delete', () => {
        it('Should delete service point with the id', async ()=> {
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});