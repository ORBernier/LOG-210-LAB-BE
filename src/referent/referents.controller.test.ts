import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { ReferentsController } from './referents.controller';
import { ReferentsService } from './referents.service';
import { Referent } from 'referent/referent.entity';
import { ReferentOrganization } from 'referentOrganization/referentOrganization.entity';
import { Adress } from 'adress/adress.entity';
import { Organization } from 'organization/organization.entity';
import { User } from 'user/user.entity';

describe('ReferentsController', () => {
    let controller: ReferentsController;
    let service: ReferentsService;
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
                    "entities": [Referent, ReferentOrganization, Adress, Organization, User],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Referent, ReferentOrganization, Adress, Organization, User]),
            ],
            controllers:[
                ReferentsController
            ],
            providers:[
                ReferentsService
            ],
            components: [
                {
                    provide: 'RefRepository',
                    useClass: Repository
                },
                {
                    provide: 'RefOrgRepository',
                    useClass: Repository
                },
                {
                    provide: 'OrganizationRepository',
                    useClass: Repository
                },
                {
                    provide: 'UserRepository',
                    useClass: Repository
                },
                {
                    provide: 'AdressRepository',
                    useClass: Repository
                },
            ]
        }).compile();
        service = mod.get<ReferentsService>(ReferentsService);
        controller = mod.get<ReferentsController>(ReferentsController);
    });

    describe('findAll', () => {
        it('Should return all referents.', async ()=> {
            const result = [];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('Should return the id of the created referent', async () => {

            const text = '{"Name": "Leeroy Jethro Gibbs", "Title": "Special Agent", "CellularPhone": "2028325223", "Phone": "2025426245", '+
                            '"Email": "jethro.gibbs@ncis.gov", "Fax": "2025426246", "IsPaper": true, "IsEmail": false, "IsFax": false}';
            const dto = await JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.Name).toBe("Leeroy Jethro Gibbs");
            expect(result.Title).toBe("Special Agent");
            expect(result.CellularPhone).toBe("2028325223");
            expect(result.Phone).toBe("2025426245");
            expect(result.Email).toBe("jethro.gibbs@ncis.gov");
            expect(result.Fax).toBe("2025426246");
            expect(result.IsPaper).toBe(true);
            expect(result.IsEmail).toBe(false);
            expect(result.IsFax).toBe(false);
        })
    })

    describe('findOneById', () => {
        it('Should return referent with Id = id', async ()=> {

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the referent with the id', async ()=> {
            
            const text = '{"Id": '+ id +', "Name": "Leeroy Jethro Gibbs", "Title": "Special Agent", "CellularPhone": "2028325223", "Phone": "2025426245", '+
                            '"Email": "jethro.gibbs@ncis.gov", "Fax": "2025426246", "IsPaper": true, "IsEmail": true, "IsFax": false}';
            const dto = await JSON.parse(text);
            await controller.update(dto);

            let result = await controller.findOneById(id);
            expect(result.IsEmail).toBe(true);
        });
    });

    describe('delete', () => {
        it('Should delete referent with the id', async ()=> {
            
            const text = '{"Id": '+ id +'}';
            const dto = JSON.parse(text);
            controller.delete(dto);

            let result = await controller.findOneById(id);
            expect(result);
        });
    });
});