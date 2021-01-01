import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments';
import sessionsRouter from '@modules/users/infra/http/routes/sessions';
import usersRouter from '@modules/users/infra/http/routes/users';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
