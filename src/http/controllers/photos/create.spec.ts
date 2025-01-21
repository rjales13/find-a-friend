import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Create Photo (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a photo', async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const user = await prisma.user.findFirstOrThrow();

    const { id } = await prisma.pet.create({
      data: {
        name: 'Buddy',
        about:
          'A friendly and energetic companion who loves to play and cuddle.',
        age: 'Adulto',
        size: 'Médio',
        energy: 'Alta',
        independency: 'Médio',
        environment: 'Amplo',
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .post('/photos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'buddy',
        extension: 'jpg',
        petId: id,
      });

    expect(response.statusCode).toEqual(201);
  });
});
