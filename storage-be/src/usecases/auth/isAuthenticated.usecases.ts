import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import * as _ from 'lodash';

export class IsAuthenticatedUseCases {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(username: string) {
    const user = await this.userRepo.getUserByIdentity({
      username,
    });

    return _.omit(user, [
      'id',
      'hashRefreshToken',
      'setting.id',
      'setting.userId',
      'password',
    ]);
  }
}
