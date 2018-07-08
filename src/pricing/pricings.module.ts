import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingsController } from './pricings.controller';
import { PricingsService } from './pricings.service';
import { Pricing } from './pricing.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Pricing])],
    controllers: [PricingsController],
    providers: [PricingsService]
})
export class PricingsModule {}