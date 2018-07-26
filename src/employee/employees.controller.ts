import { Controller, Get, Post, Put, Delete, Body } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { Employee } from "./employee.entity";
import { CreateEmployeeDto } from "./employeeDto/create-employee.dto";
import { UsersService } from "user/users.service";
import { UpdateEmployeeDto } from "./employeeDto/update-employee.dto";
import { DeleteEmployeeDto } from "./employeeDto/delete-employee.dto";

@Controller('employees')
export class EmployeesController {

    constructor(
        private readonly userService: UsersService,
        private readonly service: EmployeesService) {}

    @Get()
     async findAll():  Promise<Employee[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateEmployeeDto) {

        let user = await this.userService.findOneByEmail(dto.UserEmail);

        return await this.service.create(dto, user);
    }

    @Put()
    async update(@Body() dto: UpdateEmployeeDto) {

        let user = await this.userService.findOneByEmail(dto.UserEmail);

        return await this.service.update(dto, user);
    }

    @Delete()
    async delete(@Body() dto: DeleteEmployeeDto) {
        
        return await this.service.delete(dto.Id);
    }
}