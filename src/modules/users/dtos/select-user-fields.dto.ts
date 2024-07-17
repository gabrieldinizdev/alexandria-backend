import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';
import { IsBoolean } from 'class-validator';

import { UserDTO } from './user.dto';
import { SelectModelFieldsType } from '@/shared/types';

export class SelectUserFieldsDTO {
  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
  })
  public readonly select?: (keyof UserDTO)[];
}

export class SelectUserPropsDTO implements SelectModelFieldsType<User> {
  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public id?: boolean;

  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public name?: boolean;

  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public email?: boolean;

  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public password?: boolean;

  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public createdAt?: boolean;

  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public updatedAt?: boolean;

  @IsBoolean()
  @ApiProperty({
    required: false,
  })
  public deletedAt?: boolean;
}
