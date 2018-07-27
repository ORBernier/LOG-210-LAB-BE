import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ServicePointsModule } from 'servicePoint/servicePoints.module';
import { ServicesModule } from 'service/services.module';

@Module({
    imports: [TypeOrmModule.forFeature([Room]), 
                ServicePointsModule, ServicesModule],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService]
})
export class RoomsModule {}