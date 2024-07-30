import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDTO {
  @ApiProperty({
    description: 'Error message',
    example: 'Unauthorized',
  })
  public readonly message: string;

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.UNAUTHORIZED,
  })
  public readonly statusCode: HttpStatus.UNAUTHORIZED;
}
