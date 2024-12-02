/* eslint-disable prettier/prettier *//* archivo: src/artist/artist.entity.ts */
import { Column,  Entity,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { ClaseEntity } from "../clase/clase.entity";

@Entity()export class BonoEntity {

   @PrimaryGeneratedColumn()
   id: number;

   @Column({type:"double precision"})
   monto: number; 

   @Column({type:"int"})
   calificacion: number;

   @Column()
   palabraClave: string;
  
   @ManyToOne(()=> ClaseEntity, clase => clase.bonos)
   clase: ClaseEntity;
   
   @ManyToOne(()=> UsuarioEntity, usuario => usuario.bonos)
   usuario: UsuarioEntity;

}
/* archivo: src/artist/artist.entity.ts */
