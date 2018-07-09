import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { Service } from './service.entity';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './serviceDto/create-service.dto';
import { UpdateServiceDto } from './serviceDto/update-service.dto';
import { DeleteServiceDto } from './serviceDto/delete-service.dto';

@Controller('services')
export class ServicesController {

    constructor(private readonly service: ServicesService) {}

    @Get()
     async findAll():  Promise<Service[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateServiceDto) {

        return await this.service.create(dto);
    }

    @Put()
    async update(@Body() dto: UpdateServiceDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteServiceDto) {
        
        return await this.service.Delete(dto.Id);
    }
}