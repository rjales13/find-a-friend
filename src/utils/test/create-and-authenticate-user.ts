import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isOrg = false,
) {
  await prisma.user.create({
    data: {
      name: 'Lucas Silva',
      email: 'lucas.silva@example.com',
      zipcode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditional_description: 'Apartment 101',
      city: 'São Paulo',
      state: 'SP',
      whatsapp: '+5511998765432',
      role: isOrg ? 'ORG' : 'MEMBER',
      password_hash: await hash('123456', 6),
    },
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'lucas.silva@example.com',
    password: '123456',
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
