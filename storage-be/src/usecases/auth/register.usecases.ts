import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { AuthRegisterDto } from 'src/infrastructure/controllers/auth/auth-dto.class';
import { ERROR_MESSAGE, RES_MESSAGE } from 'src/domain/constants/message';
import { UserM } from 'src/domain/model/user';

export class RegisterUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async registerUser(userInput: AuthRegisterDto) {
    const checkUser = await this.userRepository.getUserByUsername(
      userInput.username,
    );
    if (!checkUser) {
      const hashPw = await this.bcryptService.hash(userInput.password);
      const newUser = {
        username: userInput.username,
        password: hashPw,
        displayName: userInput.username,
        email: '',
        otp: '',
        isLocked: true,
      } as UserM;
      const userCreated = await this.userRepository.createUser(newUser);
      if (userCreated) {
        return RES_MESSAGE.REGISTER_SUCCESS;
      }
    }

    return ERROR_MESSAGE.REGISTER_USER_FOUND;
  }
}
