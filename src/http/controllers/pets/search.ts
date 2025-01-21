import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().min(1),
    age: z.enum(['Filhote', 'Adulto', 'Idoso']).optional(),
    size: z.enum(['Pequenino', 'Médio', 'Grande']).optional(),
    energy: z.enum(['Baixa', 'Média', 'Alta']).optional(),
    independency: z.enum(['Baixo', 'Médio', 'Alto']).optional(),
    environment: z
      .enum(['Amplo', 'Pequeno', 'Médio', 'Externo', 'Interno'])
      .optional(),
    page: z.coerce.number().min(1).default(1),
  });

  const { city, age, size, energy, independency, environment, page } =
    searchPetsQuerySchema.parse(request.query);

  const searchPetsUseCase = makeSearchPetsUseCase();

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    energy,
    independency,
    environment,
    page,
  });

  return reply.status(200).send({
    pets,
  });
}
