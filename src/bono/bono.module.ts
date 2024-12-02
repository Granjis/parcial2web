/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { BonoController } from './bono.controller';
import { BonoEntity } from './bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BonoEntity,UsuarioEntity, ClaseEntity])],
  providers: [BonoService],
  controllers: [BonoController],
})
export class BonoModule {}
