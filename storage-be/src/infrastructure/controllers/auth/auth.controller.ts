import { UsecasesProxyModule } from './../../usecases-proxy/usecases-proxy.module';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAuthPresenter } from './auth.presenter';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';
import { AuthLoginDto, AuthRegisterDto } from './auth-dto.class';
import { Request as RequesstExpress } from 'express';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import JwtRefreshGuard from 'src/infrastructure/common/guards/jwtRefresh.guard';
import { RegisterUseCases } from 'src/usecases/auth/register.usecases';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.REGISTER_USECASE_PROXY)
    private readonly registerUsecaseProxy: UseCaseProxy<RegisterUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) {}

  private readonly logger = new LoggerService(AuthController.name);

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Request() request: RequesstExpress) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.username);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return 'Login successful';
  }

  @Post('register')
  @ApiBearerAuth()
  @ApiBody({ type: AuthRegisterDto })
  @ApiOperation({ description: 'register' })
  async register(
    @Body() auth: AuthLoginDto,
    @Request() request: RequesstExpress,
  ) {
    return await this.registerUsecaseProxy.getInstance().registerUser(auth);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: RequesstExpress) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('whoami')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'whoami' })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy
      .getInstance()
      .execute(request.user.username);
    const response = new IsAuthPresenter();
    response.username = user.username;
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successful';
  }
}
