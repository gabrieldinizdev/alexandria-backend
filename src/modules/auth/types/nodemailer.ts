export type SmtpConfigProps = {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
};

export type CustomerProps = {
  email: string;
  code: number;
};
