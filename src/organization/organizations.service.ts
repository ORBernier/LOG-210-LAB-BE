import { Injectable, Inject } from '@nestjs/common';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './organizationDto/create-organization.dto';
import { UpdateOrganizationDto } from './organizationDto/update-organization.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'user/user.entity';

@Injectable()
export class OrganizationsService {
    
    constructor(
        @InjectRepository(Organization)
        private readonly organizations: Repository<Organization>
      ) {}
    

    async create(dto: CreateOrganizationDto, Manager: User) {

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

    async findOneById(Id: number): Promise<Organization> {

        return await this.organizations.findOne(Id);
    }

    async update(dto: UpdateOrganizationDto, Manager: User) {


        const organization = new Organization();

        organization.Name = dto.Name;
        organization.Adress = dto.Adress;
        organization.Phone = dto.Phone;
        organization.Email = dto.Email;
        organization.Fax = dto.Fax;
        organization.Manager = Manager;

        await this.organizations.update(dto.Id, organization);
    }

    async delete(id: number) {
        
        await this.organizations.delete(id);
    }
}