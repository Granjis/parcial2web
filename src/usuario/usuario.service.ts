/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
   
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>
    {
        const gruposInvestigacion = ['TICSW', 'IMAGINE', 'COMIT']

        if(usuario.rol == "Profesor")
        {
            if(gruposInvestigacion.includes(usuario.grupoInvestigacion))
                return await this.usuarioRepository.save(usuario);
            else
            {
                throw new BusinessLogicException("El grupo de investigación del profesor no es válido", BusinessError.BAD_REQUEST);
            }
        }
        else if(usuario.rol == 'Decana')
        {
            if(usuario.numeroExtension.toString().length == 8)
                return await this.usuarioRepository.save(usuario);
            else
            {
                throw new BusinessLogicException("El número de extensión de la Decana no tiene 8 digitos", BusinessError.BAD_REQUEST);
            }
        }
        else
        {
            throw new BusinessLogicException("El rol del usuario no es válido", BusinessError.BAD_REQUEST);
        }
    }

    async findUsuarioById(id: number): Promise<UsuarioEntity>
    {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ['jefe', 'bonos', 'clases']});
        if(!usuario)
            throw new BusinessLogicException("El usuario con el id dado no existe", BusinessError.NOT_FOUND);
        return usuario;
    }

    async eliminarUsuario(id: number)
    {
        const usuario = await this.usuarioRepository.findOne({where: {id}, relations: ['bonos']});
        if(!usuario)
            throw new BusinessLogicException("El usuario con el id dado no existe", BusinessError.NOT_FOUND);
        else if(usuario.rol == "Decana")
            throw new BusinessLogicException("La Decana no puede ser eliminada", BusinessError.BAD_REQUEST);
        else if(usuario.bonos.length > 0)
            throw new BusinessLogicException("El usuario tiene bonos asociados por lo que no puede eliminarse", BusinessError.BAD_REQUEST);
        await this.usuarioRepository.remove(usuario);
    }

    async findAll(): Promise<UsuarioEntity[]>
    {
        return await this.usuarioRepository.find()
    }
}
