import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from './adress.entity';
import { CreateAdressDto } from './adressDto/create-adress.dto';
import { UpdateAdressDto } from './adressDto/update-adress.dto';

@Injectable()
export class AdressesService {
    
    constructor(
        @InjectRepository(Adress)
        private readonly users: Repository<Adress>
      ) {}
    

    async create(dto: CreateAdressDto) {

        const adress = new Adress();

        adress.DoorNumber = dto.DoorNumber;
        adress.Street = dto.Street;
        adress.City = dto.City;
        adress.Province = dto.Province;
        adress.PostalCode = dto.PostalCode;

        await this.users.save(adress);
    }

    async findAll(): Promise<Adress[]> {

        return await this.users.find();
    }

    async findOneById(Id: number): Promise<Adress> {

        return await this.users.findOne(Id);
    }

    async update(dto: UpdateAdressDto) {

        const adress = new Adress();

        adress.DoorNumber = dto.DoorNumber;
        adress.Street = dto.Street;
        adress.City = dto.City;
        adress.Province = dto.Province;
        adress.PostalCode = dto.PostalCode;

        await this.users.update(dto.Id, adress);
    }

    async Delete(Id: number) {
        
        await this.users.delete(Id);
    }
}