import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  clientUrl: process.env.CLIENT_URL,
  serverUrl: process.env.SERVER_URL,
  serverPort: process.env.PORT || 9001,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
}));
