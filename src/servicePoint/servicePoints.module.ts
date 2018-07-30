import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePointsController } from './servicePoints.controller';
import { ServicePointsService } from './servicePoints.service';
import { ServicePoint } from './servicePoint.entity';
import { OrganizationsModule } from 'organization/organizations.module';
import { AdressesModule } from 'adress/adresses.module';
import { UsersModule } from 'user/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([ServicePoint]), 
                OrganizationsModule, AdressesModule, UsersModule],
    controllers: [ServicePointsController],
    providers: [ServicePointsService],
    exports: [ServicePointsService]
})
export class ServicePointsModule {}