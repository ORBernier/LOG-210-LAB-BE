import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdateUserDto } from './userDto/update-user.dto';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
      ) {}
    

    async create(Email: string, Role: string) {

        const employe = new User();

        employe.Email = Email;
        employe.Role = Role;

        await this.users.save(employe);
    }

    async findAll(): Promise<User[]> {

        return await this.users.find();
    }

    async findOneByEmail(Email: string): Promise<User> {

        return await this.users.findOne(Email);
    }

    async update(dto: UpdateUserDto) {

        const employe = new User();

        employe.Email = dto.Email;
        employe.Role = dto.Role;

        await this.users.update(dto.Email, employe);
    }

    async Delete(Email: string) {
        
        await this.users.delete(Email);
    }
}