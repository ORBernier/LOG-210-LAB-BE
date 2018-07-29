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
    

    async create(dto: CreateReferentDto, ReferentOrganization: ReferentOrganization): Promise<number> {

        const referent = new Referent();

        referent.Name = dto.Name;
        referent.CellularPhone = dto.CellularPhone;
        referent.Phone = dto.Phone;
        referent.Email = dto.Email;
        referent.Fax = dto.Fax;
        referent.IsPaper = dto.IsPaper;
        referent.IsEmail = dto.IsEmail;
        referent.IsFax = dto.IsFax;
        referent.ReferentOrganization = ReferentOrganization;

        await this.referents.save(referent);

        return referent.Id;
    }

    async findAll(): Promise<Referent[]> {

        return await this.referents.find();
    }

    async findSomeByRefOrg(ReferentOrganization: ReferentOrganization): Promise<Referent[]> {

        let result = await this.referents.find();

        let filteredResult = result.filter((element) => element.ReferentOrganization.Id == ReferentOrganization.Id)

        return filteredResult;
    }

    async findOneById(Id: number): Promise<Referent> {

        return await this.referents.findOne(Id);
    }

    async update(dto: UpdateReferentDto, ReferentOrganization: ReferentOrganization) {


        const referent = new Referent();

        referent.Name = dto.Name;
        referent.CellularPhone = dto.CellularPhone;
        referent.Phone = dto.Phone;
        referent.Email = dto.Email;
        referent.Fax = dto.Fax;
        referent.IsPaper = dto.IsPaper;
        referent.IsEmail = dto.IsEmail;
        referent.IsFax = dto.IsFax;
        referent.ReferentOrganization = ReferentOrganization;

        await this.referents.update(dto.Id, referent);
    }

    async delete(id: number) {
        
        await this.referents.delete(id);
    }
}