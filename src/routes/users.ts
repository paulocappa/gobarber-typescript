import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import authMiddleware from '../middlewares/auth';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    return res.json({});
  }
);

export default usersRouter;
