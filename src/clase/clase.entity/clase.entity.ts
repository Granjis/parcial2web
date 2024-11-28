/* eslint-disable prettier/prettier *//* archivo: src/artist/artist.entity.ts */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BonoEntity } from "src/bono/bono.entity/bono.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity/usuario.entity";
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
  
   @OneToMany(()=> BonoEntity, bonos => bonos.clase)
   bonos: UsuarioEntity[];
   
   @ManyToOne(()=> UsuarioEntity, usuario => usuario.clases)
   usuario: UsuarioEntity;

  


}
/* archivo: src/artist/artist.entity.ts */
