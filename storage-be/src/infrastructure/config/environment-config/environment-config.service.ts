import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { JWTConfig } from 'src/domain/config/jwt.interface';
import { SystemConfig } from 'src/domain/config/system.interface';
import { Environment } from './environment-config.validation';
import { MailerConfig } from 'src/domain/config/mailer.interface';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, JWTConfig, SystemConfig, MailerConfig
{
  constructor(private configService: ConfigService) {}

  getSmtpServer(): string {
    return this.configService.get<string>('SMTP_SERVER');
  }
  getSmtpEmail(): string {
    return this.configService.get<string>('SMTP_EMAIL');
  }
  getSmtpPassword(): string {
    return this.configService.get<string>('SMTP_PASSWORD');
  }
  getSmtpFromName(): string {
    return this.configService.get<string>('SMTP_FROM_NAME');
  }
  getSmtpFromEmail(): string {
    return this.configService.get<string>('SMTP_FROM_EMAIL');
  }

  getIsTest(): boolean {
    return this.configService.get<string>('NODE_ENV') === Environment.Test;
  }

  getIsLocal(): boolean {
    return this.configService.get<string>('NODE_ENV') === Environment.Local;
  }

  getServerPort(): number {
    return this.configService.get<number>('PORT');
  }

  getEnvironment(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getIsProd(): boolean {
    return (
      this.configService.get<string>('NODE_ENV') === Environment.Production
    );
  }

  getIsDev(): boolean {
    return (
      this.configService.get<string>('NODE_ENV') === Environment.Development
    );
  }

  getClientUrl(): string {
    return this.configService.get<string>('CLIENT_URL');
  }

  getServerUrl(): string {
    return this.configService.get<string>('SERVER_URL');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
