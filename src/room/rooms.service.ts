import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { CreateRoomDto } from './roomDto/create-room.dto';
import { UpdateRoomDto } from './roomDto/update-room.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomsService {
    
    constructor(
        @InjectRepository(Room)
        private readonly rooms: Repository<Room>
      ) {}
    

    async create(dto: CreateRoomDto) {

        const room = new Room();

        room.Name = dto.Name;
        room.NbPlaces = dto.NbPlaces;

        await this.rooms.save(room);
    }

    async findAll(): Promise<Room[]> {

        return await this.rooms.find();
    }

    async update(dto: UpdateRoomDto) {

        try {

            const room = new Room();

            room.Name = dto.Name;
            room.NbPlaces = dto.NbPlaces;
            
            await this.rooms.update(dto.Id, room);

        } catch (e) {

        }
    }

    async Delete(id: number) {
        try {
        
            await this.rooms.delete(id);

        } catch (e) {

        }
    }
}