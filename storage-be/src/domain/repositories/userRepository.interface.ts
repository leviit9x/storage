import { Prisma, User } from '@prisma/client';
import { NestUser } from 'src/@types/prisma-types';
import UserWhereUniqueInput = Prisma.UserWhereUniqueInput;
import XOR = Prisma.XOR;
import UserCreateInput = Prisma.UserCreateInput;
import UserUncheckedCreateInput = Prisma.UserUncheckedCreateInput;
import UserWhereInput = Prisma.UserWhereInput;

export interface UserRepository {
  getUserByIdentity(where: UserWhereUniqueInput): Promise<NestUser>;
  getUserFirst(where: UserWhereInput): Promise<User>;
  updateUser(
    where: { username?: string; id?: string },
    data: Partial<Omit<User, 'id' | 'username'>>,
  ): Promise<NestUser>;

  updateRefreshToken(username: string, refreshToken: string): Promise<void>;

  createUser(
    userInput: XOR<UserCreateInput, UserUncheckedCreateInput>,
  ): Promise<NestUser>;
}
