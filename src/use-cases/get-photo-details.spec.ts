import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetPhotoDetailsUseCase } from '@/use-cases/get-photo-details';
import { expect, describe, it, beforeEach } from 'vitest';

let photosRepository: InMemoryPhotosRepository;
let sut: GetPhotoDetailsUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    photosRepository = new InMemoryPhotosRepository();
    sut = new GetPhotoDetailsUseCase(photosRepository);
  });

  it('should be able to get a photo detail', async () => {
    const createdPhoto = await photosRepository.create({
      name: 'buddy',
      extension: 'jpg',
      pet_id: 'pet-01',
    });

    const { photo } = await sut.execute({
      photoId: createdPhoto.id,
    });

    expect(photo.name).toEqual('buddy');
  });

  it('should not be able to get a pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        photoId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
