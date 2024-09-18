import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dtos';

export class CustomerDTO extends CommonFieldsDTO {
  @ApiProperty({
    description: 'Customer email',
    example: 'marcelobiriba@example.com',
  })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description: 'Customer password',
    example: '86f2d90@MarBiri',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(512)
  @IsStrongPassword()
  public readonly password: string;

  @ApiProperty({
    description: 'Customer name',
    example: 'Marcelo Wesley Biriba Rodrigues',
  })
  @IsString()
  public readonly name: string;
}
