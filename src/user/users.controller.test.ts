import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Repository } from '../../node_modules/typeorm';
import { Test } from '@nestjs/testing';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    let repo: Repository<User>;
    

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
          }).compile();
    
        service = module.get<UsersService>(UsersService);
        controller = module.get<UsersController>(UsersController);
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
            let allResult = await controller.findAll();
            
            await expect(allResult).toBe([]);
        });
    });
});