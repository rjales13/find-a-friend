import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Lucas Silva',
      email: 'lucas.silva@example.com',
      zipCode: '12345-678',
      address: 'Av. das Flores',
      number: '45A',
      aditionalDescription: 'Apartment 101',
      city: 'São Paulo',
      state: 'SP',
      whatsapp: '+5511998765432',
      role: 'ORG',
      password: '123456',
    });

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'lucas.silva@example.com',
      password: '123456',
    });

    const cookies = authResponse.get('Set-Cookie') ?? [];

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
