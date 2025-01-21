import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        about:
          'A friendly and energetic companion who loves to play and cuddle.',
        age: 'Adulto',
        size: 'Médio',
        energy: 'Alta',
        independency: 'Médio',
        environment: 'Amplo',
      });

    expect(response.statusCode).toEqual(201);
  });
});
