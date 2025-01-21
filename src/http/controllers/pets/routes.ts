import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { search } from './search';
import { details } from './details';
import { create } from './create';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/pets/search', search);
  app.get('/pets/details', details);

  app.post('/pets', { onRequest: [verifyUserRole('ORG')] }, create);
}
