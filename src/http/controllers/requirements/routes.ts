import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { create } from './create';
import { details } from './details';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function requirementsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/requirements/details', details);

  app.post('/requirements', { onRequest: [verifyUserRole('ORG')] }, create);
}
