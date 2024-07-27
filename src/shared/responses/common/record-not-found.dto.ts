import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class RecordNotFoundDTO {
  @ApiProperty({
    description: 'Error message',
    example: 'record not found',
  })
  public readonly message: string[];

  @ApiProperty({
    description: 'Error Type',
    example: 'Not Found',
  })
  public readonly error: string;

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.NOT_FOUND,
  })
  public readonly statusCode: HttpStatus.NOT_FOUND;
}
