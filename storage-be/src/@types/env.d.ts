declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PORT: string;
    readonly SERVER_URL: string;
    readonly CLIENT_URL: string;
    readonly DATABASE_URL: string;
    readonly PGADMIN_DEFAULT_EMAIL: string;
    readonly PGADMIN_DEFAULT_PASSWORD: string;
    readonly SMTP_SERVER: string;
    readonly SMTP_EMAIL: string;
    readonly SMTP_PASSWORD: string;
    readonly SMTP_FROM_NAME: string;
    readonly SMTP_FROM_EMAIL: string;
    readonly JWT_PRIVATE_KEY: string;
    readonly JWT_PUBLIC_KEY: string;
    readonly JWT_ALGORITHM: string;
    readonly JWT_EXPIRE_TIME: string;
    readonly JWT_EXPIRE_REFRESH_TIME: string;
    readonly JWT_SECRET: string;
    readonly GRAPHQL_PLAYGROUND: string;
    readonly SESSION_SECRET: string;
  }
}
