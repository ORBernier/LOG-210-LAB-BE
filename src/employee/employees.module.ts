import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'user/users.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Employee]), UsersModule],
    controllers: [EmployeesController],
    providers: [EmployeesService]
})
export class EmployeesModule {}