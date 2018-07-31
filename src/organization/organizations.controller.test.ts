import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from '../../node_modules/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { AdressesService } from 'adress/adresses.service';
import { Adress } from 'adress/adress.entity';
import { UsersService } from 'user/users.service';
import { User } from 'user/user.entity';
import { AdressesModule } from 'adress/adresses.module';
import { UsersModule } from 'user/users.module';


describe('OrganizationsController', () => {
    let controller: OrganizationsController;
    let adressesService: AdressesService;
    let userService: UsersService;
    let service: OrganizationsService;
    let id: number;
    let adressId: number

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
                    "entities": [Organization, Adress, User],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([Organization, Adress, User]),
                AdressesModule, UsersModule
            ],
            controllers:[
                OrganizationsController
            ],
            providers:[
                OrganizationsService, AdressesService, UsersService
            ],
            components: [
                {
                    provide: 'Repository',
                    useClass: Repository
                }
            ]
        }).compile();
        adressesService = mod.get<AdressesService>(AdressesService);
        userService = mod.get<UsersService>(UsersService);
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
            let text = await '{"DoorNumber": 200, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            let dto = await JSON.parse(text);
            adressId = await adressesService.create(dto);

            text = await '{"Email":"el.senior.rodriguez@aye.caramba.me", "Role":"Directeur"}';
            dto = await JSON.parse(text);
            await userService.create(dto);

            text = await '{"Name": "This", "AdressId": '+ adressId +', "Phone": "4504200420", "Email": "email@this.org", '+
                            '"Fax": "4504201420", "ManagerEmail": "el.senior.rodriguez@aye.caramba.me"}';
            dto = await JSON.parse(text);
            let objectId = await controller.create(dto);

            let result = await controller.findOneById(objectId);
            expect(result.Name).toBe("This");
            expect(result.Adress.Id).toBe(adressId);
            expect(result.Phone).toBe("4504200420");
            expect(result.Email).toBe("email@this.org");
            expect(result.Fax).toBe("4504201420");
            expect(result.Manager.Email).toBe("el.senior.rodriguez@aye.caramba.me");

            text = await '{"Id":'+ objectId +'}';
            dto = await JSON.parse(text);
            await controller.delete(dto);
        })
    })

    describe('findOneById', () => {
        it('Should return organization with Id = id', async ()=> {
            
            
            const text = '{"DoorNumber": 200, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            const dto = JSON.parse(text);
            id = await controller.create(dto);

            let result = await controller.findOneById(id);
            expect(result.Id).toBe(id);
        });
    });

    describe('update', () => {
        it('Should update the adress with the id', async ()=> {
            
            
            const text = '{"Id": '+ id +', "Name": "This", "AdressId": '+ adressId +', "Phone": "4504200420", "Email": "update@this.org", '+
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