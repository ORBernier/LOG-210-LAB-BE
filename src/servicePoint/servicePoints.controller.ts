import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { ServicePoint } from './servicePoint.entity';
import { ServicePointsService } from './servicePoints.service';
import { CreateServicePointDto } from './servicePointDto/create-servicePoint.dto';
import { UpdateServicePointDto } from './servicePointDto/update-servicePoint.dto';
import { DeleteServicePointDto } from './servicePointDto/delete-servicePoint.dto';

@Controller('service_points')
export class ServicePointsController {

    constructor(private readonly service: ServicePointsService) {}

    @Get()
     async findAll():  Promise<ServicePoint[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateServicePointDto) {

        return await this.service.create(dto);
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