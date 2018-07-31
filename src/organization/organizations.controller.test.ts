import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';


describe('OrganizationsController', () => {
    let controller: OrganizationsController;
    let service: OrganizationsService;
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
                    "entities": [Organization],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Organization]),
            ],
            controllers:[
                OrganizationsController
            ],
            providers:[
                OrganizationsService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<OrganizationsService>(OrganizationsService);
        controller = mod.get<OrganizationsController>(OrganizationsController);
    });

    describe('findAll', () => {
        it('Should return all organizations.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created organization', async () => {

            let text = '{"Name": "This", "Phone": "4504200420", "Email": "email@this.org", '+
                            '"Fax": "4504201420", "ManagerEmail": "el.senior.rodriguez@aye.caramba.me"}';
            let dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.Name).toBe("This");
            expect(result.Phone).toBe("4504200420");
            expect(result.Email).toBe("email@this.org");
            expect(result.Fax).toBe("4504201420");
            expect(result.Manager.Email).toBe("el.senior.rodriguez@aye.caramba.me");
        })
    })

    describe('findOneById', () => {
        it('Should return organization with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the adress with the id', async ()=> {
            
            
            const text = '{"Id": '+ id +', "Name": "This", "Phone": "4504200420", "Email": "update@this.org", '+
                            '"Fax": "4504201420", "ManagerEmail": "el.senior.rodriguez@aye.caramba.me"}';
            const dto = JSON.parse(text);
            await controller.update(dto);
            
            let result = await controller.findOneById(id);
            await expect(result.Email).toBe("update@this.org");
        });
    });

    describe('delete', () => {
        it('Should delete organization with the id', async ()=>{
            
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});