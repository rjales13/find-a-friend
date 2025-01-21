import { PrismaRequirementsRepository } from '@/repositories/prisma/prisma-requirements-repository';
import { RequirementUseCase } from '../requirements';

export function makeRequirementUseCase() {
  const requirementsRepository = new PrismaRequirementsRepository();
  const useCase = new RequirementUseCase(requirementsRepository);

  return useCase;
}
