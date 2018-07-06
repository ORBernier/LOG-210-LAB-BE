import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployesController } from './employes.controller';
import { EmployesService } from './employes.service';
import {Employe} from './employe.entity';
import { AuthModule } from 'auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Employe])],
    controllers: [EmployesController],
    providers: [EmployesService]
})
export class EmployesModule {}