import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ServicesModule } from 'service/services.module';

@Module({
    imports: [TypeOrmModule.forFeature([Room]), ServicesModule],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService]
})
export class RoomsModule {}