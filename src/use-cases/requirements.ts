import { RequirementsRepository } from '@/repositories/requirements-repository';
import { Requirement } from '@prisma/client';

interface RequirementUseCaseRequest {
  name: string;
  petId: string;
}

interface RequirementUseCaseResponse {
  requirement: Requirement;
}

export class RequirementUseCase {
  constructor(private requirementsRepository: RequirementsRepository) {}

  async execute({
    name,
    petId,
  }: RequirementUseCaseRequest): Promise<RequirementUseCaseResponse> {
    const requirement = await this.requirementsRepository.create({
      name,
      pet_id: petId,
    });

    return {
      requirement,
    };
  }
}
