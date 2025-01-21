import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetRequirementDetailsUseCase } from '@/use-cases/get-requirement-details';
import { expect, describe, it, beforeEach } from 'vitest';

let requirementsRepository: InMemoryRequirementsRepository;
let sut: GetRequirementDetailsUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    requirementsRepository = new InMemoryRequirementsRepository();
    sut = new GetRequirementDetailsUseCase(requirementsRepository);
  });

  it('should be able to get a requirement detail', async () => {
    const createdRequirement = await requirementsRepository.create({
      name: 'req',
      pet_id: 'pet-01',
    });

    const { requirement } = await sut.execute({
      requirementId: createdRequirement.id,
    });

    expect(requirement.name).toEqual('req');
  });

  it('should not be able to get a requirement details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        requirementId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
