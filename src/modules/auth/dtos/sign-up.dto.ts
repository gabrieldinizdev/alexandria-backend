import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDTO {
  @ApiProperty({
    type: String,
    description: 'Email to create account',
    minLength: 8,
    maxLength: 256,
  })
  @MinLength(8)
  @MaxLength(100)
  @IsEmail()
  public email: string;

  @ApiProperty({
    type: String,
    description: 'Password to create account',
    minLength: 6,
    maxLength: 256,
  })
  @MinLength(6)
  @MaxLength(512)
  @IsStrongPassword()
  public password: string;

  @ApiProperty({
    description: 'Name to create account',
    example: 'Biriba Keyllon Diniz',
  })
  @IsString()
  public readonly name: string;
}
