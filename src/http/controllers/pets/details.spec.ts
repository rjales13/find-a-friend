import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get a pet details', async () => {
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
      .get('/pets/details')
      .query({
        petId: id,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Buddy',
      }),
    );
  });
});
