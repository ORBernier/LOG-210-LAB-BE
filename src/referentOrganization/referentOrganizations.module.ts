import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferentOrganization } from './referentOrganization.entity';
import { ReferentOrganizationsController } from './referentOrganizations.controller';
import { ReferentOrganizationsService } from './referentOrganizations.service';
import { OrganizationsModule } from 'organization/organizations.module';

@Module({
    imports: [TypeOrmModule.forFeature([ReferentOrganization]), OrganizationsModule],
    controllers: [ReferentOrganizationsController],
    providers: [ReferentOrganizationsService],
    exports: [ReferentOrganizationsService]
})
export class ReferentOrganizationsModule {}