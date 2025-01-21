import {
  PetsRepository,
  SearchPetsUseCaseRequest,
} from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy,
    independency,
    environment,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany({
      city,
      age,
      size,
      energy,
      independency,
      environment,
      page,
    });
    return {
      pets,
    };
  }
}
