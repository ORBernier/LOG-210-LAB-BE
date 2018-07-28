import { Get, Post, Delete, Put, Controller, Body, Param } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { Adress } from './adress.entity';
import { CreateAdressDto } from './adressDto/create-adress.dto';
import { UpdateAdressDto } from './adressDto/update-adress.dto';
import { DeleteAdressDto } from './adressDto/delete-adress.dto';

@Controller('adresses')
export class AdressesController {

    constructor(private readonly service: AdressesService) {}

    @Get()
     async findAll():  Promise<Adress[]> {

        return await this.service.findAll();
    }

    @Get(':id')
    async findOneByEmail(@Param('id') Id): Promise<Adress> {

        return await this.service.findOneById(Id);
    }

    @Post()
    async create(@Body() dto: CreateAdressDto): Promise<number> {

        return await this.service.create(dto);
    }

    @Put()
    async update(@Body() dto: UpdateAdressDto) {

        return await this.service.update(dto);
    }

    @Delete()
    async delete(@Body() dto: DeleteAdressDto) {
        
        return await this.service.Delete(dto.Id);
    }
}