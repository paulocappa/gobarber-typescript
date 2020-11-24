import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export default class AuthenticateUserService {
  public async execute(data: Request): Promise<Response> {
    const { email, password } = data;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
