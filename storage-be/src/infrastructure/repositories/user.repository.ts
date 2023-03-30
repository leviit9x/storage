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

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.prisma.user.update({
      data: { hashRefreshToken: refreshToken },
      where: { username },
    });
  }

  async createUser(userInput: UserM): Promise<User> {
    try {
      return await this.prisma.user.create({ data: userInput });
    } catch (_e) {
      console.log('eee', _e);
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }

  async getUserByUsername(username: string): Promise<UserM> {
    try {
      const adminUserEntity = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!adminUserEntity) {
        return null;
      }

      return this.toUser(adminUserEntity);
    } catch (_e) {
      this.exceptionsService.UnauthorizedException({
        message: ERROR_MESSAGE.USER_NOTFOUND,
      });
    }
  }

  async updateLastLogin(username: string): Promise<void> {
    await this.prisma.user.update({
      data: {
        lastLogin: new Date(),
      },
      where: { username },
    });
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser = {} as UserM;
    adminUser.id = adminUserEntity.id;
    adminUser.username = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.createdAt = adminUserEntity.createdAt;
    adminUser.updatedAt = adminUserEntity.updatedAt;
    adminUser.lastLogin = adminUserEntity.lastLogin;
    adminUser.hashRefreshToken = adminUserEntity.hashRefreshToken;

    return adminUser;
  }

  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity = {} as User;

    adminUserEntity.username = adminUser.username;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.lastLogin = adminUser.lastLogin;

    return adminUserEntity;
  }
}
