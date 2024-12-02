/* eslint-disable prettier/prettier *//* archivo: src/artist/artist.entity.ts */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BonoEntity } from "../bono/bono.entity";
import { UsuarioEntity } from "../usuario/usuario.entity";
@Entity()
export class ClaseEntity{
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   nombre: string;

   @Column()
   codigo: string;

   @Column()
   numeroCreditos: number;
  
   @OneToMany(()=> BonoEntity, bono => bono.clase )
   bonos: BonoEntity[];
   
   @ManyToOne(()=> UsuarioEntity, usuario => usuario.clases)
   usuario: UsuarioEntity;

  


}
/* archivo: src/artist/artist.entity.ts */
