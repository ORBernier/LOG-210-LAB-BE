import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { Room } from './room.entity';
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

    @Get(':id')
    async findOneById(@Param('id') Id): Promise<Room> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateRoomDto): Promise<number> {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        return await this.service.create(dto, servicePoint);
    }

    @Put()
    async update(@Body() dto: UpdateRoomDto) {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        return await this.service.update(dto, servicePoint);
    }

    @Delete()
    async delete(@Body() dto: DeleteRoomDto) {
        
        return await this.service.Delete(dto.Id);
    }
}