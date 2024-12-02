/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';



describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuarioList: UsuarioEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuarioList = [];
    const poolGrupos = ['TICSW', 'IMAGINE', 'Millitos', 'Real Madrid'];
    const poolRoles = ['Estudiante', 'Profesor', 'Conserje', 'Jefe'];
    const numeros = [12345678, 876541, 12348765, 87654, 12349876];
    for(let i = 0; i < 5; i++){
        const usuario: UsuarioEntity = await repository.save({
        cedula: 12345678,
        nombre: faker.person.fullName(),
        grupoInvestigacion: faker.helpers.arrayElement(poolGrupos),
        numeroExtension: faker.helpers.arrayElement(numeros),
        rol: faker.helpers.arrayElement(poolRoles),
        jefe: null,
        bonos: [],
        clases: []
        });
        usuarioList.push(usuario);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('Create deberia crear el Usuario', async () => {
    const usuario: UsuarioEntity = {
      id: 0,
      cedula: 12345678,
      nombre: faker.person.fullName(),
      grupoInvestigacion: 'TICSW',
      numeroExtension: 123456738,
      rol: 'Profesor',
      jefe: null,
      bonos: [],
      clases: [],
    };
    const usuarioNuevo : UsuarioEntity = await service.crearUsuario(usuario);
    expect(usuarioNuevo).not.toBeNull();
    const storedUsuario: UsuarioEntity = await repository.findOne({where: {id: usuarioNuevo.id}});
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.cedula).toEqual(usuario.cedula);
    expect(storedUsuario.nombre).toEqual(usuario.nombre);
    expect(storedUsuario.grupoInvestigacion).toEqual(usuario.grupoInvestigacion);
    expect(storedUsuario.numeroExtension).toEqual(usuario.numeroExtension);
    expect(storedUsuario.rol).toEqual(usuario.rol);
  });

  it('CrearUsuario deberia lanzar una excepcion: el rol no es valido', async () => {
    const usuario: UsuarioEntity = {
      id: 0,
      cedula: 12345678,
      nombre: faker.person.fullName(),
      grupoInvestigacion: 'TICSWafa',
      numeroExtension: 123456738,
      rol: 'Estudiantes',
      jefe: null,
      bonos: [],
      clases: [],
    };
    await expect(()=>service.crearUsuario(usuario)).rejects.toHaveProperty("message", "El rol del usuario no es válido");
});
  it('fingUsuarioById deberia retornar el usuario con el id dado', async () => {
    const usuario: UsuarioEntity = usuarioList[0];
    const usuarioEncontrado: UsuarioEntity = await service.findUsuarioById(usuario.id);
    expect(usuarioEncontrado).not.toBeNull();
    expect(usuarioEncontrado.id).toEqual(usuario.id);
    expect(usuarioEncontrado.cedula).toEqual(usuario.cedula);
    expect(usuarioEncontrado.nombre).toEqual(usuario.nombre);
    expect(usuarioEncontrado.grupoInvestigacion).toEqual(usuario.grupoInvestigacion);
    expect(usuarioEncontrado.numeroExtension).toEqual(usuario.numeroExtension);
    expect(usuarioEncontrado.rol).toEqual(usuario.rol);
  });

  it('findUsuarioById deberia lanzar una excepcion: el usuario dado no existe', async () => {
    await expect(()=>service.findUsuarioById(100)).rejects.toHaveProperty("message", "El usuario con el id dado no existe");
  });

  it('eliminarUsuario deberia eliminar el usuario con el id dado', async () => {
    const usuario: UsuarioEntity = usuarioList[0];
    await service.eliminarUsuario(usuario.id);
    const usuarioEliminado: UsuarioEntity = await repository.findOne({where: {id: usuario.id}});
    expect(usuarioEliminado).toBeNull();
  });

  it('eliminarUsuario deberia lanzar una excepcion: el usuario con el id dado no existe', async () => {
    await expect(()=>service.eliminarUsuario(100)).rejects.toHaveProperty("message", "El usuario con el id dado no existe");
  });

});
