import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingsController } from './pricings.controller';
import { PricingsService } from './pricings.service';
import { Pricing } from './pricing.entity';
import { ServicesModule } from 'service/services.module';
import { ServicePointsModule } from 'servicePoint/servicePoints.module';
import { UsersModule } from 'user/users.module';
import { AdressesModule } from 'adress/adresses.module';
import { OrganizationsModule } from 'organization/organizations.module';

@Module({
    imports: [TypeOrmModule.forFeature([Pricing]), ServicesModule,
                ServicePointsModule, UsersModule, AdressesModule,
                OrganizationsModule],
    controllers: [PricingsController],
    providers: [PricingsService]
})
export class PricingsModule {}