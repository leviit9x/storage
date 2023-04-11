import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AuthUpdateUserDto } from 'src/infrastructure/controllers/auth/auth-dto.class';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

@Injectable()
export class AuthUpdateUserPipe implements PipeTransform {
  transform(value: AuthUpdateUserDto /*metadata: ArgumentMetadata*/) {
    if (!value.displayName && !value.email) {
      throw new BadRequestException(ERROR_MESSAGE.MISSING_PROP_UPDATE_USER);
    }
    return value;
  }
}
