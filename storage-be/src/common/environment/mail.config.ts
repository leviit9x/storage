import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  server: process.env.SMTP_SERVER,
  email: process.env.SMTP_EMAIL,
  password: process.env.SMTP_PASSWORD,
  fromName: process.env.SMTP_FROM_NAME,
  fromEmail: process.env.SMTP_FROM_EMAIL,
  transport: `smtps://${process.env.SMTP_EMAIL}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_SERVER}`,
  defaults: {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
  },
}));
