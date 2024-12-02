/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from './usuario.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
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
