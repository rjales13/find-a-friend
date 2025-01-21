import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { PetUseCase } from '../pet';

export function makePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const petUseCase = new PetUseCase(petsRepository);

  return petUseCase;
}
