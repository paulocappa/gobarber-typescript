import { v4 as uuid } from 'uuid'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken'

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(id_user: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      id_user,
      created_at: new Date(),
      updated_at: new Date()
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(el => el.token === token);

    return userToken;
  }
}

export default FakeUserTokensRepository;
