import { NestUser } from 'src/@types/prisma-types';

export type TokenPayload = Pick<NestUser, 'username' | 'id'>;
