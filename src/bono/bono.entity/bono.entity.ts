/* eslint-disable prettier/prettier *//* archivo: src/artist/artist.entity.ts */
import { Column, Entity,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { ClaseEntity } from "src/clase/clase.entity/clase.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity/usuario.entity";
@Entity()export class BonoEntity {
   @PrimaryGeneratedColumn()
   id: number;
   @Column()
   monto: number; 
   @Column()
   calificacion: number;
   @Column()
   palabraClave: string;
  
   @ManyToOne(()=> ClaseEntity, clase => clase.bonos)
   clase: BonoEntity[];
   
   @ManyToOne(()=> UsuarioEntity, usuario => usuario.bonos)
   usuario: UsuarioEntity;

  


}
/* archivo: src/artist/artist.entity.ts */
