import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class BadRequestErrorResponse {
  @ApiProperty({
    description: 'Error message',
    example: ['email must be an email', 'name must be a string'],
    isArray: true,
    type: String,
  })
  public readonly message: string[];

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.BAD_REQUEST,
  })
  public readonly statusCode: HttpStatus.BAD_REQUEST;
}

export class InvalidEntriesResponseDTO {
  @ApiProperty({
    description: 'Error Status Code',
    type: BadRequestErrorResponse,
  })
  public readonly error: BadRequestErrorResponse;
}
