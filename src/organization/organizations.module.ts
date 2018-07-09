import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { EmployesModule } from 'employe/employes.module'
import { EmployesService } from 'employe/employes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Organization]), EmployesModule],
    controllers: [OrganizationsController],
    providers: [OrganizationsService]
})
export class OrganizationsModule {}