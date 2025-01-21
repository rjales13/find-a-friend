import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetRequirementDetailsUseCase } from '@/use-cases/factories/make-get-requirement-details-use-case';

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const requirementDetailsQuerySchema = z.object({
    requirementId: z.string().min(1),
  });

  const { requirementId } = requirementDetailsQuerySchema.parse(request.query);

  const requirementsDetailsUseCase = makeGetRequirementDetailsUseCase();

  const { requirement } = await requirementsDetailsUseCase.execute({
    requirementId,
  });

  return reply.status(200).send({
    requirement,
  });
}
