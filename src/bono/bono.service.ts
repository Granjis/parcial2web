/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BonoEntity } from './bono.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ClaseEntity } from '../clase/clase.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Injectable()
export class BonoService {
   
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,

        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async crearBono(bono: BonoEntity , usuarioId: number): Promise<BonoEntity>
    {
        const usuario : UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ['bonos']});
        if(!usuario )
        {
            throw new BusinessLogicException("El usuario con el ID suministrado no existe", BusinessError.NOT_FOUND);
        }
        else if(!bono.monto && bono.monto <= 0)
        {
            throw new BusinessLogicException("El monto no es valido ", BusinessError.BAD_REQUEST);
        }
        else if(usuario.rol != "Profesor")
        {
            throw new BusinessLogicException("El usuario no es un profesor", BusinessError.BAD_REQUEST);
        }
        else
        {
            bono.usuario = usuario;
            usuario.bonos = [...usuario.bonos, bono];
            await this.usuarioRepository.save(usuario);
            return await this.bonoRepository.save(bono);
        }
    }

    async findBonosByCodigo(cod: string): Promise<BonoEntity[]>
    {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {codigo: cod}, relations: ['bonos']});
        if(!clase)
            throw new BusinessLogicException("No se encontro la clase con el codigo dado", BusinessError.NOT_FOUND);
        return clase.bonos;
    }

    async findBonosByUsuario(userID: number): Promise<BonoEntity[]>
    {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: userID}, relations: ['bonos']});
        if(!usuario)
            throw new BusinessLogicException("No se encontro el usuario con el ID dado", BusinessError.NOT_FOUND);
        return usuario.bonos;
    }

    async deleteBono(id: number)
    {
        const bono = await this.bonoRepository.findOne({where: {id}});
        if(!bono)
            throw new BusinessLogicException("El bono con el id dado no existe", BusinessError.NOT_FOUND);
        else if(bono.calificacion >= 4)
            throw new BusinessLogicException("El bono tiene una calificacion mas alta que 4 por lo que no puede eliminarse", BusinessError.BAD_REQUEST);           
        await this.bonoRepository.remove(bono);
    }
}


