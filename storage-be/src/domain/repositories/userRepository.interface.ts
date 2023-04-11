import { UserM } from '../model/user';
import { User } from '@prisma/client';

export interface UserRepository {
  getUserByIdentity(
    where: Partial<Pick<User, 'id' | 'email' | 'username'>>,
  ): Promise<User>;

  updateUser(
    where: { username?: string; id?: string },
    data: Partial<Omit<User, 'id' | 'username'>>,
  ): Promise<User>;

  updateRefreshToken(username: string, refreshToken: string): Promise<void>;

  createUser(userInput: UserM): Promise<User>;
}
