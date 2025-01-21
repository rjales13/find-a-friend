import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetPetDetailsUseCase } from '@/use-cases/get-pet-details';
import { expect, describe, it, beforeEach } from 'vitest';

let petsRepository: InMemoryPetsRepository;
let sut: GetPetDetailsUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it('should be able to get a pet detail', async () => {
    const createdPet = await petsRepository.create({
      name: 'Buddy',
      about: 'A friendly and energetic companion who loves to play and cuddle.',
      age: 'Adulto',
      size: 'Médio',
      energy: 'Alta',
      independency: 'Médio',
      environment: 'Amplo',
      user_id: 'user-01',
    });

    const { pet } = await sut.execute({
      petId: createdPet.id,
    });

    expect(pet.name).toEqual('Buddy');
  });

  it('should not be able to get a pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
