// pegar o exception code do prisma e retornar o http status correto

import { HttpStatus } from '@nestjs/common';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

function getPrismaKnownExceptionStatus(
  exception: PrismaClientKnownRequestError,
) {
  switch (exception.code) {
    // *  P2002 Unique constraint failed
    case 'P2002':
      return HttpStatus.CONFLICT;

    // *  P2025 Input error
    case 'P2025':
      return HttpStatus.BAD_REQUEST;

    // *  P2016 Record to update does not exist
    case 'P2016':
      return HttpStatus.NOT_FOUND;

    // *  P3001 Not found
    case 'P3001':
      return HttpStatus.NOT_FOUND;

    default:
      return HttpStatus.BAD_REQUEST;
  }
}

export { getPrismaKnownExceptionStatus };
