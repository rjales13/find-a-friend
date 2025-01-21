import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

interface PetUseCaseRequest {
  name: string;
  about: string;
  age: 'Filhote' | 'Adulto' | 'Idoso';
  size: 'Pequenino' | 'Médio' | 'Grande';
  energy: 'Baixa' | 'Média' | 'Alta';
  independency: 'Baixo' | 'Médio' | 'Alto';
  environment: 'Amplo' | 'Pequeno' | 'Médio' | 'Externo' | 'Interno';
  userId: string;
}

interface PetUseCaseResponse {
  pet: Pet;
}

export class PetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    independency,
    environment,
    userId,
  }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independency,
      environment,
      user_id: userId,
    });

    return {
      pet,
    };
  }
}
