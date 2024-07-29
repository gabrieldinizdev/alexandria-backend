export type ErrorResponse = {
  error: {
    statusCode: number;
    message: string | string[];
    meta?: Record<string, unknown>;
  };
};
