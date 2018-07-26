import { Get, Post, Delete, Put, Controller, Body } from '@nestjs/common';
import { OrganizationsService } from 'organization/organizations.service';
import { ReferentOrganizationsService } from './referentOrganizations.service';
import { ReferentOrganization } from './referentOrganization.entity';
import { CreateReferentOrganizationDto } from './referentOrganizationDto/create-referentOrganization.dto';
import { UpdateReferentOrganizationDto } from './referentOrganizationDto/update-referentOrganization.dto';
import { DeleteReferentOrganizationDto } from './referentOrganizationDto/delete-referentOrganization.dto';


@Controller('referent_organizations')
export class ReferentOrganizationsController {

    constructor(
        private readonly organizationService: OrganizationsService,
        private readonly service: ReferentOrganizationsService) {}

    @Get()
     async findAll():  Promise<ReferentOrganization[]> {

        return await this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateReferentOrganizationDto) {

        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        return await this.service.create(dto, organization);
    }

    @Put()
    async update(@Body() dto: UpdateReferentOrganizationDto) {

        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        return await this.service.update(dto, organization);
    }

    @Delete()
    async delete(@Body() dto: DeleteReferentOrganizationDto) {
        
        return await this.service.delete(dto.Id);
    }
}