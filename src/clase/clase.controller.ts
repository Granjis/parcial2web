/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity';
import { plainToInstance } from 'class-transformer';
import { ClaseDto } from './clase.dto';

@Controller('clases')
export class ClaseController 
{
    constructor(private readonly claseService :ClaseService ) {}

    @Post()
    async crearClase(@Body() claseDto: ClaseDto)
    {   
        const clase: ClaseEntity = plainToInstance(ClaseEntity, claseDto);
        return await this.claseService.crearClase(clase);
    }

    @Get(":claseId")
    @HttpCode(200)
    async findClaseById(@Param ('claseId') codigo: number)
    {
        return await this.claseService.findClaseById(codigo);
    }

}