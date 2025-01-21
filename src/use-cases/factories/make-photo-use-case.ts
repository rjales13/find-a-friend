import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository';
import { PhotoUseCase } from '../photo';

export function makePhotoUseCase() {
  const photosRepository = new PrismaPhotosRepository();
  const useCase = new PhotoUseCase(photosRepository);

  return useCase;
}
