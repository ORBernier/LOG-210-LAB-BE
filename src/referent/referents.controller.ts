import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { ReferentOrganizationsService } from 'referentOrganization/referentOrganizations.service';
import { ReferentsService } from './referents.service';
import { Referent } from './referent.entity';
import { CreateReferentDto } from './referentDto/create-referent.dto';
import { UpdateReferentDto } from './referentDto/update-referent.dto';
import { DeleteReferentDto } from './referentDto/delete-referent.dto';

@Controller('referents')
export class ReferentsController {

    constructor(
        private readonly referentOrganizationService: ReferentOrganizationsService,
        private readonly service: ReferentsService) {}

    @Get()
     async findAll():  Promise<Referent[]> {

        return await this.service.findAll();
    }

    @Get(':ref_org_id')
    async findSomeByRefOrgId(@Param('ref_org_id') Id): Promise<Referent[]> {

        let refOrg = await this.referentOrganizationService.findOneById(Id);

        return await this.service.findSomeByRefOrg(refOrg);
    }

    @Get(':id')
    async findOneById(@Param('id') Id): Promise<Referent> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateReferentDto): Promise<number> {

        let organization = await this.referentOrganizationService.findOneById(dto.ReferentOrgId);

        return await this.service.create(dto, organization);
    }

    @Put()
    async update(@Body() dto: UpdateReferentDto) {

        let organization = await this.referentOrganizationService.findOneById(dto.ReferentOrgId);

        return await this.service.update(dto, organization);
    }

    @Delete()
    async delete(@Body() dto: DeleteReferentDto) {
        
        return await this.service.delete(dto.Id);
    }
}