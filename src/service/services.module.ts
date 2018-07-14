import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { ServicePointsModule } from 'servicePoint/servicePoints.module';

@Module({
    imports: [TypeOrmModule.forFeature([Service]), ServicePointsModule],
    controllers: [ServicesController],
    providers: [ServicesService],
    exports: [ServicesService]
})
export class ServicesModule {}