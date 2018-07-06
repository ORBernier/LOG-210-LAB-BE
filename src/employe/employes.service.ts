import { Injectable } from '@nestjs/common';
import { Employe } from './employe.entity';
import { CreateEmployeDto } from './employeDto/create-employe.dto';
import { UpdateEmployeDto } from './employeDto/update-employe.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployesService {
    
    constructor(
        @InjectRepository(Employe)
        private readonly employes: Repository<Employe>,
      ) {}
    

    async create(dto: CreateEmployeDto) {

        const employe = new Employe();

        employe.FirstName = dto.FirstName;
        employe.LastName = dto.LastName;
        employe.Email = dto.FirstName + dto.LastName + "@RQRSDA.qc.ca";
        employe.Role = dto.Role;

        this.employes.save(employe);
    }

    async findAll(): Promise<Employe[]> {

        return await this.employes.find();
    }

    async findOneByEmail(token: string) {

    }

    async update(updateEmployeDto: UpdateEmployeDto) {

        try {

            await this.employes.update(updateEmployeDto.Id, updateEmployeDto.toEmploye());

        } catch (e) {

        }
    }

    async Delete(id: number) {
        try {
        
            await this.employes.delete(id);

        } catch (e) {

        }
    }
}