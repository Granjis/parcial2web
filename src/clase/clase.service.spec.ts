/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClaseService } from './clase.service';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('ClaseService', () => {
  let service: ClaseService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<ClaseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseService],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    repository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createClase crea la Clase correctamente', async () => {
    const clase: ClaseEntity = {
      id: 0,
      nombre: 'Clase de prueba',
      codigo: '1234567890',
      numeroCreditos: 3,
      bonos: [],
      usuario: null,
    };
    const claseNueva : ClaseEntity = await service.crearClase(clase);
    expect(claseNueva).not.toBeNull();
    const storedClase: ClaseEntity = await repository.findOne({where: {id: claseNueva.id}});
    expect(storedClase).not.toBeNull();
    expect(storedClase.id).toEqual(claseNueva.id);
    expect(storedClase.nombre).toEqual(clase.nombre);
    expect(storedClase.codigo).toEqual(clase.codigo);
    expect(storedClase.numeroCreditos).toEqual(clase.numeroCreditos);
});
it('createClase lanza excepcion si el codigo tiene menos de 10 caracteres', async () => {
  const clase: ClaseEntity = {
    id: 0,
    nombre: 'Clase de prueba',
    codigo: '1',
    numeroCreditos: 3,
    bonos: [],
    usuario: null,
  };
  await expect(()=>service.crearClase(clase)).rejects.toHaveProperty("message", "El código de la clase no tiene 10 caracteres");
});
it('findClaseById encuentra la Clase correctamente', async () => {
  const clase: ClaseEntity = {
    id: 0,
    nombre: 'Clase de prueba',
    codigo: '1234567890',
    numeroCreditos: 3,
    bonos: [],
    usuario: null,
  };
  const claseNueva : ClaseEntity = await service.crearClase(clase);
  expect(claseNueva).not.toBeNull();
  const claseEncontrada: ClaseEntity = await service.findClaseById(claseNueva.id);
  expect(claseEncontrada).not.toBeNull();
  expect(claseEncontrada.id).toEqual(claseNueva.id);
  expect(claseEncontrada.nombre).toEqual(clase.nombre);
  expect(claseEncontrada.codigo).toEqual(clase.codigo);
  expect(claseEncontrada.numeroCreditos).toEqual(clase.numeroCreditos);
});
it('findClaseById lanza excepcion si la Clase no existe', async () => {
  await expect(()=>service.findClaseById(666)).rejects.toHaveProperty("message", "La clase con el id  dado no existe");
});
});
