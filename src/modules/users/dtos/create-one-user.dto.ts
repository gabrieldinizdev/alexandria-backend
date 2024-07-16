import { PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { UserDTO } from './user.dto';

export class CreateUserDTO extends PickType(UserDTO, [
  'email',
  'password',
  'name',
] as const) {
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;

  @IsNotEmpty()
  public readonly name: string;
}
