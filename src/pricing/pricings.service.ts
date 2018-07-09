import { Injectable } from '@nestjs/common';
import { Pricing } from './pricing.entity';
import { CreatePricingDto } from './pricingDto/create-pricing.dto';
import { UpdatePricingDto } from './pricingDto/update-pricing.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PricingsService {
    
    constructor(
        @InjectRepository(Pricing)
        private readonly pricings: Repository<Pricing>
      ) {}
    

    async create(dto: CreatePricingDto) {

        const pricing = new Pricing();

        pricing.ParentsPrincing = dto.ParentsPrincing;
        pricing.IsSubventioned = dto.IsSubventioned;
        pricing.CISSSPricing = dto.CISSSPricing;
        pricing.StartDate = dto.StartDate;

        await this.pricings.save(pricing);
    }

    async findAll(): Promise<Pricing[]> {

        return await this.pricings.find();
    }

    async update(dto: UpdatePricingDto) {

        try {

            const pricing = new Pricing();

            pricing.ParentsPrincing = dto.ParentsPrincing;
            pricing.IsSubventioned = dto.IsSubventioned;
            pricing.CISSSPricing = dto.CISSSPricing;
            pricing.StartDate = dto.StartDate;
            
            await this.pricings.update(dto.Id, pricing);

        } catch (e) {

        }
    }

    async Delete(id: number) {
        try {
        
            await this.pricings.delete(id);

        } catch (e) {

        }
    }
}