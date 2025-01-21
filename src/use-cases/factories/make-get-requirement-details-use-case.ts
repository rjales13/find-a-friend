import { PrismaRequirementsRepository } from '@/repositories/prisma/prisma-requirements-repository';
import { GetRequirementDetailsUseCase } from '../get-requirement-details';

export function makeGetRequirementDetailsUseCase() {
  const requirementsRepository = new PrismaRequirementsRepository();
  const useCase = new GetRequirementDetailsUseCase(requirementsRepository);

  return useCase;
}
