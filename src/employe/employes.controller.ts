import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { Employe } from './employe.entity';
import { EmployesService } from './employes.service';
import { CreateEmployeDto } from './employeDto/create-employe.dto';
import { UpdateEmployeDto } from './employeDto/update-employe.dto';
import { DeleteEmployeDto } from './employeDto/delete-employe.dto';

@Controller('employes')
export class EmployesController {

    constructor(private readonly service: EmployesService) {}

    @Get()
     async findAll():  Promise<Employe[]> {

        return await this.service.findAll();
    }

    async findOneById(Id: number): Promise<Employe> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateEmployeDto) {

        return await this.service.create(dto);
    }

    @Put()
    async update(@Body() dto: UpdateEmployeDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteEmployeDto) {
        
        return await this.service.Delete(dto.Id);
    }
}