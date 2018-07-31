import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';

describe('RoomsController', () => {
    let controller: RoomsController;
    let service: RoomsService;
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
                    "entities": [Room],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Room]),
            ],
            controllers:[
                RoomsController
            ],
            providers:[
                RoomsService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<RoomsService>(RoomsService);
        controller = mod.get<RoomsController>(RoomsController);
    });

    describe('findAll', () => {
        it('Should return all rooms.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created room', async () => {

            const text = '{"Name": "A room", "NbPlaces": 42}';
            const dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.Name).toBe("A room");
            expect(result.NbPlaces).toBe(42);
            expect(result.ServicePoint.Id).toBe(id);
        })
    })

    describe('findOneById', () => {
        it('Should return room with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the room with the id', async ()=> {
            
            const text = '{"Id": '+ id +', "Name": "A room", "NbPlaces": 42}';
            const dto = await JSON.parse(text);
            await controller.update(dto);

            let result = await controller.findOneById(id);
            expect(result.Name).toBe("A new room");
        });
    });

    describe('delete', () => {
        it('Should delete room with the id', async ()=> {
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});