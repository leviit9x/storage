export interface SystemConfig {
  getServerPort(): number;
  getEnvironment(): string;
  getIsProd(): boolean;
  getIsTest(): boolean;
  getIsLocal(): boolean;
  getIsDev(): boolean;
  getClientUrl(): string;
  getServerUrl(): string;
}
