import { HttpException, HttpStatus } from '@nestjs/common';

export function exceptionHandling(
  message: string,
  error: any = [],
  status: HttpStatus | number = HttpStatus.INTERNAL_SERVER_ERROR,
) {
  if (process.env.ENV === 'DEV') {
    throw new HttpException(
      {
        status,
        error,
        message,
      },
      status,
    );
  }

  if (process.env.ENV === 'PROD') {
    throw new HttpException(
      {
        status,
        message,
      },
      status,
    );
  }
}
