import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { ServicePoint } from './servicePoint.entity';
import { ServicePointsService } from './servicePoints.service';
import { CreateServicePointDto } from './servicePointDto/create-servicePoint.dto';
import { UpdateServicePointDto } from './servicePointDto/update-servicePoint.dto';
import { DeleteServicePointDto } from './servicePointDto/delete-servicePoint.dto';
import { OrganizationsService } from 'organization/organizations.service';

@Controller('service_points')
export class ServicePointsController {

    constructor(
        private readonly service: ServicePointsService,
        private readonly organizationService: OrganizationsService) {}

    @Get()
    async findAll():  Promise<ServicePoint[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateServicePointDto) {

        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        return await this.service.create(dto, organization);
    }

    @Put()
    async update(@Body() dto: UpdateServicePointDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteServicePointDto) {
        
        return await this.service.Delete(dto.Id);
    }
}