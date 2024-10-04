import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class ConflictErrorResponse {
  @ApiProperty({
    description: 'Error message',
    example: 'Customer already exists',
  })
  public readonly message: string;

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.CONFLICT,
  })
  public readonly statusCode: HttpStatus.CONFLICT;
}

export class ConflictResponseDTO {
  @ApiProperty({
    description: 'Error Status Code',
    example: ConflictErrorResponse,
  })
  public readonly error: ConflictErrorResponse;
}
