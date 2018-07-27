import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { CreateRoomDto } from './roomDto/create-room.dto';
import { UpdateRoomDto } from './roomDto/update-room.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicePoint } from 'servicePoint/servicePoint.entity';
import { Service } from 'service/service.entity';

@Injectable()
export class RoomsService {
    
    constructor(
        @InjectRepository(Room)
        private readonly rooms: Repository<Room>
      ) {}
    

    async create(dto: CreateRoomDto, ServicePoint: ServicePoint, Services: Service[]) {

        const room = new Room();

        room.Name = dto.Name;
        room.NbPlaces = dto.NbPlaces;
        room.ServicePoint = ServicePoint;
        room.Services = Services;

        await this.rooms.save(room);
    }

    async findAll(): Promise<Room[]> {

        return await this.rooms.find();
    }

    async findOneById(Id: number) {

        return await this.rooms.findOne(Id);
    }

    async update(dto: UpdateRoomDto, ServicePoint: ServicePoint, Services: Service[]) {

        const room = new Room();

        room.Name = dto.Name;
        room.NbPlaces = dto.NbPlaces;
        room.ServicePoint = ServicePoint;
        room.Services = Services;
              
        await this.rooms.update(dto.Id, room);
    }

    async Delete(id: number) {
        
        await this.rooms.delete(id);
    }
}