/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BonoService } from './bono.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { faker } from '@faker-js/faker/.';
import { ClaseEntity } from '../clase/clase.entity';

describe('BonoService', () => {
  let service: BonoService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repositoryBono: Repository<BonoEntity>;
  let repositoryClase: Repository<ClaseEntity>;
  let repositorioUsuario: Repository<UsuarioEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BonoService],
    }).compile();

    service = module.get<BonoService>(BonoService);
    repositoryBono = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    repositoryClase = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
    repositorioUsuario = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));  
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('crearBono crea el Bono correctamente', async () => {

    const usuario: UsuarioEntity = {
      id: 0,
      cedula: 12345678,
      nombre: faker.person.fullName(),
      grupoInvestigacion: 'TICSWafa',
      numeroExtension: 123456738,
      rol: 'Profesor',
      jefe: null,
      bonos: [],
      clases: [],
    };

    const bono: BonoEntity = {
      id: 0,
      monto: 100,
      calificacion: 5,
      palabraClave: 'Palabra',
      clase: null,
      usuario: null,
    };
    const usuarioNuevo: UsuarioEntity = await repositorioUsuario.save(usuario);
    const bonoNuevo: BonoEntity = await service.crearBono(bono, usuarioNuevo.id);
    expect(bonoNuevo).not.toBeNull();
    const storedBono: BonoEntity = await repositoryBono.findOne({ where: { id: bonoNuevo.id } });
    expect(storedBono).not.toBeNull();
    expect(storedBono.id).toEqual(bonoNuevo.id);
    expect(storedBono.monto).toEqual(bono.monto);
    expect(storedBono.calificacion).toEqual(bono.calificacion);
    expect(storedBono.palabraClave).toEqual(bono.palabraClave);
  });
  it('Crear bono lanza excepcion si el rol del usuario no es profesor', async () => {
    const usuario: UsuarioEntity = {
      id: 0,
      cedula: 12345678,
      nombre: faker.person.fullName(),
      grupoInvestigacion: 'TICSWafa',
      numeroExtension: 123456738,
      rol: 'Decana',
      jefe: null,
      bonos: [],
      clases: [],
    };

    const bono: BonoEntity = {
      id: 0,
      monto: 100,
      calificacion: 5,
      palabraClave: 'Palabra',
      clase: null,
      usuario: null,
    };
    const usuarioNuevo: UsuarioEntity = await repositorioUsuario.save(usuario);
    await expect(() => service.crearBono(bono, usuarioNuevo.id)).rejects.toHaveProperty('message', 'El usuario no es un profesor');
  });

  it('findBonosByUsuarioID encuentra los bonos del usuario correctamente', async () => {
    const usuario: UsuarioEntity = {
      id: 0,
      cedula: 12345678,
      nombre: faker.person.fullName(),
      grupoInvestigacion: 'TICSWafa',
      numeroExtension: 123456738,
      rol: 'Profesor',
      jefe: null,
      bonos: [],
      clases: [],
    };

    const bono: BonoEntity = {
      id: 0,
      monto: 100,
      calificacion: 5,
      palabraClave: 'Palabra',
      clase: null,
      usuario: null,
    };
    const bono2: BonoEntity = {
      id: 1,
      monto: 200,
      calificacion: 4,
      palabraClave: 'Palabra2',
      clase: null,
      usuario: null,
    }
    const usuarioNuevo: UsuarioEntity = await repositorioUsuario.save(usuario);

    const bonoNuevo: BonoEntity = await service.crearBono(bono, usuarioNuevo.id);
    const bonoNuevo2: BonoEntity = await service.crearBono(bono2, usuarioNuevo.id);
   

    const bonos: BonoEntity[] = await service.findBonosByUsuario(usuarioNuevo.id);
    
    expect(bonos).not.toBeNull();
    expect(bonos.length).toEqual(2);
    expect(bonos[0].id).toEqual(bonoNuevo.id);
    expect(bonos[1].id).toEqual(bonoNuevo2.id);
  });

  it('findBonosByUsuarioID lanza excepcion si el usuario no existe', async () => {
    await expect(() => service.findBonosByUsuario(666)).rejects.toHaveProperty('message', 'No se encontro el usuario con el ID dado');
  });

  it('findBonosByCodigo encuentra los bonos de la clase correctamente', async () => {
    
    const bonosClase : BonoEntity[] = [];
   
    const bono: BonoEntity = {
      id: 0,
      monto: 100,
      calificacion: 5,
      palabraClave: 'Palabra',
      clase: null,
      usuario: null,
    };
    const bono2: BonoEntity = {
      id: 1,
      monto: 200,
      calificacion: 4,
      palabraClave: 'Palabra2',
      clase: null,
      usuario: null,
    }
    await repositoryBono.save(bono);
    await repositoryBono.save(bono2);
    bonosClase.push(bono);
    bonosClase.push(bono2);

    const clase: ClaseEntity = {
      id: 0,
      nombre: 'Clase de prueba',
      codigo: '1234567890',
      numeroCreditos: 3,
      bonos: bonosClase,
      usuario: null,
    }; 
    const claseNueva: ClaseEntity = await repositoryClase.save(clase);
    const bonos: BonoEntity[] = await service.findBonosByCodigo(claseNueva.codigo);
    expect(bonos).not.toBeNull();
    expect(bonos.length).toEqual(2);
  });

  it('findBonosByCodigo lanza excepcion si la clase no existe', async () => {
    await expect(() => service.findBonosByCodigo('666')).rejects.toHaveProperty('message', 'No se encontro la clase con el codigo dado');
  });

  it('deleteBono elimina el bono correctamente', async () => {
    const bono: BonoEntity = {
      id: 0,
      monto: 100,
      calificacion: 1,
      palabraClave: 'Palabra',
      clase: null,
      usuario: null,
    };
    const bonoNuevo: BonoEntity = await repositoryBono.save(bono);
    await service.deleteBono(bonoNuevo.id);
    const bonoEliminado: BonoEntity = await repositoryBono.findOne({ where: { id: bonoNuevo.id } });
    expect(bonoEliminado).toBeNull();
  });
  it('deleteBono lanza excepcion si el bono no existe', async () => {
    await expect(() => service.deleteBono(666)).rejects.toHaveProperty('message', 'El bono con el id dado no existe');
  });
  
});
