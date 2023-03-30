import { UserM } from '../model/user';
import { User } from '@prisma/client';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserM>;

  updateLastLogin(username: string): Promise<void>;

  updateRefreshToken(username: string, refreshToken: string): Promise<void>;

  createUser(userInput: UserM): Promise<User>;
}
