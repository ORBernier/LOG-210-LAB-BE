import { Controller, Get, Param } from "../../node_modules/@nestjs/common";
import { OrganizationsService } from "organization/organizations.service";
import { EmployeesService } from "./employees.service";
import { Employee } from "./employee.entity";


@Controller('employees/org')
export class EmployeeOrgController {

    constructor(
        private readonly organizationService: OrganizationsService,
        private readonly service: EmployeesService) {}

    @Get(':id')
    async findSomeByOrgId(@Param('id') Id): Promise<Employee[]> {

        let organization = await this.organizationService.findOneById(Id);

        return await this.service.findSomeByOrg(organization);
    }
}