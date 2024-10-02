import { ApiProperty } from '@nestjs/swagger';

import {
  IsAlphanumeric,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({
    description: 'Customer email',
    example: 'LKO56K',
  })
  @MaxLength(6)
  @IsAlphanumeric()
  public code: string;

  @ApiProperty({
    description: 'New password',
    example: 'Example123*',
  })
  @MinLength(6)
  @MaxLength(512)
  @IsStrongPassword()
  public password: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'Example123*',
  })
  @MinLength(6)
  @MaxLength(512)
  @IsStrongPassword()
  public confirmPassword: string;
}
