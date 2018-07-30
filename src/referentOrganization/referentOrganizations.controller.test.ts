import { Repository } from '../../node_modules/typeorm';
import { AdressesService } from 'adress/adresses.service';
import { Adress } from 'adress/adress.entity';
import { OrganizationsService } from 'organization/organizations.service';
import { Organization } from 'organization/organization.entity';
import { UsersService } from 'user/users.service';
import { User } from 'user/user.entity';
import { ReferentOrganizationsController } from './referentOrganizations.controller';
import { ReferentOrganizationsService } from './referentOrganizations.service';
import { ReferentOrganization } from './referentOrganization.entity';

describe('ServicePointsController', () => {
    let controller: ReferentOrganizationsController;
    let adressesService: AdressesService;
    let adressesRepo: Repository<Adress>;
    let userService: UsersService;
    let userRepo: Repository<User>;
    let orgService: OrganizationsService;
    let orgRepo: Repository<Organization>;
    let service: ReferentOrganizationsService;
    let repo: Repository<ReferentOrganization>;
    

    beforeEach(() => {
        repo = new Repository<ReferentOrganization>();
        service = new ReferentOrganizationsService(repo);
        adressesRepo = new Repository<Adress>();
        adressesService = new AdressesService(adressesRepo);
        userRepo = new Repository<User>();
        userService = new UsersService(userRepo);
        orgRepo = new Repository<Organization>();
        orgService = new OrganizationsService(orgRepo);
        controller = new ReferentOrganizationsController(orgService, adressesService, service);
    });

    describe('Test referent organizations', () => {
        it('Should test the referent organizations controller, service and entity.', async () => {

            let text = await '{"DoorNumber": 200, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            let dto = await JSON.parse(text);
            let adressId = await adressesService.create(dto);

            text = await '{"Email":"el.senior.rodriguez@aye.caramba.me", "Role":"Directeur"}';
            dto = await JSON.parse(text);
            await userService.create(dto);

            text = await '{"Name": "This", "AdressId": '+ adressId +', "Phone": "4504200420", "Email": "email@this.org", '+
                            '"Fax": "4504201420", "ManagerEmail": "el.senior.rodriguez@aye.caramba.me"}';
            dto = await JSON.parse(text);
            let manager = await userService.findOneByEmail("el.senior.rodriguez@aye.caramba.me");
            let adress = await adressesService.findOneById(adressId);
            let orgId = await orgService.create(dto, manager, adress);

            text = await '{"DoorNumber": 200, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            dto = await JSON.parse(text);
            adressId = await adressesService.create(dto);
            
            text = await '{"Name": "Referent Org", "AdressId": '+ adressId +', "Phone": "4504204420", "Email": "email@referent.org", '+
                            '"Fax": "4504205420", WebSite: "referentorg.com", "IsActive": true, "OrganizationId": '+ orgId +'}';
            dto = await JSON.parse(text);
            let id = await controller.create(dto);

            let result = await controller.findOneById(id);
            await expect(result.Name).toBe("Referent Org");
            await expect(result.Adress.Id).toBe(adressId);
            await expect(result.Phone).toBe("4504204420");
            await expect(result.Email).toBe("email@referent.org");
            await expect(result.Fax).toBe("4504205420");
            await expect(result.WebSite).toBe("referentorg.com");
            await expect(result.IsActive).toBe(true);
            await expect(result.Organization.Id).toBe(orgId);

            text = await '{"Id": '+ id +', "Name": "Referent Org", "AdressId": '+ adressId +', "Phone": "4504204420", "Email": "update@referent.org", '+
                            '"Fax": "4504205420", WebSite: "referentorg.com", "IsActive": true, "OrganizationId": '+ orgId +'}';
            dto = await JSON.parse(text);
            await controller.update(dto);

            result = await controller.findOneById(id);
            await expect(result.Email).toBe("update@referent.org");

            text = await '{"Id":'+ id +'}';
            dto = await JSON.parse(text);
            await controller.delete(dto);

            let Allresult = await controller.findAll();
            await expect(Allresult).toBe([]);
        });
    });
});