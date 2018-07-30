import { Injectable } from '@nestjs/common';
import { Service } from './service.entity';
import { CreateServiceDto } from './serviceDto/create-service.dto';
import { UpdateServiceDto } from './serviceDto/update-service.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicePoint } from 'servicePoint/servicePoint.entity';

@Injectable()
export class ServicesService {
    
    constructor(
        @InjectRepository(Service)
        private readonly services: Repository<Service>
      ) {}
    

    async create(dto: CreateServiceDto, servicePoint: ServicePoint): Promise<number> {

        const service = new Service();

        service.Name = dto.Name;
        service.Description = dto.Description;
        service.IsActive = dto.IsActive;
        service.ServicePoint = servicePoint;

        await this.services.save(service);

        return service.Id;
    }

    async findAll(): Promise<Service[]> {

        return await this.services.find();
    }

    async findSomeById(Ids: number[]): Promise<Service[]> {

        return await this.services.findByIds(Ids);
    }

    async findOneById(Id: number): Promise<Service> {

        return await this.services.findOne(Id);
    }

    async update(dto: UpdateServiceDto, ServicePoint: ServicePoint) {

        const service = new Service();

        service.Name = dto.Name;
        service.Description = dto.Description;
        service.IsActive = dto.IsActive;
        service.ServicePoint = ServicePoint;
            
        await this.services.update(dto.Id, service);
    }

    async Delete(id: number) {
        
        await this.services.delete(id);
    }
}