import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    zipCode: z.string().min(1),
    address: z.string().min(1),
    number: z.string(),
    aditionalDescription: z.string(),
    city: z.string(),
    state: z.string(),
    whatsapp: z.string(),
    role: z.enum(['ORG', 'MEMBER']),
    password: z.string().min(6),
  });

  const {
    name,
    email,
    zipCode,
    address,
    number,
    aditionalDescription,
    city,
    state,
    whatsapp,
    role,
    password,
  } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      zipCode,
      address,
      number,
      aditionalDescription,
      city,
      state,
      whatsapp,
      role,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}
