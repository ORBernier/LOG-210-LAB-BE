import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { UsersModule } from 'user/users.module';
import { AdressesModule } from 'adress/adresses.module';

@Module({
    imports: [TypeOrmModule.forFeature([Organization]), 
                UsersModule, AdressesModule],
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    exports: [OrganizationsService]
})
export class OrganizationsModule {}