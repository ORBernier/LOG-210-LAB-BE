import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { Room } from './room.entity';
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

    @Get('service_point/:id')
    async findSomeByServPointId(@Param('id') Id): Promise<Room[]> {

        let servicePoint = await this.servicePointService.findOneById(Id);

        return await this.service.findSomeByServPoint(servicePoint);
    }

    @Get(':id')
    async findOneByOne(@Param('id') Id): Promise<Room> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateRoomDto): Promise<number> {

        let servicePoint = await this.servicePointService.findOneById(dto.ServicePointId);

        let services = await this.servicesService.findSomeByServPoint(servicePoint);

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