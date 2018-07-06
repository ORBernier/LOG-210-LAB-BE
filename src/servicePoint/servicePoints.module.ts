import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePointsController } from './servicePoints.controller';
import { ServicePointsService } from './servicePoints.service';
import { ServicePoint } from './servicePoint.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ServicePoint])],
    controllers: [ServicePointsController],
    providers: [ServicePointsService]
})
export class ServicePointsModule {}