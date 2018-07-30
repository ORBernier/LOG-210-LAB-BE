import { Repository } from '../../node_modules/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { UsersService } from 'user/users.service';
import { User } from 'user/user.entity';
import { Adress } from 'adress/adress.entity';
import { AdressesService } from 'adress/adresses.service';

describe('UsersController', () => {
    let controller: OrganizationsController;
    let adressesService: AdressesService;
    let adressesRepo: Repository<Adress>;
    let userService: UsersService;
    let userRepo: Repository<User>;
    let service: OrganizationsService;
    let repo: Repository<Organization>;
    

    beforeEach(() => {
        repo = new Repository<Organization>();
        service = new OrganizationsService(repo);
        adressesRepo = new Repository<Adress>();
        adressesService = new AdressesService(adressesRepo);
        userRepo = new Repository<User>();
        userService = new UsersService(userRepo);
        controller = new OrganizationsController(userService, adressesService, service);
    });

    describe('Test organizations', () => {
        it('Should test the organizations controller, service and entity.', async () => {

            let text = await '{"DoorNumber": 200, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            let dto = await JSON.parse(text);
            let adressId = await adressesService.create(dto);

            text = await '{"Email":"el.senior.rodriguez@aye.caramba.me", "Role":"Directeur"}';
            dto = await JSON.parse(text);
            await userService.create(dto);

            text = await '{"Name": "This", "AdressId": '+ adressId +', "Phone": "4504200420", "Email": "email@this.org", '+
                            '"Fax": "4504201420", "ManagerEmail": "el.senior.rodriguez@aye.caramba.me"}';
            dto = await JSON.parse(text);
            let id = await controller.create(dto);

            let result = await controller.findOneById(id);
            await expect(result.Name).toBe("This");
            await expect(result.Adress.Id).toBe(adressId);
            await expect(result.Phone).toBe("4504200420");
            await expect(result.Email).toBe("email@this.org");
            await expect(result.Fax).toBe("4504201420");
            await expect(result.Manager.Email).toBe("el.senior.rodriguez@aye.caramba.me");

            text = await '{"Id": '+ id +', "Name": "This", "AdressId": '+ adressId +', "Phone": "4504200420", "Email": "update@this.org", '+
                            '"Fax": "4504201420", "ManagerEmail": "el.senior.rodriguez@aye.caramba.me"}';
            dto = await JSON.parse(text);
            await controller.update(dto);

            result = await controller.findOneById(id);
            await expect(result.Email).toBe("update@this.org");

            text = await '{"Id":'+ id +'}';
            dto = await JSON.parse(text);
            await controller.delete(dto);

            let Allresult = await controller.findAll();
            await expect(Allresult).toBe([]);
        });
    });
});