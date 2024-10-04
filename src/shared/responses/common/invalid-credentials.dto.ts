import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class UnauthorizedErrorResponse {
  @ApiProperty({
    description: 'Error message',
    example: 'Unauthorized',
  })
  public readonly message: string;

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.UNAUTHORIZED,
  })
  public readonly statusCode: number;
}

export class UnauthorizedResponseDTO {
  @ApiProperty({
    description: 'Error details',
    type: UnauthorizedErrorResponse,
  })
  public readonly error: UnauthorizedErrorResponse;
}
