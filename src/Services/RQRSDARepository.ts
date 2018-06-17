import {Component} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IRQRSDARepository} from './IRQRSDARepository';
import {Repository} from 'typeorm';
import {Employe} from '../Models/Employe';


@Component()
export class RQRSDARepository implements IRQRSDARepository {

    private readonly repository: Repository<Employe>;

    constructor(@InjectRepository(Employe)
                    repository: Repository<Employe>) {
        this.repository = repository;
    }

    async FindAll(): Promise<Employe[]> {
        return await this.repository.find();
    }

    async Find(nom: string): Promise<Employe> {
        return await this.repository.findOne({Nom: nom});
    }

    async Where(employe: Employe): Promise<Employe> {
        return await this.repository.findOne(employe);
    }

    async Insert(employe: Employe): Promise<Employe> {
        await this.repository.save(employe);
        return employe;
    }

    async Update(id: number, employe: Employe): Promise<Employe> {

        try {
            await this.repository.updateById(id, employe);
            return employe;
        } catch (e) {

        }
    }

    async Delete(id: number): Promise<Employe> {
        try {
            const toDelete = this.repository.findOneById(id);
            await this.repository.deleteById(id);

            return toDelete;
        } catch (e) {

        }
    }


}
