import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { PetUseCase } from './pet';

let petsRepository: InMemoryPetsRepository;
let sut: PetUseCase;

describe('Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new PetUseCase(petsRepository);
  });

  it('should be able to add a Pet', async () => {
    const { pet } = await sut.execute({
      name: 'Buddy',
      about: 'A friendly and energetic companion who loves to play and cuddle.',
      age: 'Adulto',
      size: 'Médio',
      energy: 'Alta',
      independency: 'Médio',
      environment: 'Amplo',
      userId: 'user-01',
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
