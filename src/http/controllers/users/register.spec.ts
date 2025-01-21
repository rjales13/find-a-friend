import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
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

    expect(response.statusCode).toEqual(201);
  });
});
