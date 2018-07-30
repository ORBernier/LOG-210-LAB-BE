import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferentOrganization } from './referentOrganization.entity';
import { ReferentOrganizationsController } from './referentOrganizations.controller';
import { ReferentOrganizationsService } from './referentOrganizations.service';
import { OrganizationsModule } from 'organization/organizations.module';
import { AdressesModule } from 'adress/adresses.module';
import { UsersModule } from 'user/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([ReferentOrganization]), 
                OrganizationsModule, AdressesModule, UsersModule],
    controllers: [ReferentOrganizationsController],
    providers: [ReferentOrganizationsService],
    exports: [ReferentOrganizationsService]
})
export class ReferentOrganizationsModule {}