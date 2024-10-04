import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    type: String,
    description: 'Unique "email" in the application',
    minLength: 8,
    maxLength: 256,
    example: 'john_doe@hotmail.com',
  })
  @MinLength(8)
  @MaxLength(100)
  @IsEmail()
  public email: string;

  @ApiProperty({
    type: String,
    description: 'The password that was made in the "sign up" section',
    minLength: 6,
    maxLength: 256,
    example: 'JohnDoe123*',
  })
  @MinLength(6)
  @MaxLength(512)
  public password: string;
}
