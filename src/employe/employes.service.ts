import { Injectable } from '@nestjs/common';
import { Employe } from './employe.entity';
import { CreateEmployeDto } from './employeDto/create-employe.dto';
import { UpdateEmployeDto } from './employeDto/update-employe.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EmployesService {
    
    private readonly employes: Repository<Employe>;

    async create(createEmployeDto: CreateEmployeDto) {

        this.employes.save(createEmployeDto.toEmploye());
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