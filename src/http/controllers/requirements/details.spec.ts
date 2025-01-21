import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Details Requirements (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get a requirement details', async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const user = await prisma.user.findFirstOrThrow();

    const { id: petId } = await prisma.pet.create({
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

    const { id } = await prisma.requirement.create({
      data: {
        name: 'req',
        pet_id: petId,
      },
    });

    const response = await request(app.server)
      .get('/requirements/details')
      .query({
        requirementId: id,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.requirement).toEqual(
      expect.objectContaining({
        name: 'req',
      }),
    );
  });
});
