import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'user/users.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { AdressesModule } from 'adress/adresses.module';
import { OrganizationsModule } from 'organization/organizations.module';

@Module({
    imports: [TypeOrmModule.forFeature([Employee]), 
                UsersModule, AdressesModule, OrganizationsModule],
    controllers: [EmployeesController],
    providers: [EmployeesService],
    exports: [EmployeesService]
})
export class EmployeesModule {}