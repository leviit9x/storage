declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test' | 'local';
    readonly PORT: string;
    readonly SERVER_URL: string;
    readonly CLIENT_URL: string;
    readonly DATABASE_PASSWORD: string;
    readonly DATABASE_USER: string;
    readonly DATABASE_NAME: string;
    readonly DATABASE_HOST: string;
    readonly DATABASE_PORT: number;
    readonly DATABASE_SYNCHRONIZE: boolean;
    readonly DATABASE_URL_MONGO: boolean;
    readonly DATABASE_URL: string;
    readonly PGADMIN_DEFAULT_EMAIL: string;
    readonly PGADMIN_DEFAULT_PASSWORD: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: number;
    readonly REDIS_DB: string;
    readonly SMTP_SERVER: string;
    readonly SMTP_EMAIL: string;
    readonly SMTP_PASSWORD: string;
    readonly SMTP_FROM_NAME: string;
    readonly SMTP_FROM_EMAIL: string;
    readonly JWT_PRIVATE_KEY: string;
    readonly JWT_PUBLIC_KEY: string;
    readonly JWT_ALGORITHM: string;
    readonly JWT_EXPIRATION_TIME: number;
    readonly JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;
    readonly JWT_SECRET: string;
    readonly JWT_REFRESH_TOKEN_SECRET: string;
    readonly GRAPHQL_PLAYGROUND: boolean;
    readonly SESSION_SECRET: string;
  }
}
