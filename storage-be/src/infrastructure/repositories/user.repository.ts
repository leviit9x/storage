import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { Prisma, User } from '@prisma/client';
import { NestUser } from 'src/@types/prisma-types';
import UserWhereUniqueInput = Prisma.UserWhereUniqueInput;
import UserWhereInput = Prisma.UserWhereInput;
import UserCreateInput = Prisma.UserCreateInput;
import UserUncheckedCreateInput = Prisma.UserUncheckedCreateInput;
import XOR = Prisma.XOR;

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService,
    private exceptionsService: ExceptionsService,
  ) {}

  async updateUser(
    where: { username?: string; id?: string },
    data: Partial<Omit<User, 'id' | 'username'>>,
  ): Promise<NestUser> {
    return this.prisma.user.update({
      data,
      where,
    }) as unknown as NestUser;
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

  async getUserByIdentity(where: UserWhereUniqueInput) {
    try {
      const userEntity = await this.prisma.user.findUnique({
        where,
        include: {
          setting: true,
        },
      });

      if (!userEntity) {
        return null;
      }

      return userEntity as NestUser;
    } catch (_e) {
      this.exceptionsService.UnauthorizedException({
        message: ERROR_MESSAGE.USER_NOTFOUND,
      });
    }
  }

  async createUser(
    data: XOR<UserCreateInput, UserUncheckedCreateInput>,
  ): Promise<NestUser> {
    try {
      return (await this.prisma.user.create({
        data,
        include: {
          setting: true,
        },
      })) as NestUser;
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }

  async getUserFirst(where: UserWhereInput): Promise<User> {
    try {
      const userEntity = await this.prisma.user.findFirst({
        where,
        include: {
          setting: true,
        },
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
}
