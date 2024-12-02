/* eslint-disable prettier/prettier *//* archivo: src/artist/artist.entity.ts */
import { Column, Entity,  JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BonoEntity } from "../bono/bono.entity";
import { ClaseEntity } from "../clase/clase.entity";


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
   
   @OneToOne(()=> UsuarioEntity, {nullable: true})
   @JoinColumn()
   jefe : UsuarioEntity;
   
   @OneToMany(()=> BonoEntity, bonos => bonos.usuario)
   bonos: BonoEntity[];

   @OneToMany(()=> ClaseEntity, clases => clases.usuario)
   clases: ClaseEntity[];


}
/* archivo: src/artist/artist.entity.ts */
