import { UsersController } from '../user/users.controller';
import { UsersService } from '../user/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './userDto/create-user.dto';
import { Repository } from '../../node_modules/typeorm';


describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeAll(async () => {
        const mod: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    "type": "mysql",
                    "host": "127.0.0.1",
                    "port": 3306,
                    "username": "root",
                    "password": "root",
                    "database": "test",
                    "entities": [User],
                    "synchronize": false
                  }),
                TypeOrmModule.forFeature([User])
            ],
            controllers:[
                UsersController
            ],
            providers:[
                UsersService
            ],
            components: [
                {
                    provide: 'UserRepository',
                    useClass: Repository
                }
            ]
        }).compile();
        service = mod.get<UsersService>(UsersService);
        controller = mod.get<UsersController>(UsersController);
    });

    describe('findAll', () => {
        it('Should return all users.', async ()=>{
            const result = ['test'];
            jest.spyOn(service, 'findAll').mockImplementation(()=>result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('findOneByEmail', () => {
        it('Should return user with email test@test.ca', async ()=>{
            
            
            const user = '{"Email":"test@test.ca", "Role":"test"}';
            const dto = JSON.parse(user);
            controller.create(dto);

            jest.spyOn(service, 'findOneByEmail').mockImplementation(()=>dto);
            let result = await controller.findOneByEmail("test@test.ca");
            expect(result.Email).toBe("test@test.ca");
        });
    });

    describe('update', () => {
        it('Should update user test@test.ca role to role', async ()=>{
            
            
            const user = '{"Email":"test@test.ca", "Role":"role"}';
            const dto = JSON.parse(user);
            controller.update(dto);

            jest.spyOn(service, 'findOneByEmail').mockImplementation(()=>true);

            let result = await controller.findOneByEmail("test@test.ca");
            expect(result);
        });
    });

    describe('delete', () => {
        it('Should delete user test@test.ca', async ()=>{
            
            
            const user = '{"Email":"test@test.ca"}';
            const dto = JSON.parse(user);
            controller.delete(dto);

            let result = await controller.findOneByEmail("test@test.ca");
            expect(result);
        });
    });


});