import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '../../node_modules/@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [TypeOrmModule.forFeature([User])],
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    describe('Test user', () => {
        it('Should return the user created.', async () => {

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