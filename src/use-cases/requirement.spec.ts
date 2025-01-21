import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { RequirementUseCase } from './requirements';

let requirementRepository: InMemoryRequirementsRepository;
let sut: RequirementUseCase;

describe('Requirement Use Case', () => {
  beforeEach(() => {
    requirementRepository = new InMemoryRequirementsRepository();
    sut = new RequirementUseCase(requirementRepository);
  });

  it('should be able to add a Requirement', async () => {
    const { requirement } = await sut.execute({
      name: 'buddy',
      petId: 'pet-01',
    });

    expect(requirement.id).toEqual(expect.any(String));
  });
});
