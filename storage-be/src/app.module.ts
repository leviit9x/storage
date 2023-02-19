import appConfig from '@common/environment/app.config';
import graphqlConfig from '@common/environment/graphql.config';
import jwtConfig from '@common/environment/jwt.config';
import mailConfig from '@common/environment/mail.config';
import sessionConfig from '@common/environment/session.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@providers/prisma/prisma.module';
import { SessionModule } from 'nestjs-session';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import * as session from 'express-session';
import * as ConnectRedis from 'connect-redis';
import {
  RedisModule,
  RedisModuleOptions,
  RedisService,
} from '@liaoliaots/nestjs-redis';
import redisConfig from '@common/environment/redis.config';
const RedisStore = ConnectRedis(session);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        graphqlConfig,
        jwtConfig,
        mailConfig,
        sessionConfig,
        redisConfig,
      ],
      envFilePath: '.env',
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        const config = configService.get('redis');
        return {
          config: {
            host: config.host,
            port: config.port,
            db: config.db,
          },
          readyLog: true,
        };
      },
      inject: [ConfigService],
    }),
    SessionModule.forRootAsync({
      useFactory: (
        configService: ConfigService,
        redisService: RedisService,
      ) => ({
        session: {
          ...configService.get('session'),
          store: new RedisStore({ client: redisService.getClient() }),
        },
      }),
      inject: [ConfigService, RedisService],
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
