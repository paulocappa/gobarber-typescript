import { Router } from 'express';

import authMiddleware from '@shared/infra/http/middlewares/auth';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.status(200).json(appointments);
// });

appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;
