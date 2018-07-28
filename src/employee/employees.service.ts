import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'user/user.entity';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './employeeDto/create-employee.dto';
import { UpdateEmployeeDto } from './employeeDto/update-employee.dto';
import { Adress } from 'adress/adress.entity';

@Injectable()
export class EmployeesService {
    
    constructor(
        @InjectRepository(Employee)
        private readonly employees: Repository<Employee>
      ) {}
    

    async create(dto: CreateEmployeeDto, UserAccount: User, Adress: Adress): Promise<number> {

        const employee = new Employee();

        employee.FirstName = dto.FirstName;
        employee.LastName = dto.LastName;
        employee.Phone = dto.Phone;
        employee.RoleOrganization = dto.Role;
        employee.UserAccount = UserAccount;
        employee.Adress = Adress;

        await this.employees.save(employee);

        return employee.Id;
    }

    async findAll(): Promise<Employee[]> {

        return await this.employees.find();
    }

    async findOneById(Id: number): Promise<Employee> {

        return await this.employees.findOne(Id);
    }

    async update(dto: UpdateEmployeeDto, UserAccount: User, Adress: Adress) {


        const employee = new Employee();

        employee.FirstName = dto.FirstName;
        employee.LastName = dto.LastName;
        employee.Phone = dto.Phone;
        employee.RoleOrganization = dto.Role;
        employee.UserAccount = UserAccount;
        employee.Adress = Adress;

        await this.employees.update(dto.Id, employee);
    }

    async delete(id: number) {
        
        await this.employees.delete(id);
    }
}