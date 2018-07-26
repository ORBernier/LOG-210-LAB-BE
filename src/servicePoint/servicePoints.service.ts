import { Injectable } from '@nestjs/common';
import { ServicePoint } from './servicePoint.entity';
import { CreateServicePointDto } from './servicePointDto/create-servicePoint.dto';
import { UpdateServicePointDto } from './servicePointDto/update-servicePoint.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'organization/organization.entity';
import { Adress } from 'adress/adress.entity';

@Injectable()
export class ServicePointsService {
    
    constructor(
        @InjectRepository(ServicePoint)
        private readonly servicePoints: Repository<ServicePoint>
      ) {}
    

    async create(dto: CreateServicePointDto, Organization: Organization, Adress: Adress) {

        const servicePoint = new ServicePoint();

        servicePoint.Name = dto.Name;
        servicePoint.Adress = Adress;
        servicePoint.Phone = dto.Phone;
        servicePoint.Email = dto.Email;
        servicePoint.Fax = dto.Fax;
        servicePoint.Organization = Organization;

        await this.servicePoints.save(servicePoint);
    }

    async findAll(): Promise<ServicePoint[]> {

        return await this.servicePoints.find();
    }

    async findOneById(Id: number): Promise<ServicePoint> {

        return await this.servicePoints.findOne(Id);
    }

    async update(dto: UpdateServicePointDto, Organization: Organization, Adress: Adress) {

        const servicePoint = new ServicePoint();

        servicePoint.Name = dto.Name;
        servicePoint.Adress = Adress;
        servicePoint.Phone = dto.Phone;
        servicePoint.Email = dto.Email;
        servicePoint.Fax = dto.Fax;
        servicePoint.Organization = Organization;

        await this.servicePoints.update(dto.Id, servicePoint);
    }

    async Delete(id: number) {

        await this.servicePoints.delete(id);
    }
}