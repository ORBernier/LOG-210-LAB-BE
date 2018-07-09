import { Injectable } from '@nestjs/common';
import { Service } from './service.entity';
import { CreateServiceDto } from './serviceDto/create-service.dto';
import { UpdateServiceDto } from './serviceDto/update-service.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
    
    constructor(
        @InjectRepository(Service)
        private readonly services: Repository<Service>
      ) {}
    

    async create(dto: CreateServiceDto) {

        const service = new Service();

        service.Name = dto.Name;
        service.IsActive = dto.IsActive;

        await this.services.save(service);
    }

    async findAll(): Promise<Service[]> {

        return await this.services.find();
    }

    async update(dto: UpdateServiceDto) {

        try {

            const service = new Service();

            service.Name = dto.Name;
            service.IsActive = dto.IsActive;
            
            await this.services.update(dto.Id, service);

        } catch (e) {

        }
    }

    async Delete(id: number) {
        try {
        
            await this.services.delete(id);

        } catch (e) {

        }
    }
}