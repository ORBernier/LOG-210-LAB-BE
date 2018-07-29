import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Repository } from '../../node_modules/typeorm';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    let repo: Repository<User>;
    

    beforeEach(() => {
        repo = new Repository<User>();
        service = new UsersService(repo);
        controller = new UsersController(service);
    });

    describe('Test user', () => {
        it('Should test the user creation.', async () => {

            let text = await '{"Email":"el.senior.rodriguez@aye.caramba.me", "Role":"Directeur"}';
            let dto = await JSON.parse(text);
            await controller.create(dto);
            let result = await controller.findOneByEmail("el.senior.rodriguez@aye.caramba.me");

            await expect(result.Email).toBe("el.senior.rodriguez@aye.caramba.me");
            await expect(result.Role).toBe("Directeur");

            text = await '{"Email":"el.senior.rodriguez@aye.caramba.me", "Role":"Intervenant"}';
            dto = await JSON.parse(text);
            await controller.update(dto);
            result = await controller.findOneByEmail("el.senior.rodriguez@aye.caramba.me");

            await expect(result.Role).toBe("Intervernant");

            text = await '{"Email":"el.senior.rodriguez@aye.caramba.me"}';
            dto = await JSON.parse(text);
            await controller.delete(dto);
            let Allresult = await controller.findAll();
            
            await expect(Allresult).toBe([]);
        });
    });
});