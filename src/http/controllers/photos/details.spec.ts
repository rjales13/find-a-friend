import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Details Photos (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get a photo details', async () => {
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

    const { id } = await prisma.photo.create({
      data: {
        name: 'buddy',
        extension: 'jpg',
        pet_id: petId,
      },
    });

    const response = await request(app.server)
      .get('/photos/details')
      .query({
        photoId: id,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.photo).toEqual(
      expect.objectContaining({
        name: 'buddy',
      }),
    );
  });
});
