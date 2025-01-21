import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository';
import { GetPhotoDetailsUseCase } from '../get-photo-details';

export function makeGetPhotoDetailsUseCase() {
  const photosRepository = new PrismaPhotosRepository();
  const useCase = new GetPhotoDetailsUseCase(photosRepository);

  return useCase;
}
