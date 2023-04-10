export interface MailerConfig {
  getSmtpServer(): string;

  getSmtpEmail(): string;

  getSmtpPassword(): string;

  getSmtpFromName(): string;

  getSmtpFromEmail(): string;
}
