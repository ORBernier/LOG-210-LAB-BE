import { Repository } from '../../node_modules/typeorm';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';
import { Adress } from './adress.entity';

describe('AdressesController', () => {
    let controller: AdressesController;
    let service: AdressesService;
    let repo: Repository<Adress>;
    

    beforeEach(() => {
        repo = new Repository<Adress>();
        service = new AdressesService(repo);
        controller = new AdressesController(service);
    });

    describe('Test adresses', () => {
        it('Should test the adresses controller, service and entity.', async () => {

            let text = await '{"DoorNumber": 200, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            let dto = await JSON.parse(text);
            let id = await controller.create(dto);
            let result = await controller.findOneById(id);

            await expect(result.DoorNumber).toBe(200);
            await expect(result.Street).toBe("Georges VI");
            await expect(result.City).toBe("Terrebonne");
            await expect(result.Province).toBe("Qc");
            await expect(result.PostalCode).toBe("J6Y1P1");

            text = await '{"DoorNumber": 250, "Street": "Georges VI", "City": "Terrebonne", "Province": "Qc", "PostalCode": "J6Y1P1"}';
            dto = await JSON.parse(text);
            await controller.update(dto);
            result = await controller.findOneById(id);

            await expect(result.DoorNumber).toBe(250);

            text = await '{"Id":'+ id +'}';
            dto = await JSON.parse(text);
            await controller.delete(dto);
            let Allresult = await controller.findAll();
            
            await expect(Allresult).toBe([]);
        });
    });
});