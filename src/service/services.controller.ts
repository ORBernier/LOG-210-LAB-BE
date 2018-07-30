import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { Service } from './service.entity';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './serviceDto/create-service.dto';
import { UpdateServiceDto } from './serviceDto/update-service.dto';
import { DeleteServiceDto } from './serviceDto/delete-service.dto';
import { ServicePointsService } from 'servicePoint/servicePoints.service';

@Controller('services')
export class ServicesController {

    constructor(
        private readonly servicePointService: ServicePointsService,
        private readonly service: ServicesService) {}

    @Get()
     async findAll():  Promise<Service[]> {

        return await this.service.findAll();
    }

    
    async findSomeByServPointId(@Param('serv_point_id') Id): Promise<Service[]> {

        let service = await this.servicePointService.findOneById(Id);

        return await this.service.findSomeByServPoint(service);
    }

    @Get(':id')
    async findOneById(@Param('id') Id): Promise<Service> {

        return await this.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateServiceDto): Promise<number> {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        return await this.service.create(dto, servicePoint);
    }

    @Put()
    async update(@Body() dto: UpdateServiceDto) {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        return await this.service.update(dto, servicePoint);
    }

    @Delete()
    async delete(@Body() dto: DeleteServiceDto) {
        
        return await this.service.Delete(dto.Id);
    }
}