import { Injectable, Inject } from '@nestjs/common';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './organizationDto/create-organization.dto';
import { UpdateOrganizationDto } from './organizationDto/update-organization.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employe } from 'employe/employe.entity';
import { EmployesController } from 'employe/employes.controller';
import { EmployesService } from 'employe/employes.service';

@Injectable()
export class OrganizationsService {
    
    constructor(
        @InjectRepository(Organization)
        private readonly organizations: Repository<Organization>
      ) {}
    

    async create(dto: CreateOrganizationDto, Manager: Employe) {

        const organization = new Organization();

        organization.Name = dto.Name;
        organization.Adress = dto.Adress;
        organization.Phone = dto.Phone;
        organization.Email = dto.Email;
        organization.Fax = dto.Fax;
        organization.Manager = Manager;

        await this.organizations.save(organization);
    }

    async findAll(): Promise<Organization[]> {

        return await this.organizations.find();
    }

    async update(dto: UpdateOrganizationDto) {

        try {

            const organization = new Organization();

            organization.Name = dto.Name;
            organization.Adress = dto.Adress;
            organization.Phone = dto.Phone;
            organization.Email = dto.Email;
            organization.Fax = dto.Fax;

            await this.organizations.update(dto.Id, organization);

        } catch (e) {

        }
    }

    async Delete(id: number) {
        try {
        
            await this.organizations.delete(id);

        } catch (e) {

        }
    }
}