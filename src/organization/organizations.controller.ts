import { Get, Post, Delete, Put, Controller, Body, Inject } from '@nestjs/common';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './organizationDto/create-organization.dto';
import { UpdateOrganizationDto } from './organizationDto/update-organization.dto';
import { DeleteOrganizationDto } from './organizationDto/delete-organization.dto';
import { Employe } from 'employe/employe.entity';
import { EmployesService } from 'employe/employes.service';


@Controller('organizations')
export class OrganizationsController {

    constructor(
        private readonly employeServerice: EmployesService,
        private readonly service: OrganizationsService) {

    }

    @Get()
     async findAll():  Promise<Organization[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateOrganizationDto) {

        //const coord = await this.empService.findOneById(dto.ManagerId);

        let emp = await this.employeServerice.findOneById(dto.ManagerId);

        return await this.service.create(dto, emp);      
    }

    @Put()
    async update(@Body() dto: UpdateOrganizationDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteOrganizationDto) {
        
        return await this.service.Delete(dto.Id);
    }
}