import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { Algorithm } from 'jsonwebtoken';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsNumber()
  PORT: number;
  @IsString()
  CLIENT_URL: string;
  @IsString()
  SERVER_URL: string;
  @IsBoolean()
  GRAPHQL_PLAYGROUND: boolean;

  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;
  @IsString()
  JWT_EXPIRATION_TIME: string;
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
  @IsString()
  JWT_PRIVATE_KEY: string;
  @IsString()
  JWT_PUBLIC_KEY: string;
  @IsString()
  JWT_ALGORITHM: Algorithm;

  @IsString()
  DATABASE_HOST: string;
  @IsNumber()
  DATABASE_PORT: number;
  @IsString()
  DATABASE_USER: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_NAME: string;
  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;
  @IsString()
  DATABASE_URL: string;

  @IsString()
  SMTP_SERVER: string;
  @IsString()
  SMTP_EMAIL: string;
  @IsString()
  SMTP_PASSWORD: string;
  @IsString()
  SMTP_FROM_NAME: string;
  @IsString()
  SMTP_FROM_EMAIL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
