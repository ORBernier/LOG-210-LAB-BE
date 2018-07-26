import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferentOrganizationsModule } from 'referentOrganization/referentOrganizations.module';
import { Referent } from './referent.entity';
import { ReferentsController } from './referents.controller';
import { ReferentsService } from './referents.service';

@Module({
    imports: [TypeOrmModule.forFeature([Referent]), ReferentOrganizationsModule],
    controllers: [ReferentsController],
    providers: [ReferentsService],
    exports: [ReferentsService]
})
export class ReferentsModule {}