import { Injectable } from '@nestjs/common';
import { ServicePoint } from './servicePoint.entity';
import { CreateServicePointDto } from './servicePointDto/create-servicePoint.dto';
import { UpdateServicePointDto } from './servicePointDto/update-servicePoint.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicePointsService {
    
    constructor(
        @InjectRepository(ServicePoint)
        private readonly servicePoints: Repository<ServicePoint>
      ) {}
    

    async create(dto: CreateServicePointDto) {

        const servicePoint = new ServicePoint();

        servicePoint.Name = dto.Name;
        servicePoint.Adress = dto.Adress;
        servicePoint.Phone = dto.Phone;
        servicePoint.Email = dto.Email;
        servicePoint.Fax = dto.Fax;

        await this.servicePoints.save(servicePoint);
    }

    async findAll(): Promise<ServicePoint[]> {

        return await this.servicePoints.find();
    }

    async update(dto: UpdateServicePointDto) {

        try {

            const servicePoint = new ServicePoint();

            servicePoint.Name = dto.Name;
            servicePoint.Adress = dto.Adress;
            servicePoint.Phone = dto.Phone;
            servicePoint.Email = dto.Email;
            servicePoint.Fax = dto.Fax;

            await this.servicePoints.update(dto.Id, servicePoint);

        } catch (e) {

        }
    }

    async Delete(id: number) {
        try {
        
            await this.servicePoints.delete(id);

        } catch (e) {

        }
    }
}