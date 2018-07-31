import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { OrganizationsService } from 'organization/organizations.service';
import { ReferentOrganizationsService } from './referentOrganizations.service';
import { ReferentOrganization } from './referentOrganization.entity';
import { CreateReferentOrganizationDto } from './referentOrganizationDto/create-referentOrganization.dto';
import { UpdateReferentOrganizationDto } from './referentOrganizationDto/update-referentOrganization.dto';
import { DeleteReferentOrganizationDto } from './referentOrganizationDto/delete-referentOrganization.dto';
import { AdressesService } from '../adress/adresses.service';


@Controller('referent_organizations')
export class ReferentOrganizationsController {

    constructor(
        private readonly organizationService: OrganizationsService,
        private readonly adressesService: AdressesService,
        private readonly service: ReferentOrganizationsService) {}

    @Get()
     async findAll():  Promise<ReferentOrganization[]> {

        return await this.service.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') Id): Promise<ReferentOrganization> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateReferentOrganizationDto): Promise<number> {

        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        let adress = await this.adressesService.findOneById(dto.AdressId);

        return await this.service.create(dto, organization, adress);
    }

    @Put()
    async update(@Body() dto: UpdateReferentOrganizationDto) {

        let organization = await this.organizationService.findOneById(dto.OrganizationId);

        let adress = await this.adressesService.findOneById(dto.AdressId);

        return await this.service.update(dto, organization, adress);
    }

    @Delete()
    async delete(@Body() dto: DeleteReferentOrganizationDto) {
        
        return await this.service.delete(dto.Id);
    }
}