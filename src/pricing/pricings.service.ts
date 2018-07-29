import { Injectable } from '@nestjs/common';
import { Pricing } from './pricing.entity';
import { CreatePricingDto } from './pricingDto/create-pricing.dto';
import { UpdatePricingDto } from './pricingDto/update-pricing.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'service/service.entity';

@Injectable()
export class PricingsService {
    
    constructor(
        @InjectRepository(Pricing)
        private readonly pricings: Repository<Pricing>
      ) {}
    

    async create(dto: CreatePricingDto, service: Service): Promise<number> {

        const pricing = new Pricing();

        pricing.ParentsPrincing = dto.ParentsPrincing;
        pricing.IsSubventioned = dto.IsSubventioned;
        pricing.CISSSPricing = dto.CISSSPricing;
        pricing.StartDate = dto.StartDate;
        pricing.Service = service;

        await this.pricings.save(pricing);

        return pricing.Id;
    }

    async findAll(): Promise<Pricing[]> {

        return await this.pricings.find();
    }

    async findSomeByService(Service: Service): Promise<Pricing[]> {

        let result = await this.pricings.find();

        let filteredResult = result.filter((element) => element.Service.Id == Service.Id)

        return filteredResult;        
    }

    async findOneById(Id: number): Promise<Pricing> {

        return await this.pricings.findOne(Id);
    }

    async update(dto: UpdatePricingDto) {

        const pricing = new Pricing();

        pricing.ParentsPrincing = dto.ParentsPrincing;
        pricing.IsSubventioned = dto.IsSubventioned;
        pricing.CISSSPricing = dto.CISSSPricing;
        pricing.StartDate = dto.StartDate;
            
        await this.pricings.update(dto.Id, pricing);
    }

    async Delete(id: number) {
        
        await this.pricings.delete(id);
    }
}