import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface Response {
  id: string;
  name: string;
  email: string;
}

class CreateUserService {
  public async execute(data: Request): Promise<Response> {
    const { name, email, password } = data;

    const usersRepository = getRepository(User);

    const checkUserAlredyExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserAlredyExists) {
      throw new AppError('Email address alredy exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export default CreateUserService;
