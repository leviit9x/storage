export interface IOtpVerifyAccountPayload {
  otp: string;
  email: string;
}

export interface INestMailerService {
  sendOtpVerifyAccount(payload: IOtpVerifyAccountPayload): Promise<void>;
}
