import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { Room } from './room.entity';
import { ServicePoint } from '../servicePoint/servicePoint.entity';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './roomDto/create-room.dto';
import { UpdateRoomDto } from './roomDto/update-room.dto';
import { DeleteRoomDto } from './roomDto/delete-room.dto';
import { ServicePointsService } from 'servicePoint/servicePoints.service';

@Controller('rooms')
export class RoomsController {

    constructor(
        private readonly servicePointService: ServicePointsService,
        private readonly service: RoomsService) {}

    @Get()
     async findAll():  Promise<Room[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateRoomDto) {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        return await this.service.create(dto, servicePoint);
    }

    @Put()
    async update(@Body() dto: UpdateRoomDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteRoomDto) {
        
        return await this.service.Delete(dto.Id);
    }
}