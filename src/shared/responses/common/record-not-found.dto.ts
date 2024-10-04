import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class NotFoundErrorResponse {
  @ApiProperty({
    description: 'Error message',
    example: 'The customer was not found',
  })
  public readonly message: string[];

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.NOT_FOUND,
  })
  public readonly statusCode: HttpStatus.NOT_FOUND;
}

export class RecordNotFoundDTO {
  @ApiProperty({
    description: 'Error Status Code',
    example: NotFoundErrorResponse,
  })
  public readonly error: NotFoundErrorResponse;
}
