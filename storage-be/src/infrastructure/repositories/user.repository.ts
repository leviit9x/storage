import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserM } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService,
    private exceptionsService: ExceptionsService,
  ) {}

  async updateUser(
    where: { username?: string; id?: string },
    data: Partial<Omit<User, 'id' | 'username'>>,
  ) {
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.prisma.user.update({
      data: { hashRefreshToken: refreshToken },
      where: { username },
    });
  }

  async getUserByIdentity(
    where: Partial<Pick<User, 'id' | 'email' | 'username'>>,
  ) {
    try {
      const userEntity = await this.prisma.user.findUnique({
        where,
      });

      if (!userEntity) {
        return null;
      }

      return userEntity;
    } catch (_e) {
      this.exceptionsService.UnauthorizedException({
        message: ERROR_MESSAGE.USER_NOTFOUND,
      });
    }
  }

  async createUser(userInput: UserM): Promise<User> {
    try {
      return await this.prisma.user.create({ data: userInput });
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
