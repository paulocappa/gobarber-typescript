import fs from 'fs';
import { join } from 'path';
import { getRepository } from 'typeorm';

import User from '../models/User';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface Request {
  id_user: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute(data: Request): Promise<User> {
    const { id_user, avatarFilename } = data;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id_user);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.tmpFolder, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
