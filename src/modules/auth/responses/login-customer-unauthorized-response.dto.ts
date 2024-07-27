import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInvalidCredentialsResponseDTO {
  @ApiProperty({
    description: 'Error message',
    example: 'Credentials are invalid',
  })
  public readonly message: string;

  @ApiProperty({
    description: 'Error Type',
    example: 'Unauthorized',
  })
  public readonly error: string;

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.UNAUTHORIZED,
  })
  public readonly statusCode: HttpStatus.UNAUTHORIZED;
}
