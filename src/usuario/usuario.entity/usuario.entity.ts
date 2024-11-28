/* eslint-disable prettier/prettier *//* archivo: src/artist/artist.entity.ts */
import { Column, Entity,  JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BonoEntity } from "src/bono/bono.entity/bono.entity";
import { ClaseEntity } from "src/clase/clase.entity/clase.entity";
@Entity()
export class UsuarioEntity {

   @PrimaryGeneratedColumn()
   id: number;
   @Column()
   cedula: number;
   @Column()
   nombre: string; 
   @Column()
   grupoInvestigacion: string;
   @Column()
   numeroExtension: number;
   @Column()
   rol: string;
   @OneToOne(()=> UsuarioEntity, subordinado => subordinado.jefe)
   @JoinColumn()
   jefe : UsuarioEntity;
   
   @OneToMany(()=> BonoEntity, bonos => bonos.usuario)
   bonos: BonoEntity[];

   @OneToMany(()=> ClaseEntity, clases => clases.usuario)
   clases: ClaseEntity[];


}
/* archivo: src/artist/artist.entity.ts */
