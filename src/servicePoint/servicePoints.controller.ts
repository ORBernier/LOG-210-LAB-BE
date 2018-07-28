import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { ServicePoint } from './servicePoint.entity';
import { ServicePointsService } from './servicePoints.service';
import { CreateServicePointDto } from './servicePointDto/create-servicePoint.dto';
import { UpdateServicePointDto } from './servicePointDto/update-servicePoint.dto';
import { DeleteServicePointDto } from './servicePointDto/delete-servicePoint.dto';
import { OrganizationsService } from 'organization/organizations.service';
import { AdressesService } from 'adress/adresses.service';

@Controller('service_points')
export class ServicePointsController {

    constructor(
        private readonly service: ServicePointsService,
        private readonly adressesService: AdressesService,
        private readonly organizationService: OrganizationsService) {}

    @Get()
    async findAll():  Promise<ServicePoint[]> {

        return await this.service.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') Id): Promise<ServicePoint> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateServicePointDto): Promise<number> {

        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        let adress = await this.adressesService.findOneById(dto.AdressId);

        return await this.service.create(dto, organization, adress);
    }

    @Put()
    async update(@Body() dto: UpdateServicePointDto) {
        
        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        let adress = await this.adressesService.findOneById(dto.AdressId);

        return await this.service.update(dto, organization, adress);
    }

    @Delete()
    async delete(@Body() dto: DeleteServicePointDto) {
        
        return await this.service.Delete(dto.Id);
    }
}