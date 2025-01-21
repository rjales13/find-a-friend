import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case';

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const petDetailsQuerySchema = z.object({
    petId: z.string().min(1),
  });

  const { petId } = petDetailsQuerySchema.parse(request.query);

  const detailsPetsUseCase = makeGetPetDetailsUseCase();

  const { pet } = await detailsPetsUseCase.execute({
    petId,
  });

  return reply.status(200).send({
    pet,
  });
}
