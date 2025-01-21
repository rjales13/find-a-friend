import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makePetUseCase } from '@/use-cases/factories/make-pet-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['Filhote', 'Adulto', 'Idoso']),
    size: z.enum(['Pequenino', 'Médio', 'Grande']),
    energy: z.enum(['Baixa', 'Média', 'Alta']),
    independency: z.enum(['Baixo', 'Médio', 'Alto']),
    environment: z.enum(['Amplo', 'Pequeno', 'Médio', 'Externo', 'Interno']),
  });

  const { name, about, age, size, energy, independency, environment } =
    createPetBodySchema.parse(request.body);

  const createPetUseCase = makePetUseCase();

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy,
    independency,
    environment,
    userId: request.user.sub,
  });

  return reply.status(201).send();
}
