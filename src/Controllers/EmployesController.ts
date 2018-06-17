///<reference path="../Services/IRQRSDARepository.ts"/>
import {Get, Controller, Dependencies} from '@nestjs/common';
import {IRQRSDARepository} from "../Services/IRQRSDARepository";
import {Employe} from "../Models/Employe";
import {Delete, Post, Put} from "@nestjs/common/utils/decorators/request-mapping.decorator";
import {RQRSDARepository} from "../Services/RQRSDARepository";
import {CreateEmployeDto} from "../Dto/CreateEmployeDto";
import {Body} from "@nestjs/common/utils/decorators/route-params.decorator";
import {UpdateEmployeDto} from "../Dto/UpdateEmployeDto";
import {DeleteEmployeDto} from "../Dto/DeleteEmployeDto";


@Controller('Employe')
@Dependencies(RQRSDARepository)
export class EmployesController {

    private service: IRQRSDARepository;

    constructor(repository: IRQRSDARepository) {
        this.service = repository;
    }

    @Get()
     async root():  Promise<Employe[]> {
        return await this.service.FindAll();
    }

    @Post()
    async create(@Body() request: CreateEmployeDto): Promise<Employe> {
        return await this.service.Insert(request.ToEmploye());
    }

    @Put()
    async update(@Body() request: UpdateEmployeDto): Promise<Employe> {
        return await this.service.Update(request.Id, request.ToEmploye());
    }

    @Delete()
    async delete(@Body() request: DeleteEmployeDto): Promise<Employe> {
        return await this.service.Delete(request.Id);
    }
}