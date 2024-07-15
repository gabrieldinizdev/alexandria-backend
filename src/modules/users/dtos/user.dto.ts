import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class UserDTO extends CommonFieldsDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'marcelobiriba@example.com',
  })
  public readonly email: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    example: '86f2d90@MarBiri',
  })
  public readonly password: string;

  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'Marcelo Wesley Biriba Rodrigues',
  })
  public readonly name: string;
}
