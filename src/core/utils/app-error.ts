class AppError extends Error {
  public isOperational: boolean;
  public statusCode: number;
  public status: string;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { AppError };
