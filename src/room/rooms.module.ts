import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ServicePointsModule } from 'servicePoint/servicePoints.module';
import { ServicesModule } from 'service/services.module';
import { AdressesModule } from 'adress/adresses.module';
import { UsersModule } from 'user/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Room]), ServicePointsModule, 
                ServicesModule, AdressesModule, UsersModule],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService]
})
export class RoomsModule {}