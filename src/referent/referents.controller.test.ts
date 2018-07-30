import { Repository } from '../../node_modules/typeorm';
import { AdressesService } from 'adress/adresses.service';
import { Adress } from 'adress/adress.entity';
import { OrganizationsService } from 'organization/organizations.service';
import { Organization } from 'organization/organization.entity';
import { UsersService } from 'user/users.service';
import { User } from 'user/user.entity';
import { ReferentOrganizationsService } from 'referentOrganization/referentOrganizations.service';
import { ReferentOrganization } from 'referentOrganization/referentOrganization.entity';
import { ReferentsController } from './referents.controller';
import { ReferentsService } from './referents.service';
import { Referent } from './referent.entity';

describe('UsersController', () => {
    let controller: ReferentsController;
    let adressesService: AdressesService;
    let adressesRepo: Repository<Adress>;
    let userService: UsersService;
    let userRepo: Repository<User>;
    let orgService: OrganizationsService;
    let orgRepo: Repository<Organization>;
    let refOrgService: ReferentOrganizationsService;
    let refOrgRepo: Repository<ReferentOrganization>;
    let service: ReferentsService;
    let repo: Repository<Referent>;
    

    beforeEach(() => {
        repo = new Repository<Referent>();
        service = new ReferentsService(repo);
        adressesRepo = new Repository<Adress>();
        adressesService = new AdressesService(adressesRepo);
        userRepo = new Repository<User>();
        userService = new UsersService(userRepo);
        orgRepo = new Repository<Organization>();
        orgService = new OrganizationsService(orgRepo);
        refOrgRepo = new Repository<ReferentOrganization>();
        refOrgService = new ReferentOrganizationsService(refOrgRepo);
        controller = new ReferentsController(refOrgService, service);
    });

    describe('Test referents', () => {
        it('Should test the referents controller, service and entity.', async () => {

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
            let org = await orgService.findOneById(orgId);
            adress = await adressesService.findOneById(adressId);
            let refOrgId = await refOrgService.create(dto, org, adress);

            text = await '{"Name": "Leeroy Jethro Gibbs", "Title": "Special Agent", "CellularPhone": "2028325223", "Phone": "2025426245", "Email": "jethro.gibbs@ncis.gov", '+
                            '"Fax": "2025426246", "IsPaper": true, "IsEmail": false, "IsFax": false, "ReferentOrgId": '+ refOrgId +'}';
            dto = await JSON.parse(text);
            let id = await controller.create(dto);

            let result = await controller.findOneById(id);
            await expect(result.Name).toBe("Leeroy Jethro Gibbs");
            await expect(result.Title).toBe("Special Agent");
            await expect(result.CellularPhone).toBe("2028325223");
            await expect(result.Phone).toBe("2025426245");
            await expect(result.Email).toBe("jethro.gibbs@ncis.gov");
            await expect(result.Fax).toBe("2025426246");
            await expect(result.IsPaper).toBe(true);
            await expect(result.IsEmail).toBe(false);
            await expect(result.IsFax).toBe(false);
            await expect(result.ReferentOrganization.Id).toBe(refOrgId);

            text = await '{"Id": '+ id +', "Name": "Leeroy Jethro Gibbs", "Title": "Special Agent", "CellularPhone": "2028325223", "Phone": "2025426245", '+
                            '"Email": "jethro.gibbs@ncis.gov", "Fax": "2025426246", "IsPaper": true, "IsEmail": true, "IsFax": false, "ReferentOrgId": '+ refOrgId +'}';
            dto = await JSON.parse(text);
            await controller.update(dto);

            result = await controller.findOneById(id);
            await expect(result.IsEmail).toBe(true);

            text = await '{"Id":'+ id +'}';
            dto = await JSON.parse(text);
            await controller.delete(dto);

            let Allresult = await controller.findAll();
            await expect(Allresult).toBe([]);
        });
    });
});