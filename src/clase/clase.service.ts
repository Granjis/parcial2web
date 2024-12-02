/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ClaseEntity } from './clase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClaseService {
  
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ){}

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity>
    {
        if(clase.codigo.length != 10)
        {
            throw new BusinessLogicException("El código de la clase no tiene 10 caracteres", BusinessError.BAD_REQUEST);
        }
        return await this.claseRepository.save(clase);
    }

    async findClaseById(id: number): Promise<ClaseEntity>
    {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {id}, relations: ['bonos', 'usuario']});
        if(!clase)
            throw new BusinessLogicException("La clase con el id  dado no existe", BusinessError.NOT_FOUND);
        return clase;
    }
}
