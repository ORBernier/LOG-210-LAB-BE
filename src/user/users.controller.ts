import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdateUserDto } from './userDto/update-user.dto';
import { DeleteUserDto } from './userDto/delete-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Get()
     async findAll():  Promise<User[]> {

        return await this.service.findAll();
    }

    async findOneByEmail(Email: string): Promise<User> {

        return await this.service.findOneByEmail(Email);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {

        return await this.service.create(dto);
    }

    @Put()
    async update(@Body() dto: UpdateUserDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteUserDto) {
        
        return await this.service.Delete(dto.Email);
    }
}