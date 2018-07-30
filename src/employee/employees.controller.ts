import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { Employee } from "./employee.entity";
import { CreateEmployeeDto } from "./employeeDto/create-employee.dto";
import { UsersService } from "user/users.service";
import { UpdateEmployeeDto } from "./employeeDto/update-employee.dto";
import { DeleteEmployeeDto } from "./employeeDto/delete-employee.dto";
import { AdressesService } from "adress/adresses.service";
import { OrganizationsService } from "organization/organizations.service";

@Controller('employees')
export class EmployeesController {

    constructor(
        private readonly organizationService: OrganizationsService,
        private readonly userService: UsersService,
        private readonly adressesService: AdressesService,
        private readonly service: EmployeesService) {}

    @Get()
     async findAll(): Promise<Employee[]> {

        return await this.service.findAll();
    }

    @Get('/org/:id')
    async findSomeByOrgId(@Param('id') Id): Promise<Employee[]> {

        let organization = await this.organizationService.findOneById(Id);

        return await this.service.findSomeByOrg(organization);
    }

    @Get(':id')
    async findOneById(@Param('id') Id): Promise<Employee> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateEmployeeDto): Promise<number> {

        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        let adress = await this.adressesService.findOneById(dto.AdressId);

        return await this.service.create(dto, adress, organization);
    }

    @Put()
    async update(@Body() dto: UpdateEmployeeDto) {

        let employee = await this.service.findOneById(dto.Id);

        return await this.service.update(dto, employee.Adress);
    }

    @Delete()
    async delete(@Body() dto: DeleteEmployeeDto) {
        
        return await this.service.delete(dto.Id);
    }
}