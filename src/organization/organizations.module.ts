import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { UsersModule } from 'user/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Organization]), UsersModule],
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    exports: [OrganizationsService]
})
export class OrganizationsModule {}