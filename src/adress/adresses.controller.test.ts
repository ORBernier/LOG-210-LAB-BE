import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';
import { Adress } from './adress.entity';


describe('AdressesController', () => {
    let controller: AdressesController;
    let service: AdressesService;
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
                    "entities": [Adress],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Adress])
            ],
            controllers:[
                AdressesController
            ],
            providers:[
                AdressesService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<AdressesService>(AdressesService);
        controller = mod.get<AdressesController>(AdressesController);
    });

    describe('findAll', () => {
        it('Should return all adresses.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created adress', async () => {
            let text = '{"DoorNumber": 200, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            let dto = JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.DoorNumber).toBe(200);
            expect(result.Street).toBe("Georges VI");
            expect(result.City).toBe("Terrebonne");
            expect(result.Province).toBe("Qc");
            expect(result.PostalCode).toBe("J6Y1P1");
        })
    })

    describe('findOneById', () => {
        it('Should return adress with Id = id', async ()=>{

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the adress with the id', async ()=>{
            
            
            const text = '{"Id": '+ id +', "DoorNumber": 250, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            const dto = JSON.parse(text);
            await controller.update(dto);

            let result = await controller.findOneById(id);
            expect(result.DoorNumber).toBe(250);
        });
    });

    describe('delete', () => {
        it('Should delete adress with the id', async ()=>{
            
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});