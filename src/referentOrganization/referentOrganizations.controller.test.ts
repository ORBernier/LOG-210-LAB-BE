import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { ReferentOrganizationsController } from './referentOrganizations.controller';
import { ReferentOrganizationsService } from './referentOrganizations.service';
import { ReferentOrganization } from './referentOrganization.entity';

describe('ReferentOrganizationsController', () => {
    let controller: ReferentOrganizationsController;
    let service: ReferentOrganizationsService;
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
                    "entities": [ReferentOrganization],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([ReferentOrganization]),
            ],
            controllers:[
                ReferentOrganizationsController
            ],
            providers:[
                ReferentOrganizationsService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<ReferentOrganizationsService>(ReferentOrganizationsService);
        controller = mod.get<ReferentOrganizationsController>(ReferentOrganizationsController);
    });

    describe('findAll', () => {
        it('Should return all referent organizations.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created referent organization', async () => {

            const text = '{"Name": "Referent Org", "Phone": "4504204420", "Email": "email@referent.org", '+
                            '"Fax": "4504205420", WebSite: "referentorg.com", "IsActive": true}';
            const dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.Name).toBe("Referent Org");
            expect(result.Phone).toBe("4504204420");
            expect(result.Email).toBe("email@referent.org");
            expect(result.Fax).toBe("4504205420");
            expect(result.WebSite).toBe("referentorg.com");
            expect(result.IsActive).toBe(true);
        })
    })

    describe('findOneById', () => {
        it('Should return referent organization with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the referent organization with the id', async ()=> {
            
            const text = '{"Id": '+ id +', "Name": "Referent Org", "Phone": "4504204420", "Email": "update@referent.org", '+
                            '"Fax": "4504205420", WebSite: "referentorg.com", "IsActive": true}';
            const dto = await JSON.parse(text);
            await controller.update(dto);

            let result = await controller.findOneById(id);
            expect(result.Email).toBe("update@referent.org");
        });
    });

    describe('delete', () => {
        it('Should delete referent organization with the id', async ()=> {
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});