import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { SearchPetsUseCase } from './search-pets';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import {
  Role,
  Age,
  Size,
  Energy,
  Independency,
  Environment,
} from '@prisma/client';

let usersRepository: InMemoryUsersRepository;
let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    petsRepository = new InMemoryPetsRepository(usersRepository);
    sut = new SearchPetsUseCase(petsRepository);
  });

  const createUser = async (city: string) => {
    return {
      name: 'Lucas Silva',
      email: 'lucas.silva@example.com',
      zipcode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditional_description: 'Apartment 101',
      city,
      state: 'SP',
      whatsapp: '+5511998765432',
      role: Role.ORG,
      password_hash: await hash('123456', 6),
    };
  };

  const createPet = (user: string, name = 'Buddy', age: Age = 'Adulto') => {
    return {
      name,
      about: 'A friendly and energetic companion who loves to play and cuddle.',
      age,
      size: Size.Médio,
      energy: Energy.Alta,
      independency: Independency.Médio,
      environment: Environment.Amplo,
      user_id: user,
    };
  };

  it('should be able to search for pets finding 1 register having 1 register', async () => {
    const user1 = await usersRepository.create(await createUser('São Paulo'));
    await petsRepository.create(createPet(user1.id));

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: 'Buddy' })]);
  });

  it('should be able to search for pets finding 1 register having 3 register', async () => {
    const user1 = await usersRepository.create(await createUser('São Paulo'));
    const user2 = await usersRepository.create(
      await createUser('Rio de Janeiro'),
    );
    const user3 = await usersRepository.create(await createUser('Curitiba'));

    await petsRepository.create(createPet(user1.id));
    await petsRepository.create(createPet(user2.id));
    await petsRepository.create(createPet(user3.id));

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: 'Buddy' })]);
  });

  it('should be able to search for pets finding 2 register having 3 register', async () => {
    const user1 = await usersRepository.create(await createUser('São Paulo'));
    const user2 = await usersRepository.create(await createUser('São Paulo'));
    const user3 = await usersRepository.create(await createUser('Curitiba'));

    await petsRepository.create(createPet(user1.id));
    await petsRepository.create(createPet(user2.id, 'Buddy 2'));
    await petsRepository.create(createPet(user3.id));

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Buddy' }),
      expect.objectContaining({ name: 'Buddy 2' }),
    ]);
  });

  it('should be able to search for pets finding 1 register having 3 register passing besides city, the age', async () => {
    const user1 = await usersRepository.create(await createUser('São Paulo'));
    const user2 = await usersRepository.create(
      await createUser('Rio de Janeiro'),
    );
    const user3 = await usersRepository.create(await createUser('Curitiba'));

    await petsRepository.create(createPet(user1.id, 'Buddy', 'Adulto'));
    await petsRepository.create(createPet(user2.id));
    await petsRepository.create(createPet(user3.id));

    const { pets } = await sut.execute({
      city: 'São Paulo',
      age: 'Adulto',
      page: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: 'Buddy' })]);
  });

  it('should not be able to search for pets because the City is correct but Age is not', async () => {
    const user1 = await usersRepository.create(await createUser('São Paulo'));
    const user2 = await usersRepository.create(
      await createUser('Rio de Janeiro'),
    );
    const user3 = await usersRepository.create(await createUser('Curitiba'));

    await petsRepository.create(createPet(user1.id, 'Buddy', 'Filhote'));
    await petsRepository.create(createPet(user2.id));
    await petsRepository.create(createPet(user3.id));

    const { pets } = await sut.execute({
      city: 'São Paulo',
      age: 'Adulto',
      page: 1,
    });

    expect(pets).toHaveLength(0);
  });

  it('should be able to fetch paginated pet search', async () => {
    const user1 = await usersRepository.create(await createUser('São Paulo'));

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create(createPet(user1.id, `Buddy ${i}`));
    }

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 2,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Buddy 21' }),
      expect.objectContaining({ name: 'Buddy 22' }),
    ]);
  });
});
