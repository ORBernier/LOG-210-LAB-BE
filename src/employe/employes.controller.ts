import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { Employe } from './employe.entity';
import { EmployesService } from './employes.service';
import { CreateEmployeDto } from './employeDto/create-employe.dto';
import { UpdateEmployeDto } from './employeDto/update-employe.dto';
import { DeleteEmployeDto } from './employeDto/delete-employe.dto';

@Controller('employes')
export class EmployesController {

    constructor(private readonly employesService: EmployesService) {}

    @Get()
     async findAll():  Promise<Employe[]> {

        return await this.employesService.findAll();
    }

    @Post()
    async create(@Body() createEmployeDto: CreateEmployeDto) {

        return await this.employesService.create(createEmployeDto);
    }

    @Put()
    async update(@Body() updateEmployeDto: UpdateEmployeDto) {

        return await this.employesService.update(updateEmployeDto);
    }

    @Delete()
    async delete(@Body() deleteEmployeDto: DeleteEmployeDto) {
        
        return await this.employesService.Delete(deleteEmployeDto.Id);
    }
}