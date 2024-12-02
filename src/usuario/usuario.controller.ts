/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService ){}

    @Post()
    async crearUsuario(@Body() usuarioDto: UsuarioDto)
    {
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.usuarioService.crearUsuario(usuario);
    }

    @Get(':usuarioId')
    async findUsuarioById(@Param('usuarioId') usuarioId : number)
    {
        return await this.usuarioService.findUsuarioById(usuarioId);
    }

    @Delete(':usuarioId')
    @HttpCode(204)
    async eliminarUsuari(@Param('usuarioId') usuarioId:number)
    {
        return await this.usuarioService.eliminarUsuario(usuarioId);
    }


    
}
