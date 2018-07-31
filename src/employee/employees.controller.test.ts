import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';


describe('EmployeesController', () => {
    let controller: EmployeesController;
    let service: EmployeesService;
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
                    "entities": [Employee],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Employee]),
            ],
            controllers:[
                EmployeesController
            ],
            providers:[
                EmployeesService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<EmployeesService>(EmployeesService);
        controller = mod.get<EmployeesController>(EmployeesController);
    });

    describe('findAll', () => {
        it('Should return all employees.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created employee', async () => {

            let text = '{"FirstName": "Leon", "LastName": "Vance", "Phone": "2023478856", "Role": "Directeur"}';
            let dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.FirstName).toBe("Leon");
            expect(result.LastName).toBe("Vance");
            expect(result.Phone).toBe("2023478856");
            expect(result.RoleOrganization).toBe("Directeur");
        })
    })

    describe('findOneById', () => {
        it('Should return employee with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the employee with the id', async ()=> {
            
            
            const text = '{"Id": '+ id +', "FirstName": "Leon", "LastName": "Vance", "Phone": "2023036677", "Role": "Directeur"}';
            const dto = JSON.parse(text);
            await controller.update(dto);
            
            let result = await controller.findOneById(id);
            expect(result.Phone).toBe("2023036677");
        });
    });

    describe('delete', () => {
        it('Should delete employee with the id', async ()=>{
            
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});