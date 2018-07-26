import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Referent } from './referent.entity';
import { CreateReferentDto } from './referentDto/create-referent.dto';
import { UpdateReferentDto } from './referentDto/update-referent.dto';
import { ReferentOrganization } from 'referentOrganization/referentOrganization.entity';

@Injectable()
export class ReferentsService {
    
    constructor(
        @InjectRepository(Referent)
        private readonly referents: Repository<Referent>
      ) {}
    

    async create(dto: CreateReferentDto, ReferentOrganization: ReferentOrganization) {

        const referentOrganization = new Referent();

        referentOrganization.Name = dto.Name;
        referentOrganization.CellularPhone = dto.CellularPhone;
        referentOrganization.Phone = dto.Phone;
        referentOrganization.Email = dto.Email;
        referentOrganization.Fax = dto.Fax;
        referentOrganization.IsPaper = dto.IsPaper;
        referentOrganization.IsEmail = dto.IsEmail;
        referentOrganization.IsFax = dto.IsFax;
        referentOrganization.ReferentOrganization = ReferentOrganization;

        await this.referents.save(referentOrganization);
    }

    async findAll(): Promise<Referent[]> {

        return await this.referents.find();
    }

    async findOneById(Id: number): Promise<Referent> {

        return await this.referents.findOne(Id);
    }

    async update(dto: UpdateReferentDto, ReferentOrganization: ReferentOrganization) {


        const referentOrganization = new Referent();

        referentOrganization.Name = dto.Name;
        referentOrganization.CellularPhone = dto.CellularPhone;
        referentOrganization.Phone = dto.Phone;
        referentOrganization.Email = dto.Email;
        referentOrganization.Fax = dto.Fax;
        referentOrganization.IsPaper = dto.IsPaper;
        referentOrganization.IsEmail = dto.IsEmail;
        referentOrganization.IsFax = dto.IsFax;
        referentOrganization.ReferentOrganization = ReferentOrganization;

        await this.referents.update(dto.Id, referentOrganization);
    }

    async delete(id: number) {
        
        await this.referents.delete(id);
    }
}