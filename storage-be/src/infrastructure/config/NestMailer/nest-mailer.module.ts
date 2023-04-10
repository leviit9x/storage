import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import * as process from 'process';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { NestMailerService } from 'src/infrastructure/config/NestMailer/nest-mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (environmentConfigService: EnvironmentConfigService) => {
        return {
          transport: {
            host: environmentConfigService.getSmtpServer(),
            port: 465,
            secure: false,
            ignoreTLS: true,
            auth: {
              user: environmentConfigService.getSmtpEmail(),
              password: environmentConfigService.getSmtpPassword(),
            },
          },
          defaults: {
            from: environmentConfigService.getSmtpFromEmail(),
          },
          preview: true,
          template: {
            dir: process.cwd() + '/template/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [NestMailerService],
  exports: [NestMailerService],
})
export class NestMailerModule {}
