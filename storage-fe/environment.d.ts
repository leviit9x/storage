declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      PWD: string;
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_ENDPOINT: string;
    }
  }
}
