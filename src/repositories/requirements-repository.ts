import { Prisma, Requirement } from '@prisma/client';

export interface RequirementsRepository {
  findById(id: string): Promise<Requirement | null>;
  create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>;
}
