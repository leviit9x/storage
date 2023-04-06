import * as process from "process";

export interface IConfig {
  endpoint: string;
}

export const Config: IConfig = {
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT as string,
};
