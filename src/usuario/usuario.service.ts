/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BusinessLogicException } from 'src/shared/business-errors';
@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository< UsuarioEntity>
    ){}

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>{
         if(usuario.rol === "Decana")
            if(usuario.numeroExtension.toString().length>8)
                 return await this.usuarioRepository.save(usuario);
            else throw new BusinessLogicException("El número de extensión debe tener 8 dígitos", 400);
        else if(usuario.rol === "Docente")
            if(['TICSW','IMAGINE','COMIT'].includes(usuario.rol))
                return await this.usuarioRepository.save(usuario);
            else throw new BusinessLogicException("El grupo de investigación no es válido", 400);
    }

}
