import { BcryptModule } from './../services/bcrypt/bcrypt.module';
import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LoggerService } from '../logger/logger.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { UseCaseProxy } from './usecases-proxy';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { JwtModule } from '../services/jwt/jwt.module';
import { RegisterUseCases } from 'src/usecases/auth/register.usecases';
import { NestMailerModule } from 'src/infrastructure/config/NestMailer/nest-mailer.module';
import { OtpModule } from 'src/infrastructure/services/otp/otp.module';
import { UpdateUserUsecases } from 'src/usecases/auth/update-user.usecases';
import { OtpService } from 'src/infrastructure/services/otp/otp.service';
import { NestMailerService } from 'src/infrastructure/config/NestMailer/nest-mailer.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ForgotPasswordUsecases } from 'src/usecases/auth/forgotPassword.usecases';
import { DatabaseOtpRepository } from 'src/infrastructure/repositories/otp.repository';
import { CreateWorkspaceUsecases } from 'src/usecases/workspace/create-workspace.usecases';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';
import { ListWorkspaceUsecases } from 'src/usecases/workspace/list-workspace.usecases';
import { UpdateWorkspaceUsecases } from 'src/usecases/workspace/update-workspace.usecases';
import { DeleteWorkspaceUsecases } from 'src/usecases/workspace/delete-workspace.usecases';
import { WorkspaceDetailUsecases } from 'src/usecases/workspace/workspace-detail.usecases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
    NestMailerModule,
    OtpModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUsesCaseProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static REGISTER_USECASE_PROXY = 'RegisterUseCasesProxy';
  static UPDATE_USER_USECASE_PROXY = 'UpdateUserUseCasesProxy';
  static FORGOT_PASSWORD_USECASE_PROXY = 'ForgotPasswordUseCasesProxy';

  //Workspace
  static CREATE_WORKSPACE_USECASE_PROXY = 'createWorkspaceUsecasesProxy';
  static GET_WORKSPACE_USECASE_PROXY = 'getWorkspaceUsecasesProxy';
  static UPDATE_WORKSPACE_USECASE_PROXY = 'updateWorkspaceUsecasesProxy';
  static DELETE_WORKSPACE_USECASE_PROXY = 'deleteWorkspaceUsecasesProxy';
  static WORKSPACE_DETAIL_USECASE_PROXY = 'workspaceDetailUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.REGISTER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new RegisterUseCases(logger, userRepo, bcryptService),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [
            LoggerService,
            DatabaseUserRepository,
            ExceptionsService,
            OtpService,
            NestMailerService,
          ],
          provide: UsecasesProxyModule.UPDATE_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            exceptionsService: ExceptionsService,
            otpService: OtpService,
            nestMailerService: NestMailerService,
          ) =>
            new UseCaseProxy(
              new UpdateUserUsecases(
                logger,
                userRepo,
                exceptionsService,
                otpService,
                nestMailerService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            DatabaseOtpRepository,
            DatabaseUserRepository,
            ExceptionsService,
            OtpService,
            NestMailerService,
          ],
          provide: UsecasesProxyModule.FORGOT_PASSWORD_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            otpRepository: DatabaseOtpRepository,
            userRepo: DatabaseUserRepository,
            exceptionsService: ExceptionsService,
            otpService: OtpService,
            nestMailerService: NestMailerService,
          ) =>
            new UseCaseProxy(
              new ForgotPasswordUsecases(
                logger,
                otpRepository,
                userRepo,
                exceptionsService,
                otpService,
                nestMailerService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            DatabaseWorkspaceRepository,
            ExceptionsService,
          ],
          provide: UsecasesProxyModule.CREATE_WORKSPACE_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            workspaceRepository: DatabaseWorkspaceRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new UseCaseProxy(
              new CreateWorkspaceUsecases(
                logger,
                workspaceRepository,
                exceptionsService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            DatabaseWorkspaceRepository,
            ExceptionsService,
          ],
          provide: UsecasesProxyModule.GET_WORKSPACE_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            workspaceRepository: DatabaseWorkspaceRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new UseCaseProxy(
              new ListWorkspaceUsecases(
                logger,
                workspaceRepository,
                exceptionsService,
              ),
            ),
        },

        {
          inject: [
            LoggerService,
            DatabaseWorkspaceRepository,
            ExceptionsService,
          ],
          provide: UsecasesProxyModule.UPDATE_WORKSPACE_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            workspaceRepository: DatabaseWorkspaceRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new UseCaseProxy(
              new UpdateWorkspaceUsecases(
                logger,
                workspaceRepository,
                exceptionsService,
              ),
            ),
        },

        {
          inject: [
            LoggerService,
            DatabaseWorkspaceRepository,
            ExceptionsService,
          ],
          provide: UsecasesProxyModule.DELETE_WORKSPACE_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            workspaceRepository: DatabaseWorkspaceRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new UseCaseProxy(
              new DeleteWorkspaceUsecases(
                logger,
                workspaceRepository,
                exceptionsService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            DatabaseWorkspaceRepository,
            ExceptionsService,
          ],
          provide: UsecasesProxyModule.WORKSPACE_DETAIL_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            workspaceRepository: DatabaseWorkspaceRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new UseCaseProxy(
              new WorkspaceDetailUsecases(
                logger,
                workspaceRepository,
                exceptionsService,
              ),
            ),
        },
      ],
      exports: [
        // Auth
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.REGISTER_USECASE_PROXY,
        UsecasesProxyModule.UPDATE_USER_USECASE_PROXY,
        UsecasesProxyModule.FORGOT_PASSWORD_USECASE_PROXY,

        // Workspace
        UsecasesProxyModule.CREATE_WORKSPACE_USECASE_PROXY,
        UsecasesProxyModule.GET_WORKSPACE_USECASE_PROXY,
        UsecasesProxyModule.UPDATE_WORKSPACE_USECASE_PROXY,
        UsecasesProxyModule.DELETE_WORKSPACE_USECASE_PROXY,
        UsecasesProxyModule.WORKSPACE_DETAIL_USECASE_PROXY,
      ],
    };
  }
}
