import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class VerificationCodeDTO {
  @ApiProperty({
    type: String,
    description: 'Unique "email" in the application',
    minLength: 8,
    maxLength: 256,
  })
  @MinLength(8)
  @MaxLength(100)
  @IsEmail()
  public email: string;
}
