import { Repository } from '../../node_modules/typeorm';
import { ServicePointsService } from 'servicePoint/servicePoints.service';
import { ServicePoint } from 'servicePoint/servicePoint.entity';
import { ServicesService } from 'service/services.service';
import { Service } from 'service/service.entity';
import { AdressesService } from 'adress/adresses.service';
import { Adress } from 'adress/adress.entity';
import { OrganizationsService } from 'organization/organizations.service';
import { Organization } from 'organization/organization.entity';
import { UsersService } from 'user/users.service';
import { User } from 'user/user.entity';
import { PricingsController } from './pricings.controller';
import { PricingsService } from './pricings.service';
import { Pricing } from './pricing.entity';

describe('UsersController', () => {
    let controller: PricingsController;
    let adressesService: AdressesService;
    let adressesRepo: Repository<Adress>;
    let userService: UsersService;
    let userRepo: Repository<User>;
    let orgService: OrganizationsService;
    let orgRepo: Repository<Organization>;
    let servPointService: ServicePointsService;
    let servPointRepo: Repository<ServicePoint>;
    let servService: ServicesService;
    let servRepo: Repository<Service>;
    let service: PricingsService;
    let repo: Repository<Pricing>;
    

    beforeEach(() => {
        repo = new Repository<Pricing>();
        service = new PricingsService(repo);
        adressesRepo = new Repository<Adress>();
        adressesService = new AdressesService(adressesRepo);
        userRepo = new Repository<User>();
        userService = new UsersService(userRepo);
        orgRepo = new Repository<Organization>();
        orgService = new OrganizationsService(orgRepo);
        servPointRepo = new Repository<ServicePoint>();
        servPointService = new ServicePointsService(servPointRepo);
        servRepo = new Repository<Service>();
        servService = new ServicesService(servRepo);
        controller = new PricingsController(servService, service);
    });

    describe('Test pricings', () => {
        it('Should test the pricings controller, service and entity.', async () => {

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
            
            text = await '{"Name": "A place", "AdressId": '+ adressId +', "Phone": "4504202420", "Email": "email@aplace.sp", '+
                            '"Fax": "4504203420", "OrganizationId": '+ orgId +'}';
            dto = await JSON.parse(text);
            let org = await orgService.findOneById(orgId);
            adress = await adressesService.findOneById(adressId);
            let servPointId = await servPointService.create(dto, org, adress);

            text = await '{"Name": "A service", "Description": "Something", "IsActive": true, "ServicePointId": '+ servPointId +'}';
            dto = await JSON.parse(text);
            let servPoint = await servPointService.findOneById(servPointId);
            let servId = await servService.create(dto, servPoint);

            text = await '{"ParentsPrincing": 35, IsSubventioned: true, CISSSPricing: 20, StartDate: "2018-07-30", "ServiceId": '+ servId +'}';
            dto = await JSON.parse(text);
            let id = await controller.create(dto);

            let result = await controller.findOneById(id);
            await expect(result.ParentsPrincing).toBe(35);
            await expect(result.IsSubventioned).toBe(true);
            await expect(result.CISSSPricing).toBe(20);
            await expect(result.StartDate).toBe(new Date("2018-07-30"));
            await expect(result.Service.Id).toBe(servId);

            text = await '{"Id": '+ id +', "ParentsPrincing": 35, IsSubventioned: false, CISSSPricing: 20, StartDate: "2018-07-30", "ServiceId": '+ servId +'}';
            dto = await JSON.parse(text);
            await controller.update(dto);

            result = await controller.findOneById(id);
            await expect(result.IsSubventioned).toBe(false);

            text = await '{"Id":'+ id +'}';
            dto = await JSON.parse(text);
            await controller.delete(dto);

            let Allresult = await controller.findAll();
            await expect(Allresult).toBe([]);
        });
    });
});