import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferentOrganization } from './referentOrganization.entity';
import { CreateReferentOrganizationDto } from './referentOrganizationDto/create-referentOrganization.dto';
import { Organization } from 'organization/organization.entity';
import { UpdateReferentOrganizationDto } from './referentOrganizationDto/update-referentOrganization.dto';
import { Adress } from 'adress/adress.entity';

@Injectable()
export class ReferentOrganizationsService {
    
    constructor(
        @InjectRepository(ReferentOrganization)
        private readonly referentOrganizations: Repository<ReferentOrganization>
      ) {}
    

    async create(dto: CreateReferentOrganizationDto, Organization: Organization, Adress: Adress) {

        const referentOrganization = new ReferentOrganization();

        referentOrganization.Name = dto.Name;
        referentOrganization.Adress = Adress;
        referentOrganization.Phone = dto.Phone;
        referentOrganization.Email = dto.Email;
        referentOrganization.Fax = dto.Fax;
        referentOrganization.WebSite = dto.WebSite;
        referentOrganization.IsActive = dto.IsActive;
        referentOrganization.Organization = Organization;

        await this.referentOrganizations.save(referentOrganization);
    }

    async findAll(): Promise<ReferentOrganization[]> {

        return await this.referentOrganizations.find();
    }

    async findOneById(Id: number): Promise<ReferentOrganization> {

        return await this.referentOrganizations.findOne(Id);
    }

    async update(dto: UpdateReferentOrganizationDto, Organization: Organization, Adress: Adress) {


        const referentOrganization = new ReferentOrganization();

        referentOrganization.Name = dto.Name;
        referentOrganization.Adress = Adress;
        referentOrganization.Phone = dto.Phone;
        referentOrganization.Email = dto.Email;
        referentOrganization.Fax = dto.Fax;
        referentOrganization.WebSite = dto.WebSite;
        referentOrganization.IsActive = dto.IsActive;
        referentOrganization.Organization = Organization;

        await this.referentOrganizations.update(dto.Id, referentOrganization);
    }

    async delete(id: number) {
        
        await this.referentOrganizations.delete(id);
    }
}