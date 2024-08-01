export type SmtpConfigProps = {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
};
