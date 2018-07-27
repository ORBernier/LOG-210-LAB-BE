import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { Room } from './room.entity';
import { ServicePoint } from '../servicePoint/servicePoint.entity';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './roomDto/create-room.dto';
import { UpdateRoomDto } from './roomDto/update-room.dto';
import { DeleteRoomDto } from './roomDto/delete-room.dto';
import { ServicePointsService } from 'servicePoint/servicePoints.service';
import { ServicesService } from 'service/services.service';

@Controller('rooms')
export class RoomsController {

    constructor(
        private readonly servicePointService: ServicePointsService,
        private readonly servicesService: ServicesService,
        private readonly service: RoomsService) {}

    @Get()
     async findAll():  Promise<Room[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateRoomDto) {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        let services = await this.servicesService.findSomeById(dto.ServicesIds);

        return await this.service.create(dto, servicePoint, services);
    }

    @Put()
    async update(@Body() dto: UpdateRoomDto) {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        let services = await this.servicesService.findSomeById(dto.ServicesIds);

        return await this.service.update(dto, servicePoint, services);
    }

    @Delete()
    async delete(@Body() dto: DeleteRoomDto) {
        
        return await this.service.Delete(dto.Id);
    }
}