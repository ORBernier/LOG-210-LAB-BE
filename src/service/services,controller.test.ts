import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

describe('ServicesController', () => {
    let controller: ServicesController;
    let service: ServicesService;
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
                    "entities": [Service],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Service]),
            ],
            controllers:[
                ServicesController
            ],
            providers:[
                ServicesService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<ServicesService>(ServicesService);
        controller = mod.get<ServicesController>(ServicesController);
    });

    describe('findAll', () => {
        it('Should return all services.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created service', async () => {

            const text = '{"Name": "A service", "Description": "Something", "IsActive": true}';
            const dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.Name).toBe("A service");
            expect(result.Description).toBe("Something");
            expect(result.IsActive).toBe(true);
        })
    })

    describe('findOneById', () => {
        it('Should return service with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the service with the id', async ()=> {
            
            const text = '{"Id": '+ id +', "Name": "A service", "Description": "Some other thing", "IsActive": true}';
            const dto = await JSON.parse(text);
            await controller.update(dto);

            let result = await controller.findOneById(id);
            expect(result.Description).toBe("Some other thing");
        });
    });

    describe('delete', () => {
        it('Should delete service with the id', async ()=> {
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});