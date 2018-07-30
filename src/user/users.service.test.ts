import { UsersService } from './users.service';
import { User } from './user.entity';
import { Repository } from '../../node_modules/typeorm';

describe('UsersController', () => {
    
    let service: UsersService;
    let repo: Repository<User>;
    

    beforeEach(() => {
        repo = new Repository<User>();
        service = new UsersService(repo);
        
    });

    describe('Test users service', () => {
        it('Should test the user creation.', async () => {

            await service.create("handsome.jack@hyperion.space", "Low-Level Programmer");

            let user = await service.findOneByEmail("handsome.jack@hyperion.space");

            expect(user.Email).toBe("handsome.jack@hyperion.space");
            expect(user.Role).toBe("Low-Level Programmer");
        });
    });
});