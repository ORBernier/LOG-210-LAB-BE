import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { Pricing } from './pricing.entity';
import { PricingsService } from './pricings.service';
import { CreatePricingDto } from './pricingDto/create-pricing.dto';
import { UpdatePricingDto } from './pricingDto/update-pricing.dto';
import { DeletePricingDto } from './pricingDto/delete-pricing.dto';
import { ServicesService } from '../service/services.service';

@Controller('pricings')
export class PricingsController {

    constructor(
        private readonly servicesService: ServicesService,
        private readonly service: PricingsService) {}

    @Get()
     async findAll():  Promise<Pricing[]> {

        return await this.service.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') Id): Promise<Pricing> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreatePricingDto): Promise<number> {

        let service = await this.servicesService.findOneById(dto.ServiceId);

        return await this.service.create(dto, service);
    }

    @Put()
    async update(@Body() dto: UpdatePricingDto) {

        let service = await this.servicesService.findOneById(dto.ServiceId);

        return await this.service.update(dto, service);
    }

    @Delete()
    async delete(@Body() dto: DeletePricingDto) {
        
        return await this.service.Delete(dto.Id);
    }
}