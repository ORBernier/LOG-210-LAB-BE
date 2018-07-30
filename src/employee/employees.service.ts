import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './employeeDto/create-employee.dto';
import { UpdateEmployeeDto } from './employeeDto/update-employee.dto';
import { Adress } from 'adress/adress.entity';
import { Organization } from 'organization/organization.entity';

@Injectable()
export class EmployeesService {
    
    constructor(
        @InjectRepository(Employee)
        private readonly employees: Repository<Employee>
      ) {}
    

    async create(dto: CreateEmployeeDto, Adress: Adress): Promise<number> {

        const employee = new Employee();

        employee.FirstName = dto.FirstName;
        employee.LastName = dto.LastName;
        employee.Phone = dto.Phone;
        employee.RoleOrganization = dto.Role;
        employee.Adress = Adress;

        await this.employees.save(employee);

        return employee.Id;
    }

    async findAll(): Promise<Employee[]> {

        return await this.employees.find();
    }

    async findSomeByOrg(Organization: Organization): Promise<Employee[]> {

        let result = await this.employees.find();

        let filteredResult = result.filter((element) => element.Organization.Id == Organization.Id)

        return filteredResult;        
    }

    async findOneById(Id: number): Promise<Employee> {

        return await this.employees.findOne(Id);
    }

    async update(dto: UpdateEmployeeDto, Adress: Adress) {


        const employee = new Employee();

        employee.FirstName = dto.FirstName;
        employee.LastName = dto.LastName;
        employee.Phone = dto.Phone;
        employee.Adress = Adress;

        await this.employees.update(dto.Id, employee);
    }

    async delete(id: number) {
        
        await this.employees.delete(id);
    }
}