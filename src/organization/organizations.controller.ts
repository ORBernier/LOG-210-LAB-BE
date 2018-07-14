import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './organizationDto/create-organization.dto';
import { UpdateOrganizationDto } from './organizationDto/update-organization.dto';
import { DeleteOrganizationDto } from './organizationDto/delete-organization.dto';
import { UsersService } from 'user/users.service';


@Controller('organizations')
export class OrganizationsController {

    constructor(
        private readonly userService: UsersService,
        private readonly service: OrganizationsService) {}

    @Get()
     async findAll():  Promise<Organization[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateOrganizationDto) {

        let manager = await this.userService.findOneByEmail(dto.ManagerEmail);

        return await this.service.create(dto, manager);
    }

    @Put()
    async update(@Body() dto: UpdateOrganizationDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteOrganizationDto) {
        
        return await this.service.delete(dto.Id);
    }
}