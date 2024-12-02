/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from "@nestjs/typeorm";
import { BonoEntity } from "../../bono/bono.entity";
import { ClaseEntity } from "../../clase/clase.entity";
import { UsuarioEntity } from "../../usuario/usuario.entity";

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [ClaseEntity,UsuarioEntity,BonoEntity],
      synchronize: true,
      keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([ClaseEntity,UsuarioEntity,BonoEntity]),
   ];
   /* archivo src/shared/testing-utils/typeorm-testing-config.ts*/