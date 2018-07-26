import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './adress.entity';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';

@Module({
    imports: [TypeOrmModule.forFeature([Adress])],
    controllers: [AdressesController],
    providers: [AdressesService],
    exports: [AdressesService]
})
export class AdressesModule {}