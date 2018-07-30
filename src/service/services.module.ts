import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { ServicePointsModule } from 'servicePoint/servicePoints.module';
import { AdressesModule } from 'adress/adresses.module';
import { UsersModule } from 'user/users.module';
import { OrganizationsModule } from 'organization/organizations.module';

@Module({
    imports: [TypeOrmModule.forFeature([Service]), ServicePointsModule,
                AdressesModule, UsersModule, OrganizationsModule],
    controllers: [ServicesController],
    providers: [ServicesService],
    exports: [ServicesService]
})
export class ServicesModule {}