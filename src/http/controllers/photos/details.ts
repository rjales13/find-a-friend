import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetPhotoDetailsUseCase } from '@/use-cases/factories/make-get-photo-details-use-case';

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const photoDetailsQuerySchema = z.object({
    photoId: z.string().min(1),
  });

  const { photoId } = photoDetailsQuerySchema.parse(request.query);

  const photosDetailsUseCase = makeGetPhotoDetailsUseCase();

  const { photo } = await photosDetailsUseCase.execute({
    photoId,
  });

  return reply.status(200).send({
    photo,
  });
}
