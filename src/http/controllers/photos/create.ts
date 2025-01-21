import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makePhotoUseCase } from '@/use-cases/factories/make-photo-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPhotoBodySchema = z.object({
    name: z.string().min(1),
    extension: z.string().min(1),
    petId: z.string().min(1),
  });

  const { name, extension, petId } = createPhotoBodySchema.parse(request.body);

  const createPhotoUseCase = makePhotoUseCase();

  await createPhotoUseCase.execute({
    name,
    extension,
    petId,
  });

  return reply.status(201).send();
}
