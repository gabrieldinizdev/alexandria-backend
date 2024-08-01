import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ConflictResponseDTO {
  @ApiProperty({
    description: 'Error message',
    example: 'Customer already exists',
  })
  public readonly message: string;

  @ApiProperty({
    description: 'Error Type',
    example: 'Conflict',
  })
  public readonly error: string;

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.CONFLICT,
  })
  public readonly statusCode: HttpStatus.CONFLICT;
}
