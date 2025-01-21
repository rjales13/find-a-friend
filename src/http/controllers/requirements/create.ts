import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRequirementUseCase } from '@/use-cases/factories/make-requirement-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createRequirementBodySchema = z.object({
    name: z.string().min(1),
    petId: z.string().min(1),
  });

  const { name, petId } = createRequirementBodySchema.parse(request.body);

  const createRequirementUseCase = makeRequirementUseCase();

  await createRequirementUseCase.execute({
    name,
    petId,
  });

  return reply.status(201).send();
}
