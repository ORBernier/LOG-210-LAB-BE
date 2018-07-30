import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferentOrganizationsModule } from 'referentOrganization/referentOrganizations.module';
import { Referent } from './referent.entity';
import { ReferentsController } from './referents.controller';
import { ReferentsService } from './referents.service';
import { AdressesModule } from 'adress/adresses.module';
import { UsersModule } from 'user/users.module';
import { OrganizationsModule } from 'organization/organizations.module';

@Module({
    imports: [TypeOrmModule.forFeature([Referent]), ReferentOrganizationsModule,
                AdressesModule, UsersModule, OrganizationsModule],
    controllers: [ReferentsController],
    providers: [ReferentsService],
    exports: [ReferentsService]
})
export class ReferentsModule {}