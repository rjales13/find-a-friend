import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Lucas Silva',
      email: 'lucas.silva@example.com',
      zipCode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditionalDescription: 'Apartment 101',
      city: 'São Paulo',
      state: 'SP',
      whatsapp: '+5511998765432',
      role: 'ORG',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Lucas Silva',
      email: 'lucas.silva@example.com',
      zipCode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditionalDescription: 'Apartment 101',
      city: 'São Paulo',
      state: 'SP',
      whatsapp: '+5511998765432',
      role: 'ORG',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'lucas.silva@example.com';

    await sut.execute({
      name: 'Lucas Silva',
      email,
      zipCode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditionalDescription: 'Apartment 101',
      city: 'São Paulo',
      state: 'SP',
      whatsapp: '+5511998765432',
      role: 'ORG',
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'Lucas Silva',
        email,
        zipCode: '12345-678',
        address: 'Av. das Flores',
        number: '45A',
        aditionalDescription: 'Apartment 101',
        city: 'São Paulo',
        state: 'SP',
        whatsapp: '+5511998765432',
        role: 'ORG',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
