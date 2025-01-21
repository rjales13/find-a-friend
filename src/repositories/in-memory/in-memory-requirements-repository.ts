import { RequirementsRepository } from '@/repositories/requirements-repository';
import { Requirement, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRequirementsRepository implements RequirementsRepository {
  public items: Requirement[] = [];

  async findById(id: string) {
    const requirement = this.items.find((item) => item.id === id);

    if (!requirement) {
      return null;
    }

    return requirement;
  }

  async create(data: Prisma.RequirementUncheckedCreateInput) {
    const requirement = {
      id: randomUUID(),
      name: data.name,
      pet_id: data.pet_id,
      created_at: new Date(),
    };

    this.items.push(requirement);

    return requirement;
  }
}
