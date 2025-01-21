import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { RequirementsRepository } from '../requirements-repository';

export class PrismaRequirementsRepository implements RequirementsRepository {
  async create(data: Prisma.RequirementUncheckedCreateInput) {
    const requirement = await prisma.requirement.create({
      data,
    });

    return requirement;
  }

  async findById(id: string) {
    const requirement = await prisma.requirement.findUnique({
      where: {
        id,
      },
    });

    return requirement;
  }
}
