import { registerAs } from '@nestjs/config';
import { Algorithm } from 'jsonwebtoken';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  privateKey: process.env.JWT_PRIVATE_KEY,
  publicKey: process.env.JWT_PUBLIC_KEY,
  signOptions: {
    algorithm: process.env.JWT_ALGORITHM as Algorithm,
    expiresIn: Number(process.env.JWT_EXPIRE_TIME),
  },
  accessTokenExpiresIn: process.env.JWT_EXPIRE_TIME, //2h,
  refreshTokenExpiresIn: process.env.JWT_EXPIRE_REFRESH_TIME, // 30 days
}));
