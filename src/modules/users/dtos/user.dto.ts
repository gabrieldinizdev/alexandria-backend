import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class UserDTO extends CommonFieldsDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'marcelobiriba@example.com',
  })
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: '86f2d90@MarBiri',
  })
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    example: 'Marcelo Wesley Biriba Rodrigues',
  })
  public readonly name: string;
}
