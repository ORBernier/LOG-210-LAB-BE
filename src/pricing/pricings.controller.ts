import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { Pricing } from './pricing.entity';
import { PricingsService } from './pricings.service';
import { CreatePricingDto } from './pricingDto/create-pricing.dto';
import { UpdatePricingDto } from './pricingDto/update-pricing.dto';
import { DeletePricingDto } from './pricingDto/delete-pricing.dto';

@Controller('pricings')
export class PricingsController {

    constructor(private readonly service: PricingsService) {}

    @Get()
     async findAll():  Promise<Pricing[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreatePricingDto) {

        return await this.service.create(dto);
    }

    @Put()
    async update(@Body() dto: UpdatePricingDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeletePricingDto) {
        
        return await this.service.Delete(dto.Id);
    }
}