import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { create } from './create';
import { details } from './details';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function photosRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/photos/details', details);

  app.post('/photos', { onRequest: [verifyUserRole('ORG')] }, create);
}
