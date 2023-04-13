import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { AuthRegisterDto } from 'src/infrastructure/controllers/auth/auth-dto.class';
import { ERROR_MESSAGE, RES_MESSAGE } from 'src/domain/constants/message';
import { MAX_SIZE_STORAGE } from 'src/domain/constants/config';
import { Role } from '@prisma/client';

export class RegisterUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async registerUser({ username, password, email }: AuthRegisterDto) {
    const checkUser = await this.userRepository.getUserFirst({
      OR: [{ username }, { email }],
    });
    if (!checkUser) {
      const hashPw = await this.bcryptService.hash(password);

      const userCreated = await this.userRepository.createUser({
        username,
        password: hashPw,
        displayName: username,
        email,
        isLocked: true,
        setting: {
          create: {
            maxSizeStorage: MAX_SIZE_STORAGE,
            role: Role.USER,
          },
        },
      });
      if (userCreated) {
        return RES_MESSAGE.REGISTER_SUCCESS;
      }
    }

    return ERROR_MESSAGE.REGISTER_USER_FOUND;
  }
}
