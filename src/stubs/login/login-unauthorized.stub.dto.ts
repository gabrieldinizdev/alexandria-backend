type LoginUnauthorizedStubType = {
  message: string;
  error: string;
  statusCode: number;
};

export const LoginUnauthorizedStub: LoginUnauthorizedStubType = {
  message: 'Credentials are invalid',
  error: 'Unauthorized',
  statusCode: 401,
};
