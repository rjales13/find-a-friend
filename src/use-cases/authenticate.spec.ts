import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Lucas Silva',
      email: 'lucas.silva@example.com',
      zipcode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditional_description: 'Apartment 101',
      city: 'São Paulo',
      state: 'SP',
      whatsapp: '+5511998765432',
      role: 'ORG',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'lucas.silva@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'lucas.silva@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Lucas Silva',
      email: 'lucas.silva@example.com',
      zipcode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditional_description: 'Apartment 101',
      city: 'São Paulo',
      state: 'SP',
      whatsapp: '+5511998765432',
      role: 'ORG',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'lucas.silva@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
