/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity';
import { plainToInstance } from 'class-transformer';
import { BonoDto } from './bono.dto';

@Controller()
export class BonoController {
    
    constructor(private readonly bonoService : BonoService){}

    @Post('usuarios/:usuarioID/bonos')
    async crearBono(@Body() bonoDto: BonoDto, @Param('usuarioID') usuarioID: number)
    {
        const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
        return await this.bonoService.crearBono(bono, usuarioID);
    }

    @Get('clases/:codigo/bonos')
    async findBonosByCodigo(@Param('codigo') codigo: string)
    {   
        return await this.bonoService.findBonosByCodigo(codigo);
    }

    @Get('usuarios/:userID/bonos')
    async findBonosByUsuario(@Param('userID') userID: number)
    {
        return await this.bonoService.findBonosByUsuario(userID);
    }

    @Delete('bonos/:bonoID')
    @HttpCode(204)  
    async deleteBono(@Param('bonoID') bonoID: number)
    {
        return await this.bonoService.deleteBono(bonoID);
    
    }
}
