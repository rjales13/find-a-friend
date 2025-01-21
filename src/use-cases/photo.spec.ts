import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { PhotoUseCase } from './photo';

let photosRepository: InMemoryPhotosRepository;
let sut: PhotoUseCase;

describe('Photo Use Case', () => {
  beforeEach(() => {
    photosRepository = new InMemoryPhotosRepository();
    sut = new PhotoUseCase(photosRepository);
  });

  it('should be able to add a Photo', async () => {
    const { photo } = await sut.execute({
      name: 'buddy',
      extension: 'jpg',
      petId: 'pet-01',
    });

    expect(photo.id).toEqual(expect.any(String));
  });
});
