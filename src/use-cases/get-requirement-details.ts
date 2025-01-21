import { RequirementsRepository } from '@/repositories/requirements-repository';
import { Requirement } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface GetRequirementDetailsUseCaseRequest {
  requirementId: string;
}

interface GetRequirementDetailsUseCaseResponse {
  requirement: Requirement;
}

export class GetRequirementDetailsUseCase {
  constructor(private requirementsRepository: RequirementsRepository) {}

  async execute({
    requirementId,
  }: GetRequirementDetailsUseCaseRequest): Promise<GetRequirementDetailsUseCaseResponse> {
    const requirement =
      await this.requirementsRepository.findById(requirementId);

    if (!requirement) {
      throw new ResourceNotFoundError();
    }

    return {
      requirement,
    };
  }
}
