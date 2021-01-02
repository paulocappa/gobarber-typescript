import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import authMiddleware from '@shared/infra/http/middlewares/auth';

import UsersController from '../controllers/UsersController';
import AvatarController from '../controllers/AvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersController.create);

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  AvatarController.update
);

export default usersRouter;
