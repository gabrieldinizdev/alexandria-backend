import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class CustomerDTO extends CommonFieldsDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Customer email',
    example: 'marcelobiriba@example.com',
  })
  public readonly email: string;

  @IsString()
  @ApiProperty({
    description: 'Customer password',
    example: '86f2d90@MarBiri',
  })
  public readonly password: string;

  @IsString()
  @ApiProperty({
    description: 'Customer name',
    example: 'Marcelo Wesley Biriba Rodrigues',
  })
  public readonly name: string;
}
